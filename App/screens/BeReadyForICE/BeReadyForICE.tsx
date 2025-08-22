import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Collapsible from "react-native-collapsible";
import BulletItem from "../../components/lists/BulletItem";
import { colors } from "../../theme";
import { fontSize, fontWeight } from "../../theme/fontStyles";
import { translate } from "../../translation/i18n";

const IC_ARR_DOWN: ImageSourcePropType = require("../../assets/icons/ic_arr_down.png");
const IC_ARR_UP: ImageSourcePropType = require("../../assets/icons/ic_arr_up.png");

const BeReadyForICE: React.FC = () => {
  const navigation = useNavigation();
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
        <TouchableOpacity
          style={styles.circleBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>{"<"}</Text>
        </TouchableOpacity>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../../assets/icon.png")}
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
              <BulletItem
                text={translate("beReadyForICEScreen.makeAPlan.point1")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.makeAPlan.point2")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.makeAPlan.point3")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.makeAPlan.point4")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.makeAPlan.point5")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.makeAPlan.point6")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.makeAPlan.point7")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.makeAPlan.point8")}
              />
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
              <BulletItem
                text={translate("beReadyForICEScreen.whoToCall.point1")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.whoToCall.point2")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.whoToCall.point3")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.whoToCall.point4")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.whoToCall.point5")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.whoToCall.point6")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.whoToCall.point7")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.whoToCall.point8")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.whoToCall.point9")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.whoToCall.point10")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.whoToCall.point11")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.whoToCall.point12")}
              />
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
              <BulletItem
                text={translate("beReadyForICEScreen.ifICEArrives.point1")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.ifICEArrives.point2")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.ifICEArrives.point3")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.ifICEArrives.point4")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.ifICEArrives.point5")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.ifICEArrives.point6")}
              />
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
              <BulletItem
                text={translate("beReadyForICEScreen.readyToRecord.point1")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.readyToRecord.point2")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.readyToRecord.point3")}
              />
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
              <BulletItem
                text={translate("beReadyForICEScreen.ifDetained.point1")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.ifDetained.point2")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.ifDetained.point3")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.ifDetained.point4")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.ifDetained.point5")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.ifDetained.point6")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.ifDetained.point7")}
              />
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
              <BulletItem
                text={translate("beReadyForICEScreen.resources.point1")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.resources.point2")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.resources.point3")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.resources.point4")}
              />
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
              <BulletItem
                text={translate("beReadyForICEScreen.emergencyFile.point1")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.emergencyFile.point2")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.emergencyFile.point3")}
              />
              <BulletItem
                text={translate("beReadyForICEScreen.emergencyFile.point4")}
              />
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
    backgroundColor: colors.light.surfaceVariant,
  },
  circleBackButton: {
    position: "absolute",
    top: 27,
    left: 27,
    backgroundColor: colors.light.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    elevation: 5,
    shadowColor: colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backArrow: {
    color: colors.light.textOnPrimary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  card: {
    backgroundColor: colors.light.background,
    borderRadius: 10,
    padding: 20,
    shadowColor: colors.light.shadow,
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
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
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
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.light.secondary,
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
    fontSize: fontSize.sm,
    marginRight: 5,
    lineHeight: 24,
  },
  bulletText: {
    flex: 1,
    fontSize: fontSize.sm,
    lineHeight: 24,
  },
  sectionText: {
    fontSize: fontSize.sm,
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
    fontSize: fontSize.xs,
    marginRight: 5,
    color: colors.light.textSecondary,
    lineHeight: 20,
  },
  subBulletText: {
    flex: 1,
    fontSize: fontSize.xs,
    color: colors.light.textPrimary,
    lineHeight: 20,
  },
  arrow: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
});

export default BeReadyForICE;
