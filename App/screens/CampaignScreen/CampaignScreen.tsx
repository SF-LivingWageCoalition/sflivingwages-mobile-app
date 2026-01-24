import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from "react-native";
import richCampaignsData from "../../assets/richCampaignsData";
import { colors, textStyles } from "../../theme";
import CampaignCard from "./components/CampaignCard";
import goldenGateBridge from "../../assets/images/golden-gate-bridge.png";

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

      {/* Campaign list */}
      <FlatList
        data={richCampaignsData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
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
