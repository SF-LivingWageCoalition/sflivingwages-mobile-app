import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../theme";

const LoadingOverlay: React.FC = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={colors.light.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingOverlay;
