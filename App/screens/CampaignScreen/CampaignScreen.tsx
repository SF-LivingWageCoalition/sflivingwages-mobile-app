import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../../theme";
import campaignData from "../../assets/campaignsData";
import CampaignCard from "./components/CampaignCard";

const { height } = Dimensions.get("window");

/**
 * Campaign Screen component
 // Displays a list of campaigns
 */
const CampaignScreen: React.FC = () => {

  return (
    <View style={styles.container}>
              <FlatList
                data={campaignData}
                renderItem={({item}) => <CampaignCard 
                  src={item.src}
                  title={item.title}
                  destination={item.destination} id={item.id}                />
              }
              />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
