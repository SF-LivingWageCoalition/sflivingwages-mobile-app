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

const BeReadyForICE: React.FC = () => {
  const [contentVisible, setContentVisible] = useState<boolean[]>([
    false,
    false,
    false,
    false,
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
            {translate("beReadyForICEScreen.title")}
          </Text>

          {/* Make a Plan Dropdown */}
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleContent(0)}
            activeOpacity={0.8}
          >
            <Text style={styles.headerTitle}>
              {translate("beReadyForICEScreen.makeAPlan.title")}
            </Text>
            <Image
              source={contentVisible[0] ? IC_ARR_UP : IC_ARR_DOWN}
              style={styles.arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[0]}>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.makeAPlan.point1")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.makeAPlan.point2")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.makeAPlan.point3")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.makeAPlan.point4")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.makeAPlan.point5")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.makeAPlan.point6")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.makeAPlan.point7")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.makeAPlan.point8")}
                </Text>
              </View>
            </View>
          </Collapsible>

          {/* Who to Call Dropdown */}
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleContent(1)}
            activeOpacity={0.8}
          >
            <Text style={styles.headerTitle}>
              {translate("beReadyForICEScreen.whoToCall.title")}
            </Text>
            <Image
              source={contentVisible[1] ? IC_ARR_UP : IC_ARR_DOWN}
              style={styles.arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[1]}>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.whoToCall.point1")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.whoToCall.point2")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.whoToCall.point3")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.whoToCall.point4")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.whoToCall.point5")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.whoToCall.point6")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.whoToCall.point7")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.whoToCall.point8")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.whoToCall.point9")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.whoToCall.point10")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.whoToCall.point11")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.whoToCall.point12")}
                </Text>
              </View>
            </View>
          </Collapsible>

          {/* If ICE Arrives Dropdown */}
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleContent(2)}
            activeOpacity={0.8}
          >
            <Text style={styles.headerTitle}>
              {translate("beReadyForICEScreen.ifICEArrives.title")}
            </Text>
            <Image
              source={contentVisible[2] ? IC_ARR_UP : IC_ARR_DOWN}
              style={styles.arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[2]}>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.ifICEArrives.point1")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.ifICEArrives.point2")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.ifICEArrives.point3")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.ifICEArrives.point4")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.ifICEArrives.point5")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.ifICEArrives.point6")}
                </Text>
              </View>
            </View>
          </Collapsible>

          {/* Ready to Record Dropdown */}
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleContent(3)}
            activeOpacity={0.8}
          >
            <Text style={styles.headerTitle}>
              {translate("beReadyForICEScreen.readyToRecord.title")}
            </Text>
            <Image
              source={contentVisible[3] ? IC_ARR_UP : IC_ARR_DOWN}
              style={styles.arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[3]}>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.readyToRecord.point1")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.readyToRecord.point2")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.readyToRecord.point3")}
                </Text>
              </View>
            </View>
          </Collapsible>

          {/* If Detained Dropdown */}
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleContent(4)}
            activeOpacity={0.8}
          >
            <Text style={styles.headerTitle}>
              {translate("beReadyForICEScreen.ifDetained.title")}
            </Text>
            <Image
              source={contentVisible[4] ? IC_ARR_UP : IC_ARR_DOWN}
              style={styles.arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[4]}>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.ifDetained.point1")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.ifDetained.point2")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.ifDetained.point3")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.ifDetained.point4")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.ifDetained.point5")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.ifDetained.point6")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.ifDetained.point7")}
                </Text>
              </View>
            </View>
          </Collapsible>

          {/* Resources Dropdown */}
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleContent(5)}
            activeOpacity={0.8}
          >
            <Text style={styles.headerTitle}>
              {translate("beReadyForICEScreen.resources.title")}
            </Text>
            <Image
              source={contentVisible[5] ? IC_ARR_UP : IC_ARR_DOWN}
              style={styles.arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[5]}>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.resources.point1")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.resources.point2")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.resources.point3")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.resources.point4")}
                </Text>
              </View>
            </View>
          </Collapsible>

          {/* Emergency File Dropdown */}
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleContent(6)}
            activeOpacity={0.8}
          >
            <Text style={styles.headerTitle}>
              {translate("beReadyForICEScreen.emergencyFile.title")}
            </Text>
            <Image
              source={contentVisible[6] ? IC_ARR_UP : IC_ARR_DOWN}
              style={styles.arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[6]}>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.emergencyFile.point1")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.emergencyFile.point2")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.emergencyFile.point3")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("beReadyForICEScreen.emergencyFile.point4")}
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
  subBulletItem: {
    flexDirection: "row",
    marginLeft: 24, // Indent for sub-bullets
    marginBottom: 8,
  },
  subBulletPoint: {
    fontSize: 14,
    marginRight: 5,
    color: "#555",
    lineHeight: 20,
  },
  subBulletText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  arrow: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
});

export default BeReadyForICE;
