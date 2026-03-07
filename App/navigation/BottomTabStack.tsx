import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import AssistanceHome from "../screens/AssistanceHome/AssistanceHome";
import ContributeScreen from "../screens/ContributeScreen/ContributeScreen";
import NewHome from "../screens/HomeScreen/NewHome";
import AccountScreen from "../screens/AccountScreen/AccountScreen";
import { colors } from "../theme";
import { BottomTabParamList } from "../types/types";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabStack: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.light.primary,
        },
        tabBarActiveTintColor: colors.light.textOnPrimary,
        tabBarInactiveTintColor: colors.light.textPrimary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={NewHome}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name={"home"} color={color} size={20} />
          ),
        }}
      />

      <Tab.Screen
        name="Contribute"
        component={ContributeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Contribute",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name={"hand-holding-heart"} color={color} size={20} />
          ),
        }}
      />

      <Tab.Screen
        name="Assist"
        component={AssistanceHome}
        options={{
          headerShown: false,
          tabBarLabel: "Assist",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name={"hands-helping"} color={color} size={20} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name={"user-circle"} color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabStack;
