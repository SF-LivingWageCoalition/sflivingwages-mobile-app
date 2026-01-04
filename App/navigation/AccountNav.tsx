import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { colors } from "../theme";
import { fontWeight } from "../theme/fontStyles";
import { translate } from "../translation/i18n";
import type { AccountStackParamList } from "../types/types";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";

const Stack = createStackNavigator<AccountStackParamList>();

const AccountNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: { backgroundColor: colors.light.primary },
        headerTintColor: colors.light.textOnPrimary,
        headerTitleStyle: { fontWeight: fontWeight.bold },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: translate("accountScreen.profile"),
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
