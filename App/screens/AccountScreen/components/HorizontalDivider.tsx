import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../../theme";

const HorizontalDivider: React.FC = () => {
  return <View style={styles.horizontalDivider} />;
};

const styles = StyleSheet.create({
  horizontalDivider: {
    borderBottomColor: colors.light.onSurfaceVariant,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
});

export default HorizontalDivider;
