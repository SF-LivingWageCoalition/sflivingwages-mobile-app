import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import NewHome from "../screens/HomeScreen/NewHome";
import LivingWageCalculator from "../screens/LivingWageCalculator/LivingWageCalculator";
import ComplaintsAction from "../screens/ComplaintsAction";
import InformationRights from "../screens/InformationRights";
import ContributeStack from "./ContributeStack";
import { colors } from "../theme";
import { BottomTabParamList } from "../types/types";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabStack: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.light.primary },
        tabBarActiveTintColor: colors.light.textOnPrimary,
        tabBarInactiveTintColor: colors.light.textPrimary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={NewHome}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" color={color} size={20} />,
        }}
      />

      <Tab.Screen
        name="Contribute"
        component={ContributeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome5 name="hands-helping" color={color} size={20} />,
        }}
      />

      <Tab.Screen
        name="Calculator"
        component={LivingWageCalculator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome5 name="calculator" color={color} size={20} />,
        }}
      />

      <Tab.Screen
        name="Complaints"
        component={ComplaintsAction}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome5 name="exclamation-circle" color={color} size={20} />,
        }}
      />

      <Tab.Screen
        name="Rights"
        component={InformationRights}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome5 name="info-circle" color={color} size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabStack;
