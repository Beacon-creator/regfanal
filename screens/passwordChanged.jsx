// Onboarding.js
import React from "react";
import { Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, STYLES, IMG, SIZES, FONT, BodyText } from "../constants/theme";
import { images } from "../constants/images";
import FlatButton from "../components/button";

const PasswordChanged = () => {
  const navigation = useNavigation(); // Use useNavigation to get the navigation object

  const handleSignIn = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={STYLES.container}>
      <View style={{marginTop: 50, paddingHorizontal: 20}}>
        <Image source={images.Unicorn} style={IMG.midimage} />
      </View>

      <View>
        <Text style={BodyText.HeaderA}>
          Hooray! Your password has been
          <Text style={{ color: COLORS.primarybackground }}> changed</Text>{" "}
        </Text>
      </View>

      <View style={{ marginTop: 50 }}>
        <FlatButton text="Back to Login" onPress={handleSignIn} />
      </View>
    </View>
  );
};

export default PasswordChanged;
