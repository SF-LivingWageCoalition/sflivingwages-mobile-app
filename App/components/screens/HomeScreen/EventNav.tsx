import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventListScreen from "./EventListScreen";
import { EventStackParamList } from "../../../../App/types";

const Stack = createStackNavigator<EventStackParamList>();

const MyStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Events" component={EventListScreen} />
    </Stack.Navigator>
  );
};

const EventNavigator: React.FC = () => {
  return <MyStack />;
};

export default EventNavigator;
