import React, { useState } from "react";
import {
  View,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
  Text,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import {
  COLORS,
  STYLES,
  BUTTON,
  BodyText,
  loginstyles,
  SIZES,
  IMG,
  FONT,
} from "../constants/theme";
import FlatButton2 from "../components/button2";
import Check from "../assets/checksuccess.png";
import { useNavigation } from "@react-navigation/native";
import backicon from "../assets/backicon.png";
import axios from "axios";

function ForgotPassword() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const isForgotPasswordDisabled = !(isEmailValid && email);

  const handleBackIconPress = () => {
    navigation.goBack();
  };

  const handleVerificationContinue = async () => {
    try {
      setIsLoading(true);
      if (isEmailValid) {
        const response = await axios.post(
          "https://firstbackend-1c5d.onrender.com/api/forgot_password",
          { useremail: email }
        );

        Alert.alert(
          "Success",
          "Code sent successfully!",
          [
            {
              text: "Next",
              onPress: () => {
                navigation.navigate("VerifyPasswordChangeCode", { email }); // Pass email here
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert("Invalid Email", "Please, check your email.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while sending. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <SafeAreaView style={{ ...STYLES.container, flex: 1 }}>
      <View style={{ marginTop: 10 }}>
        <View style={{ ...STYLES.container4 }}>
          <Pressable onPress={handleBackIconPress}>
            <Image style={IMG.backbut} source={backicon} />
          </Pressable>

          <View style={styles.spacetextContainer}>
            <Text style={BodyText.Header}>Forgot Password</Text>
          </View>
        </View>

        <View
          style={[
            loginstyles.inputArea,
            isEmailValid && styles.inputValid,
            isEmailFocused && styles.inputFocused,
          ]}
        >
          <TextInput
            placeholderTextColor={COLORS.black}
            inputMode="email-address"
            style={[styles.input, isEmailFocused && styles.inputFocused]}
            value={email}
            onChangeText={handleEmailChange}
            onFocus={handleEmailFocus}
            onBlur={() => setIsEmailFocused(false)}
          />
          <Text
            style={[
              styles.placeholder,
              isEmailFocused && { color: COLORS.primarybackground },
            ]}
          >
            Enter your Email
          </Text>
          {isEmailValid && <Image source={Check} style={styles.icon} />}
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={BodyText.leftsmalltext}>
            Make sure your email is correct
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <FlatButton2
            text={isLoading ? "" : "Continue"}
            backColor={COLORS.primarybackground}
            textcolor={COLORS.white}
            onPress={() => {
              if (!isForgotPasswordDisabled) {
                handleVerificationContinue();
              }
            }}
            disabled={isForgotPasswordDisabled || isLoading}
          />
          {isLoading && (
            <ActivityIndicator
              style={BUTTON.activitybutton}
              size="small"
              color={COLORS.white}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  spacetextContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
  },
  placeholder: {
    position: "absolute",
    top: 2,
    left: 10,
    fontSize: SIZES.xxSmall,
    color: COLORS.black,
  },
  input: {
    width: "100%",
    fontSize: SIZES.medium,
    fontWeight: FONT.bold,
    color: COLORS.primarybackground,
    marginTop: 3,
    justifyContent: "center",
    height: "100%",
  },
  inputFocused: {
    borderColor: COLORS.primarybackground,
  },
  inputValid: {
    borderBottomColor: COLORS.blue,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 18,
    width: 20,
    height: 20,
    tintColor: COLORS.green,
  },
});

export default ForgotPassword;
