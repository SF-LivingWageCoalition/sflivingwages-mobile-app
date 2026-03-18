import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import AuctionNav from "../screens/AuctionScreen/AuctionNav";
import DonateScreen from "../screens/DonateScreen/DonateScreen";
import { colors } from "../theme";
import { fontFamily } from "../theme/fontStyles";

type ContributeStackParamList = {
  ContributeHome: undefined;
  AuctionFlow: undefined;
  Donate: undefined;
};

const Stack = createStackNavigator<ContributeStackParamList>();

const ContributeHome: React.FC<any> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("AuctionFlow")}
      >
        <Text style={styles.label}>Auction</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Donate")}
      >
        <Text style={styles.label}>Donate</Text>
      </TouchableOpacity>
    </View>
  );
};

const ContributeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.light.primary },
        headerTintColor: colors.light.textOnPrimary,
        headerTitleStyle: { fontFamily: fontFamily.bodyBold },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="ContributeHome"
        component={ContributeHome}
        options={{ title: "Contribute" }}
      />
      <Stack.Screen
        name="AuctionFlow"
        component={AuctionNav}
        options={{ title: "Auction" }}
      />
      <Stack.Screen
        name="Donate"
        component={DonateScreen}
        options={{ title: "Donate" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.light.background },
  item: {
    backgroundColor: colors.light.surface,
    borderColor: colors.light.surfaceVariant,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  label: {
    color: colors.light.textPrimary,
    fontFamily: fontFamily.bodyBold,
    fontSize: 16,
  },
});

export default ContributeStack;
