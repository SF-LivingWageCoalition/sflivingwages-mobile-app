import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './newHome';
import EventNavigator from './EventNav';


const Stack = createStackNavigator();

function HomeStack() {

  const baseHeaderOptions = { 
    // headerTitle: props => <LogoHeader {...props} />,
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' }
  }
  return (
    <Stack.Navigator 
      screenOptions={{headerShown : false}}
      //screenOptions={baseHeaderOptions}
    >  
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Event" component={EventNavigator} />
    </Stack.Navigator>
  );
}


export default function HomeNavigator() {
  return <HomeStack />
}
