import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { BUTTON, BUTTONText, COLORS } from "../constants/theme";

export default function FlatButton2({ text, onPress, textcolor, backColor, disabled}) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={{
          ...BUTTON.largebutton2,
          backgroundColor: disabled ? COLORS.secondarybackground : backColor,
        }}
      >
        <Text style={{ ...BUTTONText.text2, color: disabled ? COLORS.buttext : textcolor }}> {text} </Text>
      </View>
    </TouchableOpacity>
  );
}


