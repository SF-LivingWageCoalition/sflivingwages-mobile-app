import React from "react";
import {
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AppleMaps, GoogleMaps } from "expo-maps";
import LottieView from "lottie-react-native";

import { fontSize, fontWeight } from "../../theme/fontStyles";
import { colors } from "../../theme";
// Expo Go = StoreClient
const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient ||
  (Constants as any).executionEnvironment === "storeClient";

type PlatformMapProps = React.ComponentProps<typeof AppleMaps.View> &
  React.ComponentProps<typeof GoogleMaps.View>;

export default function PlatformMap(props: PlatformMapProps) {
  const [modalVisible, setModalVisible] = React.useState(true);
  const navigation = useNavigation();

  const closeModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };
  // Block Expo Go up front
  if (isExpoGo) {
    return (
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <AntDesign name="close" size={35} color={colors.palette.gray500} />
          </TouchableOpacity>
          <LottieView
            source={require("../../assets/animations/Missconfig.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
          <Text style={styles.modalText}>
            Maps are only available in Dev/Preview/Production builds.
          </Text>
        </View>
      </Modal>
    );
  }

  // Lazy load the native module so Expo Go never imports it
  let ExpoMaps: any = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    ExpoMaps = require("expo-maps");
  } catch {
    return (
      <View style={{ padding: 12 }}>
        <Text>
          Maps module not available. Rebuild your dev/preview/prod client.
        </Text>
      </View>
    );
  }

  if (Platform.OS === "ios") {
    return <ExpoMaps.AppleMaps.View {...props} />;
  }
  if (Platform.OS === "android") {
    return <ExpoMaps.GoogleMaps.View {...props} />;
  }
  return <Text>Maps are only available on Android and iOS.</Text>;
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  closeButton: {
    position: "absolute",
    top: 80,
    left: 16,
    zIndex: 1,
  },
  lottie: {
    width: 250,
    height: 250,
  },
  modalText: {
    fontSize: fontSize.lg,
    color: colors.palette.gray500,
    fontWeight: fontWeight.semibold,
  },
});
