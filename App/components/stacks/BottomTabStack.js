import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AssistanceScreen from '../screens/AssistanceScreen/AssistanceScreen';
import AuctionNav from '../screens/DonateScreen/AuctionNav';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DonateMoney from '../screens/DonateScreen/DonateMoney';
import newHome from '../../components/screens/HomeScreen/newHome'


const Tab = createBottomTabNavigator();
export default function BottomTabStack() {
  return (
    <Tab.Navigator
    
      screenOptions={{
     
        tabBarStyle :{
          backgroundColor : "#CD1621",
        },

        tabBarActiveTintColor : '#fff',
        tabBarInactiveTintColor : '#000'
      }}
    
      >
        
      <Tab.Screen
        name="Home"
        component={newHome}
        options={{
          headerShown: false,
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
