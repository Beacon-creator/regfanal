import React, { useState } from "react";
import {
  View,
  Pressable,
  TextInput,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  STYLES,
  BodyText,
  COLORS,
  BUTTON,
  loginstyles,
  SIZES,
  FONT,
} from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import FlatButton2 from "../components/button2";
import DiscordIcon from "../assets/discord.png";
import AppleIcon from "../assets/apple.png";
import Check from "../assets/checksuccess.png";
import Bigbuttonicon from "../components/bigbuttonicon";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const isLoginDisabled = !(
    isUsernameValid &&
    isPasswordValid &&
    username &&
    password
  );

  const handleForgotPassword = () => {
    // Navigate to Forgot Password screen
    navigation.navigate("ForgotPassword");
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      // Check if all fields are valid
      if (isUsernameValid && isPasswordValid) {
        // Make a POST request to your backend login endpoint
        const response = await axios.post(
          "https://firstbackend-1c5d.onrender.com/api/login",
          {
            username: username,
            password: password,
          }
        );

        await AsyncStorage.setItem("auth_token", response.data.token);

        Alert.alert(
          "Success",
          "Login successful!",

          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Onboarding");
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        // Display an error message if any field is invalid
        Alert.alert("Invalid Input", "Please fill in all fields correctly.");
      }
    } catch (error) {
      Alert.alert(
        "Warning",
        "Username or password is incorrect. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginDiscord = async () => {
    try {
      setIsLoading(true);

      const redirectUri = AuthSession.makeRedirectUri({
        scheme: "com.fanal.eduotter", // Your app's custom scheme
      });

      const authUrl = `https://firstbackend-1c5d.onrender.com/api/auth/discord?redirect_uri=${encodeURIComponent(
        redirectUri
      )}`;

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri
      );

      if (result.type === "success" && result.url) {
        const redirectUrl = result.url;
        const tokenMatch = redirectUrl.match(/token=([^&]*)/);

        if (tokenMatch) {
          const token = tokenMatch[1];

          // Store the token in AsyncStorage
          await AsyncStorage.setItem("auth_token", token);

          Alert.alert("Success", "Login successful!", [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Onboarding");
              },
            },
          ]);
        } else {
          Alert.alert(
            "Login Failed",
            "Token not found. Something went wrong during the login process."
          );
        }
      } else {
        Alert.alert(
          "Login Failed",
          "Something went wrong during the login process."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginApple = async () => {
    Alert.alert("Login Failed", "Apple login is not available for now.");
  };

  const handleTapSignup = () => {
    // Navigate to Forgot Password screen
    navigation.navigate("Signup");
  };

  const handleUsernameFocus = () => {
    setIsUsernameFocused(true);
    setIsPasswordFocused(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
    setIsUsernameFocused(false);
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
    setIsUsernameValid(text.length >= 6);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setIsPasswordValid(validatePassword(text));
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Password validation
    // At least 6 characters, one uppercase letter, and one number
    const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  const renderShowText = () => {
    if (isPasswordValid) {
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
        <View style={{ marginTop: 10 }}>
          <Text style={BodyText.Header}>Welcome Back</Text>
        </View>

        <View
          style={[
            loginstyles.inputArea,
            isUsernameValid && styles.inputValid,
            isUsernameFocused && styles.inputFocused,
          ]}
        >
          <TextInput
            placeholderTextColor={COLORS.black}
            inputMode="default"
            style={[styles.input, isUsernameFocused && styles.inputFocused]}
            value={username}
            onChangeText={handleUsernameChange}
            // Clear the text input value when it's focused
            onFocus={handleUsernameFocus}
            onBlur={() => setIsUsernameFocused(false)}
          />
          {/* Absolute positioning for the placeholder text */}
          <Text
            style={[
              styles.placeholder,
              isUsernameFocused && { color: COLORS.primarybackground },
            ]}
          >
            Username or Email
          </Text>

          {/* Checkmark icon for valid email */}
          {isUsernameValid && <Image source={Check} style={styles.icon} />}
        </View>

        <View
          style={[
            loginstyles.inputArea,
            isPasswordValid && styles.inputValid,
            isPasswordFocused && styles.inputFocused,
          ]}
        >
          <TextInput
            placeholderTextColor={COLORS.black}
            secureTextEntry={!isPasswordShown}
            style={[styles.input, isPasswordFocused && styles.inputFocused]}
            value={password}
            onChangeText={handlePasswordChange}
            onFocus={handlePasswordFocus}
            onBlur={() => setIsPasswordFocused(false)}
          />
          {/* Absolute positioning for the placeholder text */}
          <Text
            style={[
              styles.placeholder,
              isPasswordFocused && { color: COLORS.primarybackground },
            ]}
          >
            Password
          </Text>

          {/* Checkmark icon for valid password */}
          {isPasswordValid && <Image source={Check} style={styles.icon} />}
          {renderShowText()}
        </View>

        <View style={{ marginTop: 10 }}>
          <Pressable onPress={handleForgotPassword}>
            <Text
              style={{
                color: COLORS.primarybackground,
                fontSize: SIZES.small,
                fontWeight: FONT.bold,
              }}
            >
              Forgot Password
            </Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 10 }}>
          <FlatButton2
            text={isLoading ? "" : "Log in"} // Hide text when loading
            backColor={COLORS.primarybackground}
            textcolor={COLORS.white}
            onPress={() => {
              if (!isLoginDisabled) {
                handleLogin();
              }
            }}
            disabled={isLoginDisabled || isLoading}
          />

          {isLoading && (
            <ActivityIndicator
              style={BUTTON.activitybutton}
              size="small"
              color={COLORS.white} // Spinner color matches button text color
            />
          )}
        </View>

        <View style={STYLES.container3}>
          <Text style={BodyText.centersmalltext}>Don't have an account? </Text>
          <Pressable onPress={handleTapSignup}>
            <Text style={[BodyText.centersmalltext3]}>Sign up</Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 20 }}>
          <Bigbuttonicon
            iconSource={DiscordIcon}
            text="Sign in with Discord"
            backColor={COLORS.transparent}
            textcolor={COLORS.black}
            onPress={() => {
              handleLoginDiscord();
            }}
          />
          <Bigbuttonicon
            iconSource={AppleIcon}
            text="Sign in with Apple"
            backColor={COLORS.black}
            textcolor={COLORS.white}
            onPress={() => {
              handleLoginApple();
            }}
          />
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
});

export default Login;
