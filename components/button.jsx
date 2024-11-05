import React from "react";
import { Pressable, Text, View } from "react-native";
import { BUTTON, BUTTONText } from "../constants/theme";

export default function FlatButton({ text, onPress }) {
return(

    <Pressable onPress={onPress}>
        <View style={BUTTON.largebutton}>
            <Text style={BUTTONText.text1}> { text } </Text>
        </View>
    </Pressable>
)

}


