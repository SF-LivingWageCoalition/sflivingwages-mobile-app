// import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BottomTabStack from './App/components/stacks/BottomTabStack'
import ModalScreen from './App/components/screens/DonateScreen/ModalScreen';


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
              screenOptions={{
                headerStyle: { backgroundColor: "#CD1621" },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            >
             
              <Stack.Screen name="TabStack" component={BottomTabStack}
                options={{ title: 'San Francisco Living Wage Coalition' }}
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