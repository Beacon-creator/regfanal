import React, { useState, forwardRef, useImperativeHandle } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { SIZES, COLORS } from "../constants/theme";

const SmallBox = forwardRef((props, ref) => {
  const [inputValue, setInputValue] = useState(Array(props.length).fill(""));

  // Refs array to hold refs of TextInput components
  const refs = [];

  const handleRef = (ref, index) => {
    refs[index] = ref;
  };
  useImperativeHandle(ref, () => ({
    getValue: () => inputValue,
  }));

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newInputValue = [...inputValue];
      newInputValue[index] = value.toString(); // Convert value to string
      setInputValue(newInputValue);
      props.onChange(newInputValue);

      // Automatically focus on the next input box if the current one is filled
      if (index < props.length - 1 && value !== "") {
        refs[index + 1].focus();
      }
    } else if (value === "") {
      // Handle deletion: clear the current input and focus on the previous box
      const newInputValue = [...inputValue];
      newInputValue[index] = "";
      setInputValue(newInputValue);

      if (index > 0) {
        refs[index - 1].focus();
      }
    }
  };

   const handleFocus = (index) => {
     if (!inputValue[index]) {
       const newInputValue = [...inputValue];
       newInputValue[index] = "";
       setInputValue(newInputValue);
     }
     // Ensure cursor remains at the end of the input
     refs[index].setSelection(inputValue[index] ? 1 : 0);
   };

  const handleBlur = (index) => {
    const newInputValue = [...inputValue];
    if (!newInputValue[index]) {
      // Preserve the entered value if it's not empty
      newInputValue[index] = inputValue[index] || "";
      setInputValue(newInputValue);
    }
  };

  return (
    <View style={[styles.container, props.containerStyle]}>
      {inputValue.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref) => handleRef(ref, index)}
          style={[
            styles.input,
            props.inputStyle,
            value && styles.inputFilled,
            value && props.inputFilledStyle,
          ]}
          value={value}
          onChangeText={(text) => handleChange(index, text)}
          maxLength={1}
          keyboardType="numeric"        
          onFocus={() => handleFocus(index)}
          onBlur={() => handleBlur(index)}
        />
      ))}
    </View>
  );
});


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    width: 40,
    height: 60,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    fontSize: SIZES.large,
    borderColor: COLORS.black,
  },
  inputFilled: {
    color: COLORS.primarybackground,
    borderColor: COLORS.primarybackground,
  },
});


export default SmallBox;
