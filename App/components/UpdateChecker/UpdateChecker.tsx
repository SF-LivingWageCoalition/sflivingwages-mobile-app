import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Updates from "expo-updates";
import * as Device from "expo-device";
import { useEffect, useState } from "react";
import { colors } from "../../theme";

export const UpdateChecker = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkForUpdates = async () => {
      if (!Device.isDevice) {
        return;
      }
      await onFetchUpdateAsync();
    };
    const interval = setInterval(() => {
      checkForUpdates();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setModalVisible(true);
      }
    } catch (error) {
      console.warn(`Error checking update: ${error}`);
    }
  }

  async function handleUpdate() {
    try {
      setLoading(true);
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return modalVisible ? (
    <View style={styles.absoluteOverlay}>
      <View style={styles.modalContent}>
        {/* Icon */}
        <View style={styles.iconContainer}>{/* <svgImages.cables /> */}</View>
        {/* Title */}
        <Text style={styles.title}>Update Available</Text>
        {/* Description */}
        <Text style={styles.description}>
          A new version of the app is available. Please update to the latest
          version for the best experience.
        </Text>
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.updateButtonText}>Update Now</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  absoluteOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 25,
    width: "90%",
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
    position: "absolute",
    top: -50,
    left: "50%",
    transform: [{ translateX: -20 }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 9,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: colors.palette.gray700,
    fontFamily: "noto-sans-bold",
    marginTop: 40,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "black",
    marginBottom: 24,
    fontFamily: "noto-sans-regular",
    paddingHorizontal: 10,
    lineHeight: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 16,
  },
  updateButton: {
    backgroundColor: colors.palette.red800,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    flex: 1,
    marginHorizontal: 8,
    alignItems: "center",
  },
  updateButtonText: {
    fontFamily: "noto-sans-bold",
    color: "white",
    fontSize: 18,
  },
});
