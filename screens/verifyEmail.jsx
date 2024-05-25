import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FlatButton2 from "../components/button2";
import { COLORS,BUTTON, BodyText, STYLES, SIZES, FONT } from "../constants/theme";
import SmallBox from "../components/smallbox";
import axios from "axios";

function VerifyEmail() {
  const navigation = useNavigation(); // Initialize navigation
  const route = useRoute(); // Get the route object

  const { email } = route.params; // Get the email parameter from route.params

  const [isContinueDisabled, setIsContinueDisabled] = useState(true); // Initially disabled
  const [isLoading, setIsLoading] = useState(false);

  const smallBoxRef = useRef(null);

  const handleVerificationEmail = async () => {
    setIsLoading(true); // Start loading

    try {
      const otpArray = smallBoxRef.current.getValue();
      const otp = otpArray.join(""); // Concatenate OTP digits into a single string
      // console.log(otp);
      await axios.post("https://firstbackend-1c5d.onrender.com/api/verifyotp", {
        otp,
      });

      Alert.alert("Success", "Email verified successfully");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", "Invalid code. Please try again.");
      // console.error("Error verifying email:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleResendEmailVerificationcode = async () => {
    try {
      setIsLoading(true); // Start loading
      await axios.post("https://firstbackend-1c5d.onrender.com/api/resendotp", {
        useremail: email,
      });
      Alert.alert("Success", "Verification code resent successfully");
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to resend verification code. Please try again."
      );
    //  console.error("Error resending verification code:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleSmallBoxChange = (value) => {
    const allFieldsFilled =
      value.length === 4 && value.every((val) => val !== "");
    setIsContinueDisabled(!allFieldsFilled);
  };

  return (
    <SafeAreaView style={{ ...STYLES.container, flex: 1 }}>
      <View style={{ marginTop: 40 }}>
        <View style={{ marginTop: 10 }}>
          <Text style={BodyText.Header}>Verify Email</Text>
          <View>
            <Text style={[BodyText.centersmalltext2, { marginTop: -15 }]}>
              sent to {email}
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
            textColor={COLORS.white}
            onPress={() => {
              if (!isContinueDisabled) {
                handleVerificationEmail();
              }
            }}
            disabled={isContinueDisabled} // Disable based on isForgotPasswordDisabled
          />
        </View>

        <View style={{ marginTop: 15 }}>
          <TouchableOpacity onPress={handleResendEmailVerificationcode}>
            <Text
              style={{
                fontSize: SIZES.medium,
                color: COLORS.primarybackground,
                fontWeight: FONT.bold,
                textAlign: "center",
              }}
            >
              {" "}
              Resend code
            </Text>
          </TouchableOpacity>
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
        </View>
      </View>
    </SafeAreaView>
  );
}

export default VerifyEmail;
