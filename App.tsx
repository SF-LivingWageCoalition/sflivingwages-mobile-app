import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@dooboo-ui/theme";
import ModalScreen from "./App/screens/DonateScreen/ModalScreen";
import { colors } from "./App/theme";
import { fontWeight } from "./App/theme/fontStyles";
import Events from "./App/screens/HomeScreen/components/EventListScreen";
import BottomTabStack from "./App/navigation/BottomTabStack";
import { RootStackParamList } from "./App/types";
import WhoWeAre from "./App/screens/WhoWeAreScreen/WhoWeAreScreen";

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <NativeBaseProvider>
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: colors.light.primary },
                headerTintColor: colors.light.textOnPrimary,
                headerTitleStyle: { fontWeight: fontWeight.bold },
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
              <Stack.Screen
                name="WhoWeAre"
                options={{ title: "Who We Are" }}
                component={WhoWeAre}
              />
            </Stack.Navigator>
          </NativeBaseProvider>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
