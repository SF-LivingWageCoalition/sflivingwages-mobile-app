import React from "react";
import { Dimensions, FlatList, StyleSheet, View, Text } from "react-native";
import richCampaignsData from "../../assets/richCampaignsData";
import { colors, textStyles } from "../../theme";
import CampaignCard from "./components/CampaignCard";

const { height } = Dimensions.get("window");

/**
 * Displays a list of campaigns
 */
const CampaignScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OUR CAMPAIGNS</Text>
      <FlatList
        data={richCampaignsData}
        renderItem={({ item }) => (
          <CampaignCard title={item.title} text={item.text} id={item.id} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...textStyles.h3,
    color: colors.light.onSurface,
    textAlign: "center",
    padding: 16,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  loadMoreSpinner: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyListFooter: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
  noMoreEventsText: {
    textAlign: "center",
    color: colors.light.textSecondary,
    fontStyle: "italic",
  },
});

export default CampaignScreen;
