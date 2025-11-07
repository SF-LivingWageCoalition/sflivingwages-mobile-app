import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../theme";
import { textStyles } from "../../../theme/fontStyles";
import { CampaignActionProps } from "../../../types/types";

const CampaignAction: React.FC<CampaignActionProps> = ({ stepText, url }) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        {stepText && <Text style={styles.headerText}>Action Steps:</Text>}
      </View>

      <View style={styles.stepContainer}>
        {stepText && <Text style={styles.stepNumber}>1 </Text>}
        {stepText && <Text style={textStyles.body}>{stepText}</Text>}
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
    ...textStyles.h3,
    width: 260,
    height: 30,
    color: colors.light.textPrimary,
    paddingLeft: 20,
    textAlign: "center",
  },
  stepContainer: {
    flexDirection: "row",
    paddingLeft: 20,
  },
  stepNumber: {
    ...textStyles.body,
    color: colors.light.primaryDark,
  },
  linkContainer: {
    paddingLeft: 20,
  },
  linkText: {
    ...textStyles.body,
    color: colors.light.primary,
  },
});

export default CampaignAction;
