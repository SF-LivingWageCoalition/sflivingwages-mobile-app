import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageSourcePropType,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { TouchableOpacity } from "react-native";
import { translate } from "../../../translation/i18n";

const IC_ARR_DOWN: ImageSourcePropType = require("../DonateScreen/icons/ic_arr_down.png");
const IC_ARR_UP: ImageSourcePropType = require("../DonateScreen/icons/ic_arr_up.png");

const WageRights: React.FC = () => {
  const [contentVisible, setContentVisible] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const toggleContent = (index: number) => {
    setContentVisible((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../../../assets/icon.png")}
            />
          </View>
          <Text style={styles.title}>
            {translate("wageRightsScreen.title")}
          </Text>

          {/* Minimum Wage Dropdown */}
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleContent(0)}
            activeOpacity={0.8}
          >
            <Text style={styles.headerTitle}>
              {translate("wageRightsScreen.minimumWage.title")}
            </Text>
            <Image
              source={contentVisible[0] ? IC_ARR_UP : IC_ARR_DOWN}
              style={{ width: 24, height: 24, marginLeft: 8 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[0]}>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.minimumWage.point1")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.minimumWage.point2")}
                </Text>
              </View>
            </View>
          </Collapsible>

          {/* Minimum Compensation Dropdown */}
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleContent(1)}
            activeOpacity={0.8}
          >
            <Text style={styles.headerTitle}>
              {translate("wageRightsScreen.minimumCompensation.title")}
            </Text>
            <Image
              source={contentVisible[1] ? IC_ARR_UP : IC_ARR_DOWN}
              style={{ width: 24, height: 24, marginLeft: 8 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[1]}>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.minimumCompensation.point1")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.minimumCompensation.point2")}
                </Text>
              </View>
            </View>
          </Collapsible>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  dropDownItem: {
    marginTop: 15,
  },
  header: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0088dc",
  },
  bulletList: {
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 5,
    lineHeight: 24,
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});

export default WageRights;
