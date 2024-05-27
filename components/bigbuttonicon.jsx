import React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { BUTTON, BUTTONText, COLORS } from "../constants/theme";

export default function FlatButton2({ text,iconSource, onPress, textcolor, backColor }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          ...BUTTON.largebutton2,
          flexDirection: "row",
          borderWidth: 1, borderColor: COLORS.gray2,
          justifyContent: "center",
          backgroundColor: backColor
        }}
      >
        <Image source={iconSource} style={{marginVertical: 1}} />
        <Text style={{ ...BUTTONText.text2, paddingLeft: 5,paddingTop: 2.5, color: textcolor }}> {text} </Text>
      </View>
    </TouchableOpacity>
  );
}
