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
import SubBulletItem from "../../components/lists/SubBulletItem";
import { colors } from "../../theme";
import { fontSize, fontWeight } from "../../theme/fontStyles";
import { translate } from "../../translation/i18n";

const IC_ARR_DOWN: ImageSourcePropType = require("../../assets/icons/ic_arr_down.png");
const IC_ARR_UP: ImageSourcePropType = require("../../assets/icons/ic_arr_up.png");

const WageRights: React.FC = () => {
  const navigation = useNavigation();
  const [contentVisible, setContentVisible] = useState<boolean[]>([
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
              style={styles.arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[0]}>
            <View style={styles.bulletList}>
              <BulletItem
                text={translate("wageRightsScreen.minimumWage.point1")}
              />
              <BulletItem
                text={translate("wageRightsScreen.minimumWage.point2")}
              />
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
              style={styles.arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[1]}>
            <View style={styles.bulletList}>
              {/* Top-level bullet 1 */}
              <BulletItem
                text={translate("wageRightsScreen.minimumCompensation.point1")}
              />
              {/* Top-level bullet 2 */}
              <BulletItem
                text={translate("wageRightsScreen.minimumCompensation.point2")}
              />

              {/* Top-level bullet 3 with nested sub-list */}
              <BulletItem
                text={translate("wageRightsScreen.minimumCompensation.point3")}
              />
              <View style={{ marginLeft: 20 }}>
                <SubBulletItem
                  text={translate(
                    "wageRightsScreen.minimumCompensation.subPoint1"
                  )}
                />
                <SubBulletItem
                  text={translate(
                    "wageRightsScreen.minimumCompensation.subPoint2"
                  )}
                />
                <SubBulletItem
                  text={translate(
                    "wageRightsScreen.minimumCompensation.subPoint3"
                  )}
                />
              </View>
              {/* Top-level bullet 4 */}
              <BulletItem
                text={translate("wageRightsScreen.minimumCompensation.point4")}
              />
            </View>
          </Collapsible>

          {/* Sick Leave Dropdown */}
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleContent(2)}
            activeOpacity={0.8}
          >
            <Text style={styles.headerTitle}>
              {translate("wageRightsScreen.sickLeave.title")}
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
                text={translate("wageRightsScreen.sickLeave.point1")}
              />
              <BulletItem
                text={translate("wageRightsScreen.sickLeave.point2")}
              />
              <BulletItem
                text={translate("wageRightsScreen.sickLeave.point3")}
              />
              <BulletItem
                text={translate("wageRightsScreen.sickLeave.point4")}
              />
            </View>
          </Collapsible>

          {/* Health Care Security Dropdown */}
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleContent(3)}
            activeOpacity={0.8}
          >
            <Text style={styles.headerTitle}>
              {translate("wageRightsScreen.healthCareSecurity.title")}
            </Text>
            <Image
              source={contentVisible[3] ? IC_ARR_UP : IC_ARR_DOWN}
              style={styles.arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[3]}>
            <View style={styles.bulletList}>
              {/* Top-level bullet 1 */}
              <BulletItem
                text={translate("wageRightsScreen.healthCareSecurity.point1")}
              />

              {/* Top-level bullet 2 with nested sub-list */}
              <BulletItem
                text={translate("wageRightsScreen.healthCareSecurity.point2")}
              />
              <View style={{ marginLeft: 20 }}>
                <SubBulletItem
                  text={translate(
                    "wageRightsScreen.healthCareSecurity.subPoint1"
                  )}
                />
                <SubBulletItem
                  text={translate(
                    "wageRightsScreen.healthCareSecurity.subPoint2"
                  )}
                />
                <SubBulletItem
                  text={translate(
                    "wageRightsScreen.healthCareSecurity.subPoint3"
                  )}
                />
                <SubBulletItem
                  text={translate(
                    "wageRightsScreen.healthCareSecurity.subPoint4"
                  )}
                />
                <SubBulletItem
                  text={translate(
                    "wageRightsScreen.healthCareSecurity.subPoint5"
                  )}
                />
              </View>
              {/* Top-level bullet 3 */}
              <BulletItem
                text={translate("wageRightsScreen.healthCareSecurity.point3")}
              />
              {/* Top-level bullet 4 */}
              <BulletItem
                text={translate("wageRightsScreen.healthCareSecurity.point4")}
              />
            </View>
          </Collapsible>

          {/* Health Care Accountability Dropdown */}
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleContent(4)}
            activeOpacity={0.8}
          >
            <Text style={styles.headerTitle}>
              {translate("wageRightsScreen.healthCareAccountability.title")}
            </Text>
            <Image
              source={contentVisible[4] ? IC_ARR_UP : IC_ARR_DOWN}
              style={styles.arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[4]}>
            <View style={styles.bulletList}>
              {/* Top-level bullet 1 with nested sub-list */}
              <BulletItem
                text={translate(
                  "wageRightsScreen.healthCareAccountability.point1"
                )}
              />
              <View style={{ marginLeft: 20 }}>
                <SubBulletItem
                  text={translate(
                    "wageRightsScreen.healthCareAccountability.subPoint1"
                  )}
                />
                <SubBulletItem
                  text={translate(
                    "wageRightsScreen.healthCareAccountability.subPoint2"
                  )}
                />
              </View>
              {/* Top-level bullet 2 */}
              <BulletItem
                text={translate(
                  "wageRightsScreen.healthCareAccountability.point2"
                )}
              />
              {/* Top-level bullet 3 */}
              <BulletItem
                text={translate(
                  "wageRightsScreen.healthCareAccountability.point3"
                )}
              />
            </View>
          </Collapsible>

          {/* Protections for Workers Dropdown */}
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleContent(5)}
            activeOpacity={0.8}
          >
            <Text style={styles.headerTitle}>
              {translate("wageRightsScreen.protectionsForWorkers.title")}
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
                text={translate(
                  "wageRightsScreen.protectionsForWorkers.point1"
                )}
              />
              <BulletItem
                text={translate(
                  "wageRightsScreen.protectionsForWorkers.point2"
                )}
              />
              <View style={{ marginLeft: 20 }}>
                <SubBulletItem
                  text={translate(
                    "wageRightsScreen.protectionsForWorkers.subPoint1"
                  )}
                />
                <SubBulletItem
                  text={translate(
                    "wageRightsScreen.protectionsForWorkers.subPoint2"
                  )}
                />
                <SubBulletItem
                  text={translate(
                    "wageRightsScreen.protectionsForWorkers.subPoint3"
                  )}
                />
                <SubBulletItem
                  text={translate(
                    "wageRightsScreen.protectionsForWorkers.subPoint4"
                  )}
                />
                <SubBulletItem
                  text={translate(
                    "wageRightsScreen.protectionsForWorkers.subPoint5"
                  )}
                />
                <SubBulletItem
                  text={translate(
                    "wageRightsScreen.protectionsForWorkers.subPoint6"
                  )}
                />
              </View>
              <BulletItem
                text={translate(
                  "wageRightsScreen.protectionsForWorkers.point3"
                )}
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
    backgroundColor: colors.light.backgroundSecondary,
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
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  card: {
    backgroundColor: colors.light.surface,
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
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
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
    fontWeight: fontWeight.medium,
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

export default WageRights;
