import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import BottomTabStack from "./App/navigation/BottomTabStack";
import { persistor, store } from "./App/redux/store/store";
import ModalScreen from "./App/screens/AuctionScreen/ModalScreen";
import EventsNavigator from "./App/screens/EventsScreen/components/EventsNav";
import WhoWeAre from "./App/screens/WhoWeAreScreen/WhoWeAreScreen";
import { colors } from "./App/theme";
import { fontWeight } from "./App/theme/fontStyles";
import { translate } from "./App/translation/i18n";
import { RootStackParamList } from "./App/types";

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: colors.light.primary },
                headerTintColor: colors.light.textOnPrimary,
                headerTitleStyle: { fontWeight: fontWeight.bold },
                headerTitleAlign: "center",
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
              <Stack.Screen
                name="EventsNavigator"
                options={{
                  title: translate("eventsScreen.title"),
                  headerShown: false,
                }}
                component={EventsNavigator}
              />
              <Stack.Screen
                name="WhoWeAre"
                options={{ title: translate("whoWeAreScreen.title") }}
                component={WhoWeAre}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
