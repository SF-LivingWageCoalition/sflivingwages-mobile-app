import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './newHome';
import EventNavigator from './EventNav';
import Campaign from '../CampaignScreen/campaignNavi';
import PressCoverage from './PressCoverage';
import WageGap from './WageGap';
import PressRelease from './PressRelease';

const Stack = createStackNavigator();

function HomeStack() {

  const baseHeaderOptions = { 
    // headerTitle: props => <LogoHeader {...props} />,
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' }
  }
  return (
    <Stack.Navigator initialRouteName="Home"  headerMode="none"
      //screenOptions={baseHeaderOptions}
    >  
      <Stack.Screen name="Home" component={Home} />
      
      <Stack.Screen name="Event" component={EventNavigator} />
      <Stack.Screen name="CampaignScreen" component={Campaign} />
      <Stack.Screen name="PressCoverage" component={PressCoverage} />
      <Stack.Screen name="WageGap" component={WageGap} />
      <Stack.Screen name="PressRelease" component={PressRelease} />

    </Stack.Navigator>
  );
}


export default function HomeNavigator() {
  return <HomeStack />
}










// import React from 'react';                              
// import {
// 	createMaterialTopTabNavigator
// } from '@react-navigation/material-top-tabs';
// import HomeScreen from './HomeScreen';
// // import EventsScreen from './EventsScreen';
// import MediaScreen from "./MediaScreen";
// import NewsScreen from "./NewsScreen";
// import EventNav from "./EventNav";
// import IntroductonScreen from "./IntroductionScreen";
// // import EventListScreen from './EventListScreen';

// const Tab = createMaterialTopTabNavigator();

// export default class HomeNav extends React.Component{

//     render() {
//         return (
//             <Tab.Navigator 
//                     initialRouteName="Tweets"
//                     screenOptions={{
//                     headerStyle: { backgroundColor: '#d31623' },
//                     headerTintColor: '#fff',
//                     headerTitleStyle: { fontWeight: 'bold' },}}
//                     // tabBar={props => <BottemTabNav {...props} />}
//                 >    
//                    <Tab.Screen name="Tweets" component={HomeScreen} />	 
//                     <Tab.Screen name="News" component={NewsScreen} />	     
//                     <Tab.Screen name="Events" component={EventNav} />
//                     <Tab.Screen name="Media" component={ MediaScreen } /> 
//                     <Tab.Screen name="Info" component={IntroductonScreen} />    
//                 </Tab.Navigator>
            
//         )
//     }
// }

