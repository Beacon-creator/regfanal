import "expo-dev-client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Login,
  Onboarding,
  Signup,
  VerifyEmail,
  ForgotPassword,
  NewPassword,
  PasswordChanged,
  VerifyPasswordChangeCode,
} from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          contentStyle: { padding: 0, margin: 0 }, // Remove default padding and margin
        }}
      >
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="VerifyEmail"
          component={VerifyEmail}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="VerifyPasswordChangeCode"
          component={VerifyPasswordChangeCode}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="PasswordChanged"
          component={PasswordChanged}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
