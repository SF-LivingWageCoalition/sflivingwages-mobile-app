import React, { useState } from "react";
import {
  ImageSourcePropType,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownItem from "react-native-drop-down-item";
import { DonateContentItem, DonateMoneyState } from "../../../../App/types";

const IC_ARR_DOWN: ImageSourcePropType = require("./icons/ic_arr_down.png");
const IC_ARR_UP: ImageSourcePropType = require("./icons/ic_arr_up.png");

const DonateMoney: React.FC = () => {
  const [state] = useState<DonateMoneyState>({
    contents: [
      {
        title: "Checks",
        body: "Mail to:\n\nSan Francisco Living Wage Coalition, 2940 16th Street, #301 San Francisco, California, 94103",
        url: "https://livingwage-sf.org/wp-content/uploads/2020/04/Donation-Form.pdf",
        btnTitle: "",
      },
      {
        title: "PayPal",
        body: "A PayPal account is not required. You can also use your credit card or bank account to donate through PayPal. \n\nClick on the button below to be taken to our PayPal site.",
        url: "https://www.livingwage-sf.org/online-donation-form/",
        btnTitle: "Donate Online",
      },
    ],
  });

  const handleOpenURL = (url: string): void => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {state.contents.map((param: DonateContentItem, i: number) => (
          <DropDownItem
            key={i}
            style={styles.dropDownItem}
            contentVisible={true}
            invisibleImage={IC_ARR_DOWN}
            visibleImage={IC_ARR_UP}
            header={
              <View style={styles.header}>
                <Text style={styles.headerTitle}>{param.title}</Text>
              </View>
            }
          >
            <Text style={styles.bodyText}>{param.body}</Text>

            <View style={styles.buttonStyle}>
              {param.btnTitle.length !== 0 && (
                <TouchableOpacity
                  style={styles.donationButton}
                  onPress={() => handleOpenURL(param.url)}
                >
                  <Text style={styles.donationButtonText}>
                    {param.btnTitle}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </DropDownItem>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 5,
  },
  buttonStyle: {
    padding: 5,
    flex: 1,
    flexDirection: "row",
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
