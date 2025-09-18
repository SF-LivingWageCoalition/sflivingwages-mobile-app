import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AssistanceHome from "../screens/AssistanceHome/AssistanceHome";
import BeReadyForICE from "../screens/BeReadyForICE/BeReadyForICE";
import AuctionNav from "../screens/DonateScreen/AuctionNav";
import DonateScreen from "../screens/DonateScreen/DonateScreen";
import NewHome from "../screens/HomeScreen/NewHome";
import LivingWageCalculator from "../screens/LivingWageCalculator/LivingWageCalculator";
import ReportViolation from "../screens/ReportViolation/ReportViolation";
import WageRights from "../screens/WageRights/WageRights";
import { colors } from "../theme";
import { BottomTabParamList } from "../types";

// Create a stack navigator for the Assistance section
const AssistanceStack = createStackNavigator();

const AssistanceStackScreen = () => {
  return (
    <AssistanceStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AssistanceStack.Screen
        name="AssistanceHome"
        component={AssistanceHome}
      />
      <AssistanceStack.Screen
        name="ReportViolation"
        component={ReportViolation}
      />
      <AssistanceStack.Screen name="WageRights" component={WageRights} />
      <AssistanceStack.Screen name="BeReadyForICE" component={BeReadyForICE} />
      <AssistanceStack.Screen
        name="LivingWageCalculator"
        component={LivingWageCalculator}
      />
    </AssistanceStack.Navigator>
  );
};

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
            <FontAwesome5 name={"hammer"} color={color} size={20} />
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
        component={AssistanceStackScreen}
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
