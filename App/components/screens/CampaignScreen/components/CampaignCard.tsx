import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CampaignCardProps } from "../../../../../App/types";

const CampaignCard: React.FC<CampaignCardProps> = (props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  // Use props.navigate if provided, otherwise use the navigation hook
  const navigateToScreen = (screen: string, params?: any) => {
    if (props.navigate) {
      props.navigate(screen, params);
    } else if (navigation) {
      navigation.navigate(screen, params);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.homeNav}>
        <Text
          style={styles.homeNavText}
          onPress={() => navigateToScreen("CampaignDetailpage")}
        >
          Raise Wage
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  campaignNav: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#870c18",
    height: 40,
    alignItems: "center",
  },
  campaignText: {
    flex: 1,
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  homeNav: {
    flex: 1,
  },
  homeNavText: {
    fontSize: 18,
    color: "#c91a1a",
    textAlign: "center",
    padding: 10,
  },
});

export default CampaignCard;
