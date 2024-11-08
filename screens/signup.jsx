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
  RESPONSIVENESS,
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
import { Linking } from "react-native"; // Import Linking for opening URLs

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
      if (isUsernameValid && isEmailValid && isPasswordValid) {

        const response = await axios.post(
          "https://firstbackend-1c5d.onrender.com/api/signup",
          {
            username: username,
            useremail: email,
            password: password,
          }
        );
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
              style: "cancel", // You can customize the button style
            },
            {
              text: "Verify",
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
          } // You can specify whether the alert is cancelable
        );
      } else {
        // Display an error message if any field is invalid
        Alert.alert("Invalid Input", "Please fill in all fields correctly.");
      }
    } catch (error) {
     
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

  const signUpWithGoogle = async () => {
    try {
      const response = await fetch(
        "https://firstbackend-1c5d.onrender.com/api/login",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      // Use Linking to open the URL in the browser
      if (data && data.url) {
        Linking.openURL(data.url);
      } else {
        Alert.alert("Error", "Failed to initiate Google Sign-Up.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong with Google Sign-Up.");
     
    }
  };

  return (
    <SafeAreaView style={{ ...STYLES.container, flex: 1 }}>
      <View>
        <View style={{ marginTop: 10 }}>
       
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
            Username
          </Text>

          {/* Checkmark icon for valid email */}
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
            inputMode="email-address"
            style={[styles.input, isUsernameFocused && styles.inputFocused]}
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
            Email
          </Text>

          {/* Checkmark icon for valid email */}
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
          {/* Render FlatButton2 */}
          <FlatButton2
            text="Continue"
            backColor={COLORS.primarybackground}
            textcolor={COLORS.white}
            onPress={() => {
              if (!isSignupDisabled && !isLoading) {
                handleSignup();
              }
            }}
            disabled={isSignupDisabled || isLoading} // Disable button during loading
          />
          {/* Render the ActivityIndicator inside the button */}
          {isLoading && (
            <ActivityIndicator
              style={BUTTON.activitybutton}
              size="small"
              color={COLORS.primarybackground}
            />
          )}
        </View>

        <View style={STYLES.container3}>
          <Text style={BodyText.centersmalltext}>
            Already have an account?{" "}
          </Text>
          <Pressable onPress={handleTapLogin}>
            <Text style={[BodyText.centersmalltext3]}>Log in</Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 10 }}>
          <Bigbuttonicon
            iconSource={GoogleIcon}
            text="Sign up with Google"
            backColor={COLORS.transparent}
            textcolor={COLORS.black}
            onPress={isLoading ? null : signUpWithGoogle}
            disabled={isLoading} // Disable Google button during loading
          />

          <Bigbuttonicon
            iconSource={AppleIcon}
            text="Sign up with Apple"
            backColor={COLORS.black}
            textcolor={COLORS.white}
            disabled={isLoading} // Disable Apple button during loading
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Define custom styles for the alert
  alert: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "red",
    backgroundColor: "lightblue",
  },
  // Define custom styles for the alert message
  message: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
  },

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

export default Signup;
