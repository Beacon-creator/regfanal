import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FlatButton2 from "../components/button2";
import {
  COLORS,
  BodyText,
  BUTTON,
  STYLES,
  SIZES,
  FONT,
} from "../constants/theme";
import api from "../constants/api";
import SmallBox from "../components/smallbox";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function VerifyPasswordChangeCode() {
  const navigation = useNavigation();
  const route = useRoute();

  const email = route.params?.email || ""; // Safely accessing email with a default value

  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const smallBoxRef = useRef(null);

  const handlePasswordVerificationContinue = async () => {
    setIsLoading(true);
    try {
      const otpArrays = smallBoxRef.current.getValue();
      const uniqueOtp = otpArrays.join("");
      const response = await api.post("/verifypasswordotp", {
        uniqueOtp,
        email,
      });

      Alert.alert("Success", "Email verified successfully");
      const { token } = response.data;
      await AsyncStorage.setItem("tempToken", token);
      navigation.navigate("NewPassword", { email, token });
    } catch (error) {
      Alert.alert("Error", "Code is invalid. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendPasscode = async () => {
    try {
      setIsLoading(true);
      await axios.post(
        "https://firstbackend-1c5d.onrender.com/api/resendotppassword",
        {
          useremail: email,
        }
      );
      Alert.alert("Success", "Code resent successfully");
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to resend verification code. Please try again."
      );
    } finally {
      setIsLoading(false); // This will run regardless of success or error
    }
  };

  const handleSmallBoxChange = (value) => {
    const allFieldsFilled =
      value.length === 4 && value.every((val) => val !== "");
    setIsContinueDisabled(!allFieldsFilled);
  };

  return (
    <SafeAreaView style={{ ...STYLES.container, flex: 1 }}>
      <View style={{ marginTop: 10 }}>
        <View style={{ marginTop: 10 }}>
          <Text style={BodyText.Header}>Verification Code</Text>
          <View>
            <Text style={[BodyText.centersmalltext2, { marginTop: -15 }]}>
              code has been sent to {email}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 40 }}>
          <SmallBox
            ref={smallBoxRef}
            length={4}
            inputStyle={{ borderColor: COLORS.borderBlue }}
            containerStyle={{ marginTop: 10 }}
            onChange={handleSmallBoxChange}
          />
        </View>

        <View style={{ position: "relative" }}>
          <FlatButton2
            text={isLoading ? "" : "Continue"} // Hide text when loading
            backColor={COLORS.primarybackground}
            textcolor={COLORS.white}
            onPress={() => {
              if (!isContinueDisabled) {
                handlePasswordVerificationContinue();
              }
            }}
            disabled={isContinueDisabled || isLoading}
          />

          {isLoading && (
            <ActivityIndicator
              style={BUTTON.activitybutton}
              size="small"
              color={COLORS.white} // Spinner color matches button text color
            />
          )}
        </View>

        <View style={{ marginTop: 15 }}>
          <Pressable onPress={handleResendPasscode}>
            <Text
              style={{
                fontSize: SIZES.medium,
                color: COLORS.primarybackground,
                fontWeight: FONT.bold,
                textAlign: "center",
              }}
            >
              Resend code
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default VerifyPasswordChangeCode;
