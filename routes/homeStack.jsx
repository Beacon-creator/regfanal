import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../screens/Onboarding";
import Login from "../screens/login";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default HomeStack;
