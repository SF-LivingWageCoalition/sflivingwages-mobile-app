import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


// // Styled Components
// import LogoHeader from './LogoHeader';


// // StyleSheets
// import { styles, bannerStyle } from '../style/styleSheet';

// import PaypalDonate from "../screens/DonateScreen/PaypalDonate";

//Campaign views
// import CampaignScreen from '../screens/CampaignScreen/CampaignScreen';
// import CampaignDetail from '../screens/CampaignScreen/CampaignDetail';
// import CampaignFullDetail from '../screens/CampaignScreen/CampaignFullDetail';
// import CampaignTwoDetail from '../screens/CampaignScreen/CampaignTwoDetail';


// import CampaignThreeDetail from '../screens/CampaignScreen/CampaignThreeDetail';

// import CampaignFourDetail from '../screens/CampaignScreen/CampaignFourDetail';

// import CampaignFiveDetail from '../screens/CampaignScreen/CampaignFiveDetail';
// import CampaignSixDetail from '../screens/CampaignScreen/CampaignSixDetail';
// import NewHomeNavigator from '../screens/HomeScreen/HomeNavi';
import Home from '../screens/HomeScreen/newHome';
import EventNavigator from '../screens/HomeScreen/EventNav';
import Campaign from '../screens/CampaignScreen/campaignNavi';
import PressCoverage from '../screens/HomeScreen/PressCoverage';
import WageGap from '../screens/HomeScreen/WageGap';
import PressRelease from '../screens/HomeScreen/PressRelease';

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
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="Event" component={EventNavigator} />
      <Stack.Screen name="CampaignScreen" component={Campaign} />
      <Stack.Screen name="PressCoverage" component={PressCoverage} />
      <Stack.Screen name="WageGap" component={WageGap} />
      <Stack.Screen name="PressRelease" component={PressRelease} />


      {/* <Stack.Screen name="CampaignScreen" component={CampaignScreen} />
      <Stack.Screen name="CampaignFullDetail" component={CampaignFullDetail} />
      <Stack.Screen name="CampaignDetail" component={CampaignDetail} />
      <Stack.Screen name="CampaignTwoDetail" component={CampaignTwoDetail } />
      <Stack.Screen name="CampaignThreeDetail" component={CampaignThreeDetail } />

      <Stack.Screen name="CampaignFourDetail" component={CampaignFourDetail  } />
      <Stack.Screen name="CampaignFiveDetail" component={CampaignFiveDetail} />
      <Stack.Screen name="CampaignSixDetail" component={CampaignSixDetail} /> */}

    </Stack.Navigator>
  );
}

