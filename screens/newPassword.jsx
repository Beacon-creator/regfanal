import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FlatButton2 from "../components/button2";
import Check from "../assets/checksuccess.png";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import {
  STYLES,
  BodyText,
  BUTTON,
  COLORS,
  loginstyles,
  SIZES,
  FONT,
} from "../constants/theme";

const NewPassword = () => {
  const navigation = useNavigation(); // Initialize navigation
  const route = useRoute(); // Get the route object
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);

  const [newPasswordTwo, setNewPasswordTwo] = useState("");
  const [isNewPasswordTwoFocused, setIsNewPasswordTwoFocused] = useState(false);
  const [isNewPasswordTwoValid, setIsNewPasswordTwoValid] = useState(false);

  const isContinueDisabled = !(
    isNewPasswordValid &&
    isNewPasswordTwoValid &&
    newPassword &&
    newPasswordTwo
  );

  const { email } = route.params; // Get the email parameter from route.params

 // const email = "emailhere";

  const handleForgotPassword = () => {
    // Navigate to Forgot Password screen
    navigation.navigate("ForgotPassword");
  };

  const handleContinue = async () => {
    try {
      setIsLoading(true);
      // Check if all fields are valid
      if (isNewPasswordValid && isNewPasswordTwoValid) {
        // Make a POST request to your backend signup endpoint
        const response = await axios.post(
          "https://firstbackend-1c5d.onrender.com/api/newpassword",
          {
            newPassword: newPassword,
            confirmPassword: newPasswordTwo,
          }
        );

        // Handle successful signup
        console.log("Password changed successful:", response.data);
        Alert.alert(
          "Success",
          "Password changed successful!",
          [
            {
              text: "Sign in",
              onPress: () => {
                navigation.navigate("PasswordChanged");
              },
              style: "cancel", // You can customize the button style
            },
            {
              text: "OK",
              onPress: () => {
                console.log("Continue pressed");
              },
              style: "default",
            },
          ],
          {
            cancelable: false,
            style: styles.alert,
            messageStyle: styles.message,
          } // You can specify whether the alert is cancelable
        );
      } else {
        // Display an error message if any field is invalid
        Alert.alert("Invalid Input", "Please fill in all fields correctly.");
      }
    } catch (error) {
      // Handle errors
    //  console.error("Error signing up:", error.response.data);
      Alert.alert(
        "Error",
        "Error updating password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    // Navigate to the Signup screen
    navigation.navigate("Login");
  };

  const handlePasswordFocus = () => {
    setIsNewPasswordFocused(true);
    setIsNewPasswordTwoFocused(false);
  };

  const handlePasswordChange = (text) => {
    setNewPassword(text);
    setIsNewPasswordValid(validatePassword(text));
  };

  const handlePasswordTwoChange = (text) => {
    setNewPasswordTwo(text);
    setIsNewPasswordTwoValid(text === newPassword && validatePassword(text));
  };

  const validatePassword = (password) => {
    // Password validation
    // At least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const renderShowText = () => {
    if (isNewPasswordValid) {
      // If password is valid, position the "Show" text to the left
      return (
        <TouchableOpacity
          onPress={() => setIsPasswordShown(!isPasswordShown)}
          style={styles.showTextContainerValid}
        >
          <Text style={styles.showTextValid}>
            {isPasswordShown ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      );
    } else {
      // If password is invalid, maintain the initial position of the "Show" text
      return (
        <TouchableOpacity
          onPress={() => setIsPasswordShown(!isPasswordShown)}
          style={styles.showTextContainer}
        >
          <Text style={styles.showText}>
            {isPasswordShown ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const renderShowTextTwo = () => {
    if (isNewPasswordTwoValid) {
      // If password is valid, position the "Show" text to the left
      return (
        <TouchableOpacity
          onPress={() => setIsPasswordShown(!isPasswordShown)}
          style={styles.showTextContainerValid}
        >
          <Text style={styles.showTextValid}>
            {isPasswordShown ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      );
    } else {
      // If password is invalid, maintain the initial position of the "Show" text
      return (
        <TouchableOpacity
          onPress={() => setIsPasswordShown(!isPasswordShown)}
          style={styles.showTextContainer}
        >
          <Text style={styles.showText}>
            {isPasswordShown ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={{ ...STYLES.container, flex: 1 }}>
      <View>
        <View style={{ marginTop: 15 }}>
          <Text style={BodyText.Header}>Your New Password</Text>
          <Text style={[BodyText.centersmalltext2, {marginTop: -15}]}>{email}</Text>
        </View>

        <View
          style={[ 
            loginstyles.inputArea,
            isNewPasswordValid && styles.inputValid,
            isNewPasswordFocused && styles.inputFocused, {marginTop: 40}
          ]}
        >
          <TextInput
            placeholderTextColor={COLORS.black}
            secureTextEntry={!isPasswordShown}
            style={[styles.input, isNewPasswordFocused && styles.inputFocused]}
            value={newPassword}
            onChangeText={handlePasswordChange}
            onFocus={handlePasswordFocus}
            onBlur={() => setIsNewPasswordFocused(false)}
          />
          {/* Absolute positioning for the placeholder text */}
          <Text
            style={[
              styles.placeholder,
              isNewPasswordFocused && { color: COLORS.primarybackground },
            ]}
          >
            Password
          </Text>

          {/* Checkmark icon for valid password */}
          {isNewPasswordValid && <Image source={Check} style={styles.icon} />}
          {renderShowText()}
        </View>

        <View
          style={[
            loginstyles.inputArea,
            isNewPasswordTwoValid && styles.inputValid,
            isNewPasswordTwoFocused && styles.inputFocused,
          ]}
        >
          <TextInput
            placeholderTextColor={COLORS.black}
            secureTextEntry={!isPasswordShown}
            style={[
              styles.input,
              isNewPasswordTwoFocused && styles.inputFocused,
            ]}
            value={newPasswordTwo}
            onChangeText={handlePasswordTwoChange}
            onFocus={() => setIsNewPasswordTwoFocused(true)}
            onBlur={() => setIsNewPasswordTwoFocused(false)}
          />
          {/* Absolute positioning for the placeholder text */}
          <Text
            style={[
              styles.placeholder,
              isNewPasswordTwoFocused && { color: COLORS.primarybackground },
            ]}
          >
            Confirm Password
          </Text>

          {/* Checkmark icon for valid password */}
          {isNewPasswordTwoValid && (
            <Image source={Check} style={styles.icon} />
          )}
          {renderShowTextTwo()}
        </View>

        <View style={{ marginVertical: 5 }}>
          <Text
            style={{
              color: COLORS.othertext,
              fontSize: SIZES.xxSmall,
              fontWeight: FONT.bold,
            }}
          >
            6+ characters, atleast 1 uppercase & 1 number
          </Text>
        </View>

        <View style={{ position: "relative" }}>
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
              if (!isContinueDisabled) {
                handleContinue();
              }
            }}
            disabled={isContinueDisabled}
          />
        </View>

        <View style={STYLES.container3}>
          <Text style={BodyText.centersmalltext}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={[BodyText.centersmalltext3]}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
});

export default NewPassword;
