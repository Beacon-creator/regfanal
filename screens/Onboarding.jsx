// Onboarding.js
import React from "react";
import { Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, STYLES, IMG, SIZES, FONT } from "../constants/theme";
import { images } from "../constants/images";
import FlatButton from "../components/button";
import FlatButton2 from "../components/button2";

const Onboarding = () => {
  const navigation = useNavigation(); // Use useNavigation to get the navigation object

  const handleStart = () => {
    navigation.navigate("Signup");
  };

  const handleSignIn = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={STYLES.container}>
        <Text style={{   marginTop: 50,
          fontSize: SIZES.xxLarge,
          fontWeight: FONT.bold, color: COLORS.primarybackground }}>RegFanal</Text>
      <Image source={images.onboarding1} style={IMG.midimage} />

      <Text
        style={{
          marginTop: 20,
          fontSize: SIZES.xxLarge,
          fontWeight: FONT.bold,
        }}
      >
        <Text style={{ color: COLORS.primarybackground }}>Opportunities</Text>{" "}
        are always with us 😊
      </Text>

      <FlatButton text="Let's get started" onPress={handleStart} />
      <FlatButton2
        text="I already have an account"
        backColor={COLORS.secondarybackground}
        onPress={handleSignIn}
      />
      <View>
        <Text
          style={{
            marginTop: 10,
            fontSize: SIZES.xxxSmall,
            fontWeight: FONT.bold,
          }}
        >
          Illustration by streamlinehq
        </Text>
      </View>
    </View>
  );
};

export default Onboarding;
