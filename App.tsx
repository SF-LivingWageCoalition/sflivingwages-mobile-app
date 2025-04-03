import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";

import BottomTabStack from "./App/components/stacks/BottomTabStack";
import ModalScreen from "./App/components/screens/DonateScreen/ModalScreen";
import Events from "./App/components/screens/HomeScreen/EventListScreen";
import { RootStackParamList } from "./App/types";

const Stack = createStackNavigator<RootStackParamList>();

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <NativeBaseProvider>
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: "#CD1621" },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold" },
              }}
            >
              <Stack.Screen
                name="TabStack"
                component={BottomTabStack}
                options={{ title: "San Francisco Living Wage Coalition" }}
              />
              <Stack.Screen name="Preview" component={ModalScreen} />
              <Stack.Screen name="Event" component={Events} />
            </Stack.Navigator>
          </NativeBaseProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
