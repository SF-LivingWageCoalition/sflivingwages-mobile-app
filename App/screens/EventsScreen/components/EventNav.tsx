import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { EventStackParamList } from "../../../types";
import Events from "../EventsScreen";

const Stack = createStackNavigator<EventStackParamList>();

const MyStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Events" component={Events} />
    </Stack.Navigator>
  );
};

const EventNavigator: React.FC = () => {
  return <MyStack />;
};

export default EventNavigator;
