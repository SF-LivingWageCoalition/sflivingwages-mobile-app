import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Pages/Screens
// import HomeScreen from '../screens/HomeScreen/HomeScreen';
// import EventsScreen from '../screens/HomeScreen/EventsScreen';
// import MediaScreen from "../screens/HomeScreen/MediaScreen";
// import NewsScreen from "../screens/HomeScreen/NewsScreen";
// import PlusScreen from "../screens/HomeScreen/PlusScreen";
// import JoinTheFightScreen from '../screens/JoinTheFightScreen/JoinTheFightScreen';
// import AboutScreen from '../screens/AboutScreen/AboutScreen';
// import InfoScreen from '../screens/InfoScreen/InfoScreen';
// import DonateScreen from '../screens/DonateScreen/DonateScreen';
// import DonateMoney from '../screens/DonateScreen/DonateMoney';
// import DonateInKind from '../screens/DonateScreen/DonateInKind';
// import DonateSales from '../screens/DonateScreen/DonateSales';
// import AssistanceScreen from '../screens/AssistanceScreen/AssistanceScreen';

// Styled Components
// import LogoHeader from './LogoHeader';


// StyleSheets
// import { styles, bannerStyle } from '../style/styleSheet';

// import PaypalDonate from "../screens/DonateScreen/PaypalDonate";

//Campaign views
import CampaignScreen from './CampaignScreen';
import CampaignDetail from './CampaignDetail';
import CampaignFullDetail from './CampaignFullDetail';
import CampaignTwoDetail from './CampaignTwoDetail';


import CampaignThreeDetail from './CampaignThreeDetail';

import CampaignFourDetail from './CampaignFourDetail';

import CampaignFiveDetail from './CampaignFiveDetail';
import CampaignSixDetail from './CampaignSixDetail';
// import NewHomeNavigator from '../screens/HomeScreen/HomeNavi';
// import EventNavigator from '../screens/HomeScreen/EventNav';

const Stack = createStackNavigator();

function MyStack() {

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>  
      <Stack.Screen name="CampaignScreen"
                    component={CampaignScreen}
                    options={{
                    headerShown: true,
                    title: "Campaigns"
                }}  />
      <Stack.Screen name="CampaignFullDetail"  component={CampaignFullDetail} />
      <Stack.Screen name="CampaignDetail" component={CampaignDetail} />
      <Stack.Screen name="CampaignTwoDetail" component={CampaignTwoDetail } />
      <Stack.Screen name="CampaignThreeDetail" component={CampaignThreeDetail } />

      <Stack.Screen name="CampaignFourDetail" component={CampaignFourDetail  } />
      <Stack.Screen name="CampaignFiveDetail" component={CampaignFiveDetail} />
      <Stack.Screen name="CampaignSixDetail" component={CampaignSixDetail} />
     
    </Stack.Navigator>
  );
}

export default function CampaignNavigator() {
    return <MyStack />
}