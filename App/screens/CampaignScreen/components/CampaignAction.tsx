import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../theme";
import { fontSize, fontWeight } from "../../../theme/fontStyles";
import { CampaignActionProps } from "../../../types";

const CampaignAction: React.FC<CampaignActionProps> = ({ stepText, url }) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        {stepText && <Text style={styles.headerText}>Action Steps:</Text>}
      </View>

      <View style={styles.stepContainer}>
        {stepText && <Text style={styles.stepNumber}>1 </Text>}
        {stepText && <Text>{stepText}</Text>}
      </View>

      <View style={styles.linkContainer}>
        {url && (
          <Text
            style={styles.linkText}
            onPress={() => {
              Linking.openURL(url);
            }}
          >
            Click here
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  headerText: {
    fontFamily: "sans-serif",
    fontSize: fontSize.lg,
    width: 260,
    height: 30,
    color: colors.light.textPrimary,
    paddingLeft: 20,
    fontWeight: fontWeight.bold,
    textAlign: "center",
  },
  stepContainer: {
    flexDirection: "row",
    paddingLeft: 20,
  },
  stepNumber: {
    color: colors.light.primaryDark,
  },
  linkContainer: {
    paddingLeft: 20,
  },
  linkText: {
    color: colors.light.primary,
  },
});

export default CampaignAction;
