import 'react-native-gesture-handler';
import React  from 'react';
import { Button, View, Text , Image, StyleSheet,TouchableWithoutFeedback,TouchableOpacity, Dimensions,SafeAreaView  } from 'react-native';
//import { createStackNavigator, createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BottomTabStack from './App/components/stacks/BottomTabStack'
import MyStack from './App/components/stacks/MyStack';
import DetailComponent from './App/components/screens/DonateScreen/DetailComponent';
import ModalScreen from './App/components/screens/DonateScreen/ModalScreen';
//import BottemTabNav from './app/components/stacks/BottemTabNav';
//import NavigationStack from './App/components/stacks/NavigationStack';
import HomeNavigator from './App/components/screens/HomeScreen/HomeStack';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { bannerStyle } from './App/components/style/styleSheet';
import DonateMoney from './App/components/screens/DonateScreen/DonateMoney';

import { NativeBaseProvider } from 'native-base';
import Events from './App/components/screens/HomeScreen/EventListScreen';

// // testing fonts
// import {
//   useFonts,
//   Roboto_100Thin,
//   Roboto_100Thin_Italic,
//   Roboto_300Light,
//   Roboto_300Light_Italic,
//   Roboto_400Regular,
//   Roboto_400Regular_Italic,
//   Roboto_500Medium,
//   Roboto_500Medium_Italic,
//   Roboto_700Bold,
//   Roboto_700Bold_Italic,
//   Roboto_900Black,
//   Roboto_900Black_Italic,
// } from '@expo-google-fonts/roboto';
// // testing fonts


//  import * as Font from 'expo-font';
//  import { AppLoading } from 'expo';

const Stack = createStackNavigator();

// const fetchFonts = () => {
//   return Font.loadAsync({
//   'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
//   'roboto-italic': require('./assets/fonts/Roboto-Italic.ttf'),
//   'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf')
//   });
//   };

export default class App extends React.Component {

  render() {
      return (
        <SafeAreaProvider>

          <NavigationContainer >
            <NativeBaseProvider>
            <Stack.Navigator 
              initialRouteName="Home"
              screenOptions={{
                headerStyle: { backgroundColor: '#d31623' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },}}
                // tabBar={props => <BottemTabNav {...props} />}
                >
              
              <Stack.Screen name="TabStack" component={BottomTabStack} 
                options={{ title: 'San Francisco Living Wage Coalition' }}
                
                //  options={{ headerTitle: props => <LogoTitle {...props} /> }}
              />
            
              <Stack.Screen name="Details" component={ DetailComponent} />
              <Stack.Screen name="Preview" component={ModalScreen} />
              <Stack.Screen name="donate" component={DonateMoney} />
              <Stack.Screen name="Event" component={Events} />            

            </Stack.Navigator>
            </NativeBaseProvider>
          
          </NavigationContainer>
          
          
          
          </SafeAreaProvider>   
      )
  }
}

function LogoTitle() {
  return (
    <View style={{ flexDirection: "row", width: 300, height:65}}>
    <Image
      //style={{ width: Dimensions.width, height: 50 }}
      style={
        bannerStyle.logoHeaderImageStyle
      }
      source={require('./assets/sflwc_logo_finaltemp.png')}
    />
 
 <MaterialCommunityIcons
                name="pencil-ruler"
                color={"white"}
                 size= {38}
              />
 
    </View>
  );
}
