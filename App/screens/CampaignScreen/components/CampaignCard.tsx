import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../../theme";
import { textStyles } from "../../../theme/fontStyles";
import { CampaignItem } from "../../../types/types";

const CampaignCard: React.FC<CampaignItem> = ({ id, title }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.tile}
          onPress={() => {
            navigation.navigate("PerCampaignScreen", { id });
          }}
          accessibilityRole="button"
          accessibilityLabel={title}
          activeOpacity={0.85}
        >
          <Text style={styles.homeNavText}>{title}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    marginBottom: 32,
    paddingHorizontal: 12,
  },
  homeNavText: {
    ...textStyles.h5,
    color: colors.light.secondaryDark,
    textAlign: "left",
    padding: 10,
  },
  tile: {
    backgroundColor: colors.light.surface,
    borderRadius: 12,
    padding: 14,
    minHeight: 140,
    aspectRatio: 1.08,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.light.surfaceVariant,
    shadowColor: colors.light.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default CampaignCard;
