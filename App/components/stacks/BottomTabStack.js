import * as React from 'react';
import { Button, Image, View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import {
  createMaterialTopTabNavigator
} from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
/*import
  MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';*/
import AssistanceScreen from '../screens/AssistanceScreen/AssistanceScreen';
// import HomeNav from '../screens/HomeScreen/HomeNav';
import DonateSales from '../screens/DonateScreen/DonateSales';
import AuctionNav from '../screens/DonateScreen/AuctionNav';
import CampaignNavigator from '../screens/CampaignScreen/campaignNavi';

//const Tab = createMaterialTopTabNavigator();

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyStack from './MyStack';
import HomeNavigator from '../screens/HomeScreen/HomeStack';

import CampaignDetail from "../screens/CampaignScreen/CampaignDetail";
import CampaignFiveDetail from '../screens/CampaignScreen/CampaignFiveDetail';
import DonateMoney from '../screens/DonateScreen/DonateMoney';

const helpingHandIcon = <Icon name="hands-helping" size={30} color="#900" />;

const Tab = createBottomTabNavigator();
export default function BottomTabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
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

const coverStyle = `
  #container {
  	flex: 2;
  }
  #img {
    flex: 1;
    height: 36px;
    width: 36px;
    qproperty-alignment: 'AlignCenter';
    fill: #000000;
    

  }
`