import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { colors } from "../theme";
import { fontWeight } from "../theme/fontStyles";
import { translate } from "../translation/i18n";
import { AuthStackParamList } from "../types";
import Login from "./LoginScreen";
import Register from "./RegisterScreen";
import ForgotPassword from "./ForgotPasswordScreen";

const Stack = createStackNavigator<AuthStackParamList>();

const MyStack: React.FC = () => {
  return (
    <Stack.Navigator
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
        component={Login}
      />
      <Stack.Screen
        name="Register"
        options={{ title: translate("registerScreen.title") }}
        component={Register}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{ title: translate("forgotPasswordScreen.title") }}
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
};

const AuthNavigator: React.FC = () => {
  return <MyStack />;
};

export default AuthNavigator;
