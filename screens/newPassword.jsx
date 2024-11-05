import React, { useState, useEffect } from "react";
import {
  View,
  Pressable,
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
import api from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  useEffect(() => {
    const fetchToken = async () => {
      const savedToken = await AsyncStorage.getItem("tempToken");
   
    };
    fetchToken();
  }, []);

  const handleContinue = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("tempToken");
    

      if (!token) {
        Alert.alert("Error", "User not authenticated. Please log in again.");
        navigation.navigate("Login"); // Redirect to Login screen if token is missing
        return;
      }

      if (isNewPasswordValid && isNewPasswordTwoValid) {
        const response = await api.post(
          "/newpassword",
          {
            email: email,
            newPassword: newPassword,
            confirmPassword: newPasswordTwo,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

     
        Alert.alert(
          "Success",
          "Password changed successfully!",
          [
            {
              text: "Sign in",
              onPress: () => {
                navigation.navigate("Login");
              },
            },
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("PasswordChanged");
              },
            },
          ],
          {
            cancelable: false,
          }
        );
      } else {
        Alert.alert("Invalid Input", "Please fill in all fields correctly.");
      }
    } catch (error) {
      if (error.response) {
        // Handling 'User not authenticated' error
        if (error.response.data.error === "User not authenticated") {
          Alert.alert(
            "Authentication Error",
            "Your session has expired. Please log in again."
          );
          navigation.navigate("Login"); // Redirect to Login screen
        } else {
          Alert.alert(
            "Error",
            error.response.data.error || "Error updating password."
          );
        }
      } else {
       
        Alert.alert("Error", "Error updating password. Please try again.");
      }
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
        <Pressable
          onPress={() => setIsPasswordShown(!isPasswordShown)}
          style={styles.showTextContainerValid}
        >
          <Text style={styles.showTextValid}>
            {isPasswordShown ? "Hide" : "Show"}
          </Text>
        </Pressable>
      );
    } else {
      // If password is invalid, maintain the initial position of the "Show" text
      return (
        <Pressable
          onPress={() => setIsPasswordShown(!isPasswordShown)}
          style={styles.showTextContainer}
        >
          <Text style={styles.showText}>
            {isPasswordShown ? "Hide" : "Show"}
          </Text>
        </Pressable>
      );
    }
  };

  const renderShowTextTwo = () => {
    if (isNewPasswordTwoValid) {
      // If password is valid, position the "Show" text to the left
      return (
        <Pressable
          onPress={() => setIsPasswordShown(!isPasswordShown)}
          style={styles.showTextContainerValid}
        >
          <Text style={styles.showTextValid}>
            {isPasswordShown ? "Hide" : "Show"}
          </Text>
        </Pressable>
      );
    } else {
      // If password is invalid, maintain the initial position of the "Show" text
      return (
        <Pressable
          onPress={() => setIsPasswordShown(!isPasswordShown)}
          style={styles.showTextContainer}
        >
          <Text style={styles.showText}>
            {isPasswordShown ? "Hide" : "Show"}
          </Text>
        </Pressable>
      );
    }
  };

  return (
    <SafeAreaView style={{ ...STYLES.container, flex: 1 }}>
      <View>
        <View style={{ marginTop: 15 }}>
          <Text style={BodyText.Header}>Your New Password</Text>
          <Text style={[BodyText.centersmalltext2, { marginTop: -15 }]}>
            {email}
          </Text>
        </View>

        <View
          style={[
            loginstyles.inputArea,
            isNewPasswordValid && styles.inputValid,
            isNewPasswordFocused && styles.inputFocused,
            { marginTop: 40 },
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
            8+ characters, atleast 1 uppercase & 1 number
          </Text>
        </View>

        <View style={{ position: "relative" }}>
          {/* Render the FlatButton2 and ActivityIndicator inside a parent container */}
          <View style={BUTTON.activitybutton}>
            {/* Render ActivityIndicator */}
            {isLoading && (
              <ActivityIndicator
                style={BUTTON.activitybutton}
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
            disabled={isContinueDisabled || isLoading}
          />
        </View>

        <View style={STYLES.container3}>
          <Text style={BodyText.centersmalltext}>
            Already have an account?{" "}
          </Text>
          <Pressable onPress={handleLogin}>
            <Text style={[BodyText.centersmalltext3]}>Log in</Text>
          </Pressable>
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
