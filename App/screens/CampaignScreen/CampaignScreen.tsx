import React from "react";
import {
  Dimensions,
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

const { height } = Dimensions.get("window");

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
        {/* Text overlay */}
        <View style={styles.overlay}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>OUR CAMPAIGNS</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Campaign list */}
      <FlatList
        data={richCampaignsData}
        renderItem={({ item }) => (
          <CampaignCard title={item.title} text={item.text} id={item.id} />
        )}
        contentContainerStyle={styles.listContent}
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
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  heroContent: {
    flex: 1,
    justifyContent: "flex-end",
    margin: "auto",
    paddingBottom: 12,
  },
  heroTitle: {
    ...textStyles.h1,
    color: colors.light.surface,
    textTransform: "uppercase",
  },
  listContent: {
    paddingTop: 16,
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
