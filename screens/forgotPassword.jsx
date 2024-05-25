import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
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
  FONT,
} from "../constants/theme";
import FlatButton2 from "../components/button2";
import Check from "../assets/checksuccess.png";
import { useNavigation } from "@react-navigation/native";
import backicon from "../assets/backicon.png";
import axios from "axios";

function ForgotPassword() {
  const navigation = useNavigation(); // Initialize navigation
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(""); // Declare email state variable
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const isForgotPasswordDisabled = !(isEmailValid && email);

  const handleBackIconPress = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleVerificationContinue = async () => {
    try {
      setIsLoading(true);
      if (isEmailValid) {
        const response = await axios.post(
          "https://firstbackend-1c5d.onrender.com/api/forgot_password",
          { useremail: email }
        );

        //console.log("Code sent:", response.data);
        Alert.alert(
          "Success",
          "Code sent successfully!",
          [
            {
              text: "Next",
              onPress: () => {
                navigation.navigate("VerifyPasswordChangeCode", {email: email });
              },
            },
          ],
          {
            cancelable: false,
          }
        );
      } else {
        Alert.alert("Invalid Email", "Please, check your email.");
      }
    } catch (error) {
      //console.error("Error sending code:", error.response.data);
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
    // Basic email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <SafeAreaView style={{ ...STYLES.container, flex: 1 }}>
      <View>
        <View
          style={{
            ...STYLES.container4,
          }}
        >
          <TouchableOpacity onPress={handleBackIconPress}>
            <Image source={backicon} />
          </TouchableOpacity>

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
            keyboardType="email-address"
            style={[styles.input, isEmailFocused && styles.inputFocused]}
            value={email}
            onChangeText={handleEmailChange}
            // Clear the text input value when it's focused
            onFocus={handleEmailFocus}
            onBlur={() => setIsEmailFocused(false)}
          />
          {/* Absolute positioning for the placeholder text */}
          <Text
            style={[
              styles.placeholder,
              isEmailFocused && { color: COLORS.primarybackground },
            ]}
          >
            Enter your Email
          </Text>

          {/* Checkmark icon for valid email */}
          {isEmailValid && <Image source={Check} style={styles.icon} />}
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={BodyText.leftsmalltext}>
            Make sure your email is correct
          </Text>
        </View>

        <View style={{ marginTop: 10, position: "relative" }}>
          {/* Render the FlatButton2 and ActivityIndicator inside a parent container */}
          <View style={BUTTON.activitybutton}>
            {/* Render ActivityIndicator */}
            {isLoading && (
              <ActivityIndicator
                size="small"
                color={COLORS.primarybackground}
              />
            )}
          </View>
          {/* Render FlatButton2 */}
          <FlatButton2
            text="Continue"
            backColor={COLORS.primarybackground}
            textcolor={COLORS.white}
            onPress={() => {
              if (!isForgotPasswordDisabled) {
                handleVerificationContinue();
              }
            }}
            disabled={isForgotPasswordDisabled}
          />
        </View>

        <View style={{ marginTop: 15 }}>
          <Text
            style={{
              fotnSize: SIZES.medium,
              color: COLORS.primarybackground,
              fontWeight: FONT.bold,
              textAlign: "center",
            }}
          >
            {" "}
            Need Help?
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  showTextContainer: {
    position: "absolute",
    right: 12,
    marginTop: 3,
    justifyContent: "center",
    height: "100%",
  },
  showTextContainerValid: {
    position: "absolute",
    right: 40, // Adjust as needed
    top: 1,
    justifyContent: "center",
    height: "100%",
  },
  showText: {
    color: COLORS.black,
  },
  showTextValid: {
    color: COLORS.black,
  },
  forgotpasswordtext: {
    color: COLORS.primarybackground,
    marginTop: 16,
    fontSize: SIZES.xSmall,
  },
  placeholder: {
    position: "absolute",
    top: 2, // Adjust as needed
    left: 10,
    fontSize: SIZES.xxSmall,
    right: 0,
    color: COLORS.black, // Placeholder color
  },
  input: {
    width: "100%",
    fontSize: SIZES.medium,
    fontWeight: FONT.bold,
    color: COLORS.primarybackground,
    marginTop: 3,
    //textAlignVertical: "center",
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
    tintColor: COLORS.green, // Color for valid input
  },
  backIcon: {
    marginRight: 0, // Adjust as needed
  },
  spacetextContainer: {
    flex: 1, // Take remaining space to center the text
    alignItems: "center", // Center horizontally
    marginTop: 15,
  },
});

export default ForgotPassword;
