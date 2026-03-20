import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { colors, textStyles } from "../../theme";
import CampaignCard from "./components/CampaignCard";
import goldenGateBridge from "../../assets/images/golden-gate-bridge.png";
import { CAMPAIGN_IDS } from "./data/campaignStructure";

/**
 * Displays a list of campaigns
 */
const CampaignScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Hero section with background image */}
      <ImageBackground
        source={goldenGateBridge}
        style={styles.heroImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Our Campaigns</Text>
            <Text style={styles.heroSubtitle}>Stand up for your rights</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Campaign list:
       * CAMPAIGN_IDS is [1, 2, 3, 4, 5, 6] — the set of campaign ids that have content in both campaignStructure.ts and the i18n campaigns namespace.
       * FlatList gets data={CAMPAIGN_IDS}, so each item is a number (an id).
       * keyExtractor uses that id: (id) => id.toString().
       * renderItem receives { item } where item is the id and passes it to the card: <CampaignCard id={item} />.
       */}
      <FlatList
        data={CAMPAIGN_IDS}
        keyExtractor={(id) => id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <CampaignCard id={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroImage: {
    width: "100%",
    height: 250,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  heroContent: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 6,
    alignItems: "center",
  },
  heroTitle: {
    ...textStyles.h1,
    color: colors.light.surface,
    textTransform: "uppercase",
    textAlign: "center",
  },
  heroSubtitle: {
    ...textStyles.h5,
    color: colors.light.surface,
    marginBottom: 8,
    textAlign: "center",
  },
  listContent: {
    marginTop: 6,
    paddingBottom: 10,
    paddingTop: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
});

export default CampaignScreen;
