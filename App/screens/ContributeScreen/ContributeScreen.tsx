import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import MainButton from "../../components/MainButton";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation/i18n";
import { DonateSection } from "../../types/types";
import AuctionNav from "../AuctionScreen/AuctionNav";

const ContributeScreen: React.FC = () => {
  const [donateModalVisible, setDonateModalVisible] = useState(false);
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const handleOpenURL = async (url: string): Promise<void> => {
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      Alert.alert(
        "Unable to open link",
        "This URL isn't supported on your device.",
      );
      return;
    }
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        "Unable to open link",
        "Something went wrong. Please try again.",
      );
    }
  };

  const DONATE_SECTIONS: DonateSection[] = [
    {
      title: translate("donateScreen.checks.title"),
      content: (
        <Text style={styles.bodyText}>
          {translate("donateScreen.checks.body")}
        </Text>
      ),
    },
    {
      title: translate("donateScreen.paypal.title"),
      content: (
        <View style={styles.paypalContent}>
          <Text style={styles.bodyText}>
            {translate("donateScreen.paypal.body")}
          </Text>
          <View style={styles.donateButtonContainer}>
            <MainButton
              variant="primary"
              title={translate("donateScreen.paypal.button")}
              onPress={() =>
                handleOpenURL(
                  "https://www.livingwage-sf.org/online-donation-form/",
                )
              }
            />
          </View>
        </View>
      ),
    },
  ];

  const renderDonateHeader = (section: DonateSection) => (
    <View style={styles.accordionHeader}>
      <Text style={styles.accordionHeaderTitle}>{section.title}</Text>
    </View>
  );

  const renderDonateContent = (section: DonateSection) => (
    <View style={styles.accordionContent}>{section.content}</View>
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.donateBanner,
          pressed && styles.donateBannerPressed,
        ]}
        onPress={() => setDonateModalVisible(true)}
        accessibilityRole="button"
        accessibilityLabel="Open donate options"
      >
        <Text style={styles.donateBannerText}>{translate("donateScreen.title")}</Text>
        <FontAwesome5
          name="chevron-right"
          size={14}
          color={colors.light.textOnPrimary}
        />
      </Pressable>

      <AuctionNav />

      <Modal
        visible={donateModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setDonateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{translate("donateScreen.title")}</Text>
              <Pressable
                onPress={() => setDonateModalVisible(false)}
                hitSlop={12}
              >
                <FontAwesome5
                  name="times"
                  size={20}
                  color={colors.light.textPrimary}
                />
              </Pressable>
            </View>

            <ScrollView style={styles.modalScroll}>
              <Accordion
                sections={DONATE_SECTIONS}
                activeSections={activeSections}
                renderHeader={renderDonateHeader}
                renderContent={renderDonateContent}
                onChange={setActiveSections}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  donateBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: colors.light.secondary,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  donateBannerPressed: {
    opacity: 0.85,
  },
  donateBannerText: {
    ...textStyles.h3,
    color: colors.light.textOnPrimary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.light.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  modalTitle: {
    ...textStyles.h2,
    color: colors.light.textPrimary,
  },
  modalScroll: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  accordionHeader: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 40,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
  accordionHeaderTitle: {
    ...textStyles.h3,
    color: colors.light.secondary,
    textAlign: "center",
  },
  accordionContent: {
    padding: 12,
    backgroundColor: colors.light.surface,
  },
  bodyText: {
    ...textStyles.body,
    color: colors.light.textPrimary,
    paddingHorizontal: 12,
  },
  paypalContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  donateButtonContainer: {
    marginTop: 20,
    gap: 20,
  },
});

export default ContributeScreen;
