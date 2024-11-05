// Onboarding.js
import React from "react";
import { Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, RESPONSIVENESS } from "../constants/theme";
import { images } from "../constants/images";
import FlatButton from "../components/button";
import FlatButton2 from "../components/button2";

const Onboarding = () => {
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.navigate("Signup");
  };

  const handleSignIn = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={RESPONSIVENESS.container}>
      <Text style={RESPONSIVENESS.title}>RegFanal</Text>
      <Image
        source={images.onboarding1}
        style={RESPONSIVENESS.image}
        resizeMode="contain"
      />

      <Text style={RESPONSIVENESS.subtitle}>
        <Text style={RESPONSIVENESS.highlight}>Opportunities</Text> are always
        with us 😊
      </Text>

      <FlatButton text="Let's get started" onPress={handleStart} />
      <FlatButton2
        text="I already have an account"
        backColor={COLORS.secondarybackground}
        onPress={handleSignIn}
      />
      <View>
        <Text style={RESPONSIVENESS.illustrationCredit}>
          Illustration by streamlinehq
        </Text>
      </View>
    </View>
  );
};

export default Onboarding;
