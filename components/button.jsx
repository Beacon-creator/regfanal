import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { COLORS, BUTTON, BUTTONText } from "../constants/theme";

export default function FlatButton({ text, onPress }) {
return(

    <TouchableOpacity onPress={onPress}>
        <View style={BUTTON.largebutton}>
            <Text style={BUTTONText.text1}> { text } </Text>
        </View>
    </TouchableOpacity>
)

}


