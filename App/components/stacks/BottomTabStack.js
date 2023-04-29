import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AssistanceScreen from '../screens/AssistanceScreen/AssistanceScreen';
import AuctionNav from '../screens/DonateScreen/AuctionNav';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeNavigator from '../screens/HomeScreen/HomeStack';
import DonateMoney from '../screens/DonateScreen/DonateMoney';


const Tab = createBottomTabNavigator();
export default function BottomTabStack() {
  return (
    <Tab.Navigator
      // initialRouteName="Home"r
      screenOptions={{
        activeTintColor: '#870c18',
        // inactiveTintColor: '#ffffff',
        inactiveTintColor: '#CD1621',

        style: {
          backgroundColor: '#d31623a',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },

      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name={'home'} color={color} size={20} />
          ),
        }} />

      <Tab.Screen
        name="Auction"
        component={AuctionNav}
        options={{
          headerShown: false,
          tabBarLabel: 'Auction',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name={'hammer'} color={color} size={20} />
          ),
        }}
      />

      <Tab.Screen
        name="Donate"
        component={DonateMoney}
        options={{
          headerShown: false,
          tabBarLabel: 'Donate',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name={'donate'} color={color} size={20} />
          ),
        }}
      />

      <Tab.Screen
        name="Assist"
        component={AssistanceScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Assist',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name={'hands-helping'} color={color} size={20} />
            // <FontAwesome5 name={'calendar'} color={color} size={20} />
          ),
        }} />
    </Tab.Navigator>
  );
}
