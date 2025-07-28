import React, { useState } from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Accordion } from "dooboo-ui";
import { DonateMoneyState } from "../../types";

const DonateMoney: React.FC = () => {
  const [state] = useState<DonateMoneyState>({
    contents: [
      {
        title: "Checks",
        items: [
          <Text style={styles.bodyText}>
            {
              "Mail to:\n\nSan Francisco Living Wage Coalition, 2940 16th Street, #301 San Francisco, California, 94103"
            }
          </Text>,
        ],
      },
      {
        title: "PayPal",
        items: [
          <View style={styles.viewStyle}>
            <Text style={styles.bodyText}>
              {
                "A PayPal account is not required. You can also use your credit card or bank account to donate through PayPal. \n\nClick on the button below to be taken to our PayPal site."
              }
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
          </View>,
        ],
      },
    ],
  });

  const handleOpenURL = (url: string): void => {
    Linking.openURL(url);
  };

  const renderTitle = (title: string) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    );
  };

  const renderItem = (item: React.ReactNode) => {
    return <View style={styles.content}>{item}</View>;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Accordion
          data={state.contents}
          renderTitle={renderTitle}
          renderItem={renderItem}
          style={styles.dropDownItem}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 12,
    backgroundColor: "#fff",
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
    backgroundColor: "#F5F5F5",
    paddingTop: 0,
  },
  scrollView: {
    alignSelf: "stretch",
  },
  header: {
    width: "100%",
    paddingVertical: 0,
    paddingHorizontal: 20,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "#0088dc",
  },
  bodyText: {
    fontSize: 16,
    color: "#100c08",
    paddingHorizontal: 12,
  },
  dropDownItem: {
    marginTop: 30,
  },
  donationButton: {
    backgroundColor: "#d31623",
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
    color: "white",
    fontWeight: "900",
    textAlign: "center",
  },
});

export default DonateMoney;
