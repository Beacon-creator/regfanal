import React, { useState, forwardRef, useImperativeHandle } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { SIZES, COLORS } from "../constants/theme";

const SmallBox = forwardRef((props, ref) => {
  const [inputValue, setInputValue] = useState(Array(props.length).fill(""));

  // Refs array to hold refs of TextInput components
  const refs = [];

  const handleRef = (inputRef, index) => {
    refs[index] = inputRef;
  };

  useImperativeHandle(ref, () => ({
    getValue: () => inputValue,
  }));

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newInputValue = [...inputValue];
      newInputValue[index] = value; // Set the current value
      setInputValue(newInputValue);
      props.onChange(newInputValue);

      if (value !== "" && index < props.length - 1) {
        refs[index + 1].focus(); // Move to the next input if filled
      } else if (value === "" && index > 0) {
        refs[index - 1].focus(); // Move to the previous input if empty
      }
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && inputValue[index] === "") {
      if (index > 0) {
        const newInputValue = [...inputValue];
        newInputValue[index - 1] = ""; // Clear the previous input value
        setInputValue(newInputValue); // Update the state
        refs[index - 1].focus(); // Focus on the previous input box
      }
    }
  };

  return (
    <View style={[styles.container, props.containerStyle]}>
      {inputValue.map((value, index) => (
        <TextInput
          key={index}
          ref={(inputRef) => handleRef(inputRef, index)}
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
          onKeyPress={({ nativeEvent }) =>
            handleKeyPress(index, nativeEvent.key)
          }
          onFocus={() =>
            refs[index].setNativeProps({ selection: { start: 1, end: 1 } })
          }
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
