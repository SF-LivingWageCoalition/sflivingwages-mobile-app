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
import { textStyles } from "../../theme/fontStyles";
import { DonateSection } from "../../types/types";

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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                handleOpenURL(
                  "https://www.livingwage-sf.org/online-donation-form/"
                )
              }
            >
              <Text style={styles.buttonText}>{"Donate Online"}</Text>
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
    ...textStyles.h3,
    color: colors.light.secondary,
    textAlign: "center",
  },
  bodyText: {
    ...textStyles.body,
    color: colors.light.textPrimary,
    paddingHorizontal: 12,
  },
  dropDownItem: {
    marginTop: 30,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 20,
  },
  button: {
    backgroundColor: colors.light.primary, // #d31623
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 6,
    shadowColor: colors.light.primary,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
  },
  buttonText: {
    ...textStyles.button,
    color: colors.light.textOnPrimary,
    textAlign: "center",
  },
});

export default DonateScreen;
