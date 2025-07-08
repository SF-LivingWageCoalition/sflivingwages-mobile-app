import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ModalScreen from "./App/components/screens/DonateScreen/ModalScreen";
import Events from "./App/components/screens/HomeScreen/EventListScreen";
import BottomTabStack from "./App/components/stacks/BottomTabStack";
import { RootStackParamList } from "./App/types";
import WhoWeAre from "./App/components/screens/HomeScreen/WhoWeAreScreen";

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
              <Stack.Screen
                name="Preview"
                component={ModalScreen}
                initialParams={{ image: "" }}
              />
              <Stack.Screen name="Event" component={Events} />
              <Stack.Screen name="WhoWeAre" options={{ title: "Who We Are" }} component={WhoWeAre} />
            </Stack.Navigator>
          </NativeBaseProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
