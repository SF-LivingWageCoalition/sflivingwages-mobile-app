import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
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
import { fontFamily } from "./App/theme/fontStyles";
import { translate } from "./App/translation/i18n";
import { RootStackParamList } from "./App/types/types";
import AssistStack from "./App/navigation/AssistStack";

const Stack = createStackNavigator<RootStackParamList>();

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded || fontError) {
        // Hide splash screen once fonts are loaded
        await SplashScreen.hideAsync();

        if (fontError) {
          console.error("Font loading error:", fontError);
        }
      }
    }
    prepare();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: colors.light.primary },
                headerTintColor: colors.light.textOnPrimary,
                headerTitleStyle: {
                  fontFamily: fontFamily.bodyBold,
                },
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
