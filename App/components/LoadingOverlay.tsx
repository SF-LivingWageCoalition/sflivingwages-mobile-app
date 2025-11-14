import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
  BackHandler,
} from "react-native";
import { colors } from "../theme";

const LoadingOverlay: React.FC = () => {
  // Prevent hardware back button on Android while the overlay is mounted
  useEffect(() => {
    const onBackPress = () => true; // returning true prevents default back behavior
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => subscription.remove();
  }, []);

  return (
    <Modal
      visible={true}
      transparent
      animationType="none"
      onRequestClose={() => {
        /* Intentionally empty to prevent Modal from being dismissed via back button. */
      }}
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
    >
      <View
        style={styles.overlay}
        pointerEvents="auto"
        accessible={true}
        accessibilityViewIsModal={true}
        importantForAccessibility="yes"
      >
        <ActivityIndicator size="large" color={colors.light.primary} />
      </View>
    </Modal>
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
