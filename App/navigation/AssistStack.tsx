import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReportViolation from "../screens/ReportViolation/ReportViolation";
import WageRights from "../screens/WageRights/WageRights";
import BeReadyForICE from "../screens/BeReadyForICE/BeReadyForICE";
import LivingWageCalculator from "../screens/LivingWageCalculator/LivingWageCalculator";
import ReportBusiness from "../screens/ReportBusiness/ReportBusiness";
import ReportBusinessMap from "../screens/ReportBusinessMap/ReportBusinessMap";
import { AssistanceTabParamList } from "../types/types";
import ListReportScreen from "../screens/ListReportScreen/ListReportScreen";
import ReportDetailScreen from "../screens/ReportDetailScreen/ReportDetailScreen";
import { colors, fontFamily } from "../theme";
import { translate } from "../translation/i18n";

// Create a stack navigator for the Assistance section
const AssistanceStack = createStackNavigator<AssistanceTabParamList>();

const AssistStack = () => {
  return (
    <AssistanceStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.light.primary },
        headerTintColor: colors.light.textOnPrimary,
        headerTitleStyle: {
          fontFamily: fontFamily.bodyBold,
        },
        headerTitleAlign: "center",
      }}
    >
      <AssistanceStack.Screen
        name="ReportViolation"
        component={ReportViolation}
        options={{ title: translate("assistHomeScreen.getAssistance") }}
      />
      <AssistanceStack.Screen
        name="WageRights"
        component={WageRights}
        options={{ title: translate("assistHomeScreen.wageRights") }}
      />
      <AssistanceStack.Screen
        name="BeReadyForICE"
        component={BeReadyForICE}
        options={{ title: translate("assistHomeScreen.beReadyForICE") }}
      />
      <AssistanceStack.Screen
        name="LivingWageCalculator"
        component={LivingWageCalculator}
        options={{ title: "Living Wage Calculator" }}
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
