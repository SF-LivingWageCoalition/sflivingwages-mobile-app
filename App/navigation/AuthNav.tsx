import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { colors } from "../theme";
import { fontWeight } from "../theme/fontStyles";
import { translate } from "../translation/i18n";
import type { AuthStackParamList } from "../types/types";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen/ForgotPasswordScreen";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: colors.light.primary },
        headerTintColor: colors.light.textOnPrimary,
        headerTitleStyle: { fontWeight: fontWeight.bold },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Login"
        options={{ title: translate("loginScreen.title") }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="Register"
        options={{ title: translate("registerScreen.title") }}
        component={RegisterScreen}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{ title: translate("forgotPasswordScreen.title") }}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
