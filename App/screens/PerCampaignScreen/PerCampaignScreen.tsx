import React from "react";
import { useRoute } from "@react-navigation/native";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Markdown from "react-native-markdown-display";
import { colors } from "../../theme";
import richCampaignsData from "../../assets/richCampaignsData";

const PerCampaignScreen: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };

  const campaign = richCampaignsData.find((c) => c.id === id);

  if (!campaign) {
    return (
      <View style={styles.container}>
        <Text>Campaign not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{campaign.title}</Text>
      <Markdown>{campaign.text}</Markdown>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.light.background },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.light.primaryDark,
  },
});

export default PerCampaignScreen;
