import * as React from 'react';
import { Button,Image, View, Text , StyleSheet,TouchableOpacity, SafeAreaView  } from 'react-native';
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

const helpingHandIcon = <Icon name="hands-helping" size={30} color="#900" />;

const Tab = createBottomTabNavigator();
export default function BottomTabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#870c18',
        inactiveTintColor: '#ffffff',
        style: {
          backgroundColor: '#d31623',
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
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
                name="home"
                color={color}
                size={size}
              />
          ),
         
        }}  />
        <Tab.Screen
        name="CampaignNavigator"
        component={CampaignNavigator}
        options={{
          tabBarLabel: 'Campaigns',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
                name="pencil-ruler"
                color={color}
                size={size}
              />
            // <Icon name="campaign" color={color}
            // size={size}/>
          ),
        }} />
        <Tab.Screen
        name="Auction"
        component={AuctionNav}
        options={{
          tabBarLabel: 'Auction',
          tabBarIcon: ({ color, size }) => (    
              // <Image  id="img"
              // source={require('../../../assets/auction36x36.png')}
              // size={size}
              // tintColor={color}
              // styleSheet={coverStyle}
              // style={{ color: "black" }}
              // />
              <FontAwesome5 name={'donate'}  style={{  }} color={color}/>
          ),
        }}  />
        
      <Tab.Screen
        name="Assist"
        component={AssistanceScreen}
        options={{
          tabBarLabel: 'Assist',
          tabBarIcon: ({ color, size }) => (
              // <Icon2 name="" size={30} color="#900" />
              <FontAwesome5 name={'hands-helping'}  style={{  }} color={color}/>
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