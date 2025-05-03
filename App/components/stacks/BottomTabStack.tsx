import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { BottomTabParamList } from "../../../App/types";
import ReportViolation from "../screens/ReportViolation/ReportViolation";
import AssistanceHome from "../screens/AssistanceHome/AssistanceHome";
import AuctionNav from "../screens/DonateScreen/AuctionNav";
import DonateMoney from "../screens/DonateScreen/DonateMoney";
import NewHome from "../screens/HomeScreen/NewHome";
import WageRights from "../screens/WageRights/WageRights";
import { createStackNavigator } from "@react-navigation/stack";

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
          backgroundColor: "#CD1621",
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#000",
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
        component={DonateMoney}
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
