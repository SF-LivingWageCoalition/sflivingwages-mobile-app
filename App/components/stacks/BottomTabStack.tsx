import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { BottomTabParamList } from "../../../App/types";
import AssistanceScreen from "../screens/AssistanceScreen/AssistanceScreen";
import AuctionNav from "../screens/DonateScreen/AuctionNav";
import DonateMoney from "../screens/DonateScreen/DonateMoney";
import NewHome from "../screens/HomeScreen/NewHome";
import { Text } from "react-native";

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
        component={AssistanceScreen}
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
