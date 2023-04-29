import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import EventNavigator from '../screens/HomeScreen/EventNav';

const Stack = createStackNavigator();

export default function MyStack() {

  const baseHeaderOptions = {
    // headerTitle: props => <LogoHeader {...props} />,
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' }
  }
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none"
      screenOptions={baseHeaderOptions}
    >

      <Stack.Screen name="Event" component={EventNavigator} />
      <Stack.Screen name="CampaignScreen" component={Campaign} />

    </Stack.Navigator>
  );
}

