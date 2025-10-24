import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AssistanceHome from "../screens/AssistanceHome/AssistanceHome";
import BeReadyForICE from "../screens/BeReadyForICE/BeReadyForICE";
import AuctionNav from "../screens/AuctionScreen/AuctionNav";
import DonateScreen from "../screens/DonateScreen/DonateScreen";
import NewHome from "../screens/HomeScreen/NewHome";
import { colors } from "../theme";
import { BottomTabParamList } from "../types/types";

// Create a stack navigator for the Assistance section
const AssistanceStack = createStackNavigator();

/**
 * Bottom Tab Navigator
 * Provides navigation between the main screens of the app
 */
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
        name="Auction"
        component={AuctionNav}
        options={{
          headerShown: false,
          tabBarLabel: "Auction",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name={"gavel"} color={color} size={20} />
          ),
        }}
      />

      <Tab.Screen
        name="Donate"
        component={DonateScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Donate",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name={"donate"} color={color} size={20} />
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
    </Tab.Navigator>
  );
};

export default BottomTabStack;
