import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { colors } from "../../../theme";
import { fontFamily } from "../../../theme/fontStyles";
import { translate } from "../../../translation/i18n";
import { EventStackParamList } from "../../../types/types";
import EventDetails from "../EventDetails";
import Events from "../EventsScreen";

const Stack = createStackNavigator<EventStackParamList>();

const MyStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.light.primary },
        headerTintColor: colors.light.textOnPrimary,
        headerTitleStyle: { fontFamily: fontFamily.heading },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Events"
        options={{ title: translate("eventsScreen.title") }}
        component={Events}
      />
      <Stack.Screen
        name="EventDetails"
        options={{ title: translate("eventsDetails.title") }}
        component={EventDetails}
      />
    </Stack.Navigator>
  );
};

const EventsNavigator: React.FC = () => {
  return <MyStack />;
};

export default EventsNavigator;
