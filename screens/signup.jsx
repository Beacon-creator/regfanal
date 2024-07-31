import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
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
import GoogleIcon from "../assets/google.png";
import AppleIcon from "../assets/apple.png";
import Check from "../assets/checksuccess.png";
import Bigbuttonicon from "../components/bigbuttonicon";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import "../googleConfig"; // Import the Google Signin configuration

const Signup = () => {
  const navigation = useNavigation(); // Initialize navigation

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const isSignupDisabled = !(
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    username &&
    email &&
    password
  );

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      // Check if all fields are valid
      if (isUsernameValid && isEmailValid && isPasswordValid) {
        // Make a POST request to your backend signup endpoint
        const response = await axios.post(
          "https://firstbackend-1c5d.onrender.com/api/signup",
          {
            username: username,
            useremail: email,
            password: password,
          }
        );

        // Handle successful signup
        Alert.alert(
          "Success",
          "Signup successful!",
          [
            {
              text: "Ok",
              onPress: () => {
                navigation.navigate("VerifyEmail", {
                  email: email,
                });
              },
              style: "cancel",
            },
            {
              text: "Sign in",
              onPress: () => {
                navigation.navigate("VerifyEmail", {
                  email: email,
                });
              },
              style: "default",
            },
          ],
          {
            cancelable: false,
            style: styles.alert,
            messageStyle: styles.message,
          }
        );
      } else {
        // Display an error message if any field is invalid
        Alert.alert("Invalid Input", "Please fill in all fields correctly.");
      }
    } catch (error) {
      // Handle errors
      Alert.alert(
        "Error",
        "Email is already in use. Please check details again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTapLogin = () => {
    // Navigate to Forgot Password screen
    navigation.navigate("Login");
  };

  const handleUsernameFocus = () => {
    setIsUsernameFocused(true);
    setIsEmailFocused(false);
    setIsPasswordFocused(false);
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
    setIsUsernameFocused(false);
    setIsPasswordFocused(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
    setIsEmailFocused(false);
    setIsUsernameFocused(false);
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
    // Check if username has at least six characters
    setIsUsernameValid(text.length >= 6);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
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

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.idToken;

      // Send the idToken to your backend for verification and login
      const response = await axios.post(
        "https://firstbackend-1c5d.onrender.com/api/auth/google",
        {
          token: idToken,
        }
      );

      if (response.status === 200) {
        // Handle successful login
        Alert.alert("Success", "Login successful!");
        // You can navigate to the next screen or perform other actions here
      } else {
        Alert.alert("Error", "Login failed. Please try again.");
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Cancelled", "User cancelled the login process");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("In Progress", "Login is in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(
          "Play Services Not Available",
          "Play services are not available or outdated"
        );
      } else {
        Alert.alert("Error", "An error occurred during login");
      }
    }
  };

  return (
    <SafeAreaView style={{ ...STYLES.container, flex: 1 }}>
      <View>
        <View style={{ marginTop: 50 }}>
          <Text style={BodyText.Header}>Sign up to new opportunities</Text>
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
            keyboardType="default"
            style={[styles.input, isUsernameFocused && styles.inputFocused]}
            value={username}
            onChangeText={handleUsernameChange}
            onFocus={handleUsernameFocus}
            onBlur={() => setIsUsernameFocused(false)}
          />
          <Text
            style={[
              styles.placeholder,
              isUsernameFocused && { color: COLORS.primarybackground },
            ]}
          >
            Username
          </Text>
          {isUsernameValid && <Image source={Check} style={styles.icon} />}
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
            onFocus={handleEmailFocus}
            onBlur={() => setIsEmailFocused(false)}
          />
          <Text
            style={[
              styles.placeholder,
              isEmailFocused && { color: COLORS.primarybackground },
            ]}
          >
            Email Address
          </Text>
          {isEmailValid && <Image source={Check} style={styles.icon} />}
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
            keyboardType="default"
            style={[styles.input, isPasswordFocused && styles.inputFocused]}
            value={password}
            secureTextEntry={!isPasswordShown}
            onChangeText={handlePasswordChange}
            onFocus={handlePasswordFocus}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <Text
            style={[
              styles.placeholder,
              isPasswordFocused && { color: COLORS.primarybackground },
            ]}
          >
            Password
          </Text>
          {renderShowText()}
          {isPasswordValid && <Image source={Check} style={styles.icon} />}
        </View>

        <View style={styles.buttonContainer}>
          <Bigbuttonicon
            title="Sign up"
            disabled={isSignupDisabled}
            onPress={handleSignup}
          />
          {isLoading && (
            <ActivityIndicator size="large" color={COLORS.primary} />
          )}
        </View>
      </View>

      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>or</Text>
        <View style={styles.separatorLine} />
      </View>

      <View style={styles.buttonContainer}>
        <FlatButton2
          iconSource={GoogleIcon}
          text="Continue with Google"
          onPress={signInWithGoogle}
        />
      </View>

      <TouchableOpacity onPress={handleTapLogin}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Add your styles here
  input: {
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  inputValid: {
    borderColor: COLORS.green,
  },
  inputFocused: {
    borderColor: COLORS.primary,
  },
  showTextContainer: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  showTextContainerValid: {
    position: "absolute",
    right: 10,
    top: 0,
  },
  showText: {
    color: COLORS.primary,
  },
  showTextValid: {
    color: COLORS.green,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 15,
    width: 20,
    height: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray,
  },
  separatorText: {
    marginHorizontal: 10,
    color: COLORS.gray,
  },
  linkText: {
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Signup;
