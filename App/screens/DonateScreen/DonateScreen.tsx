import React, { useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { colors } from "../../theme";
import { fontSize, fontWeight } from "../../theme/fontStyles";
import { DonateSection } from "../../types";

const DonateScreen: React.FC = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const handleOpenURL = (url: string): void => {
    Linking.openURL(url);
  };

  const SECTIONS: DonateSection[] = [
    {
      title: "Checks",
      content: (
        <Text style={styles.bodyText}>
          Mail to:{"\n\n"}
          San Francisco Living Wage Coalition, 2940 16th Street, #301 San
          Francisco, California, 94103
        </Text>
      ),
    },
    {
      title: "PayPal",
      content: (
        <View style={styles.viewStyle}>
          <Text style={styles.bodyText}>
            A PayPal account is not required. You can also use your credit card
            or bank account to donate through PayPal.{"\n\n"}Click on the button
            below to be taken to our PayPal site.
          </Text>
          <View style={styles.buttonStyle}>
            <TouchableOpacity
              style={styles.donationButton}
              onPress={() =>
                handleOpenURL(
                  "https://www.livingwage-sf.org/online-donation-form/"
                )
              }
            >
              <Text style={styles.donationButtonText}>{"Donate Online"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
    },
  ];

  const renderHeader = (section: DonateSection) => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{section.title}</Text>
    </View>
  );

  const renderContent = (section: DonateSection) => (
    <View style={styles.content}>{section.content}</View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.dropDownItem}>
          <Accordion
            sections={SECTIONS}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={setActiveSections}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 12,
    backgroundColor: colors.light.surface,
  },
  viewStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light.backgroundSecondary,
    paddingTop: 0,
  },
  scrollView: {
    alignSelf: "stretch",
  },
  header: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 40,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: fontSize.lg,
    color: colors.light.secondary,
    fontWeight: fontWeight.bold,
    textAlign: "center",
  },
  bodyText: {
    fontSize: fontSize.sm,
    color: colors.light.textPrimary,
    paddingHorizontal: 12,
  },
  dropDownItem: {
    marginTop: 30,
  },
  donationButton: {
    backgroundColor: colors.light.primary,
    padding: 10,
    width: 200,
    height: 40,
    marginTop: 20,
    borderRadius: 30,
  },
  buttonStyle: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  donationButtonText: {
    color: colors.light.textOnPrimary,
    fontWeight: fontWeight.bold,
    textAlign: "center",
  },
});

export default DonateScreen;
