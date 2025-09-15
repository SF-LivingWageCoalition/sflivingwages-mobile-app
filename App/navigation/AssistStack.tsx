import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReportViolation from "../screens/ReportViolation/ReportViolation";
import WageRights from "../screens/WageRights/WageRights";
import BeReadyForICE from "../screens/BeReadyForICE/BeReadyForICE";
import LivingWageCalculator from "../screens/LivingWageCalculator/LivingWageCalculator";
import ReportBusiness from "../screens/ReportBusiness/ReportBusiness";
import ReportBusinessMap from "../screens/ReportBusinessMap/ReportBusinessMap";
import { AssistanceTabParamList } from "../types";
import ListReportScreen from "../screens/ListReportScreen/ListReportScreen";
import ReportDetailScreen from "../screens/ReportDetailScreen/ReportDetailScreen";

// Create a stack navigator for the Assistance section
const AssistanceStack = createStackNavigator<AssistanceTabParamList>();

const AssistStack = () => {
  return (
    <AssistanceStack.Navigator>
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
      <AssistanceStack.Screen
        name="ReportBusiness"
        component={ReportBusiness}
        options={{
          headerShown: false,
        }}
      />
      <AssistanceStack.Screen
        name="ReportBusinessMap"
        component={ReportBusinessMap}
        options={{
          headerShown: false,
        }}
      />
      <AssistanceStack.Screen
        name="ListReportScreen"
        component={ListReportScreen}
        options={{
          headerShown: false,
        }}
      />
      <AssistanceStack.Screen
        name="ReportDetailScreen"
        component={ReportDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </AssistanceStack.Navigator>
  );
};

export default AssistStack;

const styles = StyleSheet.create({});
