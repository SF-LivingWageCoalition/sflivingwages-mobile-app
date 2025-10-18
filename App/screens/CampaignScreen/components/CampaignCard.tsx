import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import React from "react";
import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../theme";
import { textStyles } from "../../../theme/fontStyles";
import { CampaignItem } from "../../../types/types";

//create a campaign card that uses campaign item as its properties
const CampaignCard: React.FC<CampaignItem> = ({
  title,
  destination,
}) => {
  const navigate = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text
          style={styles.homeNavText}
          onPress={() => Linking.openURL(destination)}
        >
          {/* display item title */}
          {title} 
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeNavText: {
    ...textStyles.h3,
    color: colors.light.primaryDark,
    textAlign: "left",
    padding: 10,
  },
});

export default CampaignCard;
