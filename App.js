// import 'react-native-gesture-handler';
import React from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BottomTabStack from './App/components/stacks/BottomTabStack'
import ModalScreen from './App/components/screens/DonateScreen/ModalScreen';

import { bannerStyle } from './App/components/style/styleSheet';

import { NativeBaseProvider } from 'native-base';
import Events from './App/components/screens/HomeScreen/EventListScreen';


const Stack = createStackNavigator();


export default class App extends React.Component {

  render() {
    return (
      <SafeAreaProvider>

        <NavigationContainer >
          <NativeBaseProvider>
            <Stack.Navigator
              // initialRouteName="Home"
              screenOptions={{
                headerStyle: { backgroundColor: "#CD1621" },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            >

              <Stack.Screen name="TabStack" component={BottomTabStack}
                options={{ title: 'San Francisco Living Wage Coalition' }}

              //  options={{ headerTitle: props => <LogoTitle {...props} /> }}
              />
              <Stack.Screen name="Preview" component={ModalScreen} />
              <Stack.Screen name="Event" component={Events} />

            </Stack.Navigator>
          </NativeBaseProvider>
        </NavigationContainer>

      </SafeAreaProvider>
    )
  }
}