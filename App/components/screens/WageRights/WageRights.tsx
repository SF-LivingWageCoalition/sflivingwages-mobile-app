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
              {/* Top-level bullet 1 */}
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.minimumCompensation.point1")}
                </Text>
              </View>
              {/* Top-level bullet 2 */}
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.minimumCompensation.point2")}
                </Text>
              </View>

              {/* Top-level bullet 3 with nested sub-list */}
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.minimumCompensation.point3")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={{ flex: 1 }}>
                  {/* Sub-bullets */}
                  <View style={styles.subBulletItem}>
                    <Text style={styles.subBulletPoint}>•</Text>
                    <Text style={styles.subBulletText}>
                      {translate(
                        "wageRightsScreen.minimumCompensation.subPoint1"
                      )}
                    </Text>
                  </View>
                  <View style={styles.subBulletItem}>
                    <Text style={styles.subBulletPoint}>•</Text>
                    <Text style={styles.subBulletText}>
                      {translate(
                        "wageRightsScreen.minimumCompensation.subPoint2"
                      )}
                    </Text>
                  </View>
                  <View style={styles.subBulletItem}>
                    <Text style={styles.subBulletPoint}>•</Text>
                    <Text style={styles.subBulletText}>
                      {translate(
                        "wageRightsScreen.minimumCompensation.subPoint3"
                      )}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Top-level bullet 4 */}
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.minimumCompensation.point4")}
                </Text>
              </View>
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
              style={{ width: 24, height: 24, marginLeft: 8 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[2]}>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.sickLeave.point1")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.sickLeave.point2")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.sickLeave.point3")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.sickLeave.point4")}
                </Text>
              </View>
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
              style={{ width: 24, height: 24, marginLeft: 8 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[3]}>
            <View style={styles.bulletList}>
              {/* Top-level bullet 1 */}
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.healthCareSecurity.point1")}
                </Text>
              </View>

              {/* Top-level bullet 2 with nested sub-list */}
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.healthCareSecurity.point2")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={{ flex: 1 }}>
                  {/* Sub-bullets */}
                  <View style={styles.subBulletItem}>
                    <Text style={styles.subBulletPoint}>•</Text>
                    <Text style={styles.subBulletText}>
                      {translate(
                        "wageRightsScreen.healthCareSecurity.subPoint1"
                      )}
                    </Text>
                  </View>
                  <View style={styles.subBulletItem}>
                    <Text style={styles.subBulletPoint}>•</Text>
                    <Text style={styles.subBulletText}>
                      {translate(
                        "wageRightsScreen.healthCareSecurity.subPoint2"
                      )}
                    </Text>
                  </View>
                  <View style={styles.subBulletItem}>
                    <Text style={styles.subBulletPoint}>•</Text>
                    <Text style={styles.subBulletText}>
                      {translate(
                        "wageRightsScreen.healthCareSecurity.subPoint3"
                      )}
                    </Text>
                  </View>
                  <View style={styles.subBulletItem}>
                    <Text style={styles.subBulletPoint}>•</Text>
                    <Text style={styles.subBulletText}>
                      {translate(
                        "wageRightsScreen.healthCareSecurity.subPoint4"
                      )}
                    </Text>
                  </View>
                  <View style={styles.subBulletItem}>
                    <Text style={styles.subBulletPoint}>•</Text>
                    <Text style={styles.subBulletText}>
                      {translate(
                        "wageRightsScreen.healthCareSecurity.subPoint5"
                      )}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Top-level bullet 3 */}
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.healthCareSecurity.point3")}
                </Text>
              </View>
              {/* Top-level bullet 4 */}
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.healthCareSecurity.point4")}
                </Text>
              </View>
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
              style={{ width: 24, height: 24, marginLeft: 8 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[4]}>
            <View style={styles.bulletList}>
              {/* Top-level bullet 1 with nested sub-list */}
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate(
                    "wageRightsScreen.healthCareAccountability.point1"
                  )}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={{ flex: 1 }}>
                  {/* Sub-bullets */}
                  <View style={styles.subBulletItem}>
                    <Text style={styles.subBulletPoint}>•</Text>
                    <Text style={styles.subBulletText}>
                      {translate(
                        "wageRightsScreen.healthCareAccountability.subPoint1"
                      )}
                    </Text>
                  </View>
                  <View style={styles.subBulletItem}>
                    <Text style={styles.subBulletPoint}>•</Text>
                    <Text style={styles.subBulletText}>
                      {translate(
                        "wageRightsScreen.healthCareAccountability.subPoint2"
                      )}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Top-level bullet 2 */}
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate(
                    "wageRightsScreen.healthCareAccountability.point2"
                  )}
                </Text>
              </View>
              {/* Top-level bullet 3 */}
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate(
                    "wageRightsScreen.healthCareAccountability.point3"
                  )}
                </Text>
              </View>
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
              style={{ width: 24, height: 24, marginLeft: 8 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Collapsible collapsed={!contentVisible[5]}>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.protectionsForWorkers.point1")}
                </Text>
              </View>
              {/* Top-level bullet 2 with nested sub-list */}
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.protectionsForWorkers.point2")}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={{ flex: 1 }}>
                  {/* Sub-bullets */}
                  <View style={styles.subBulletItem}>
                    <Text style={styles.subBulletPoint}>•</Text>
                    <Text style={styles.subBulletText}>
                      {translate(
                        "wageRightsScreen.protectionsForWorkers.subPoint1"
                      )}
                    </Text>
                  </View>
                  <View style={styles.subBulletItem}>
                    <Text style={styles.subBulletPoint}>•</Text>
                    <Text style={styles.subBulletText}>
                      {translate(
                        "wageRightsScreen.protectionsForWorkers.subPoint2"
                      )}
                    </Text>
                  </View>
                  <View style={styles.subBulletItem}>
                    <Text style={styles.subBulletPoint}>•</Text>
                    <Text style={styles.subBulletText}>
                      {translate(
                        "wageRightsScreen.protectionsForWorkers.subPoint3"
                      )}
                    </Text>
                  </View>
                  <View style={styles.subBulletItem}>
                    <Text style={styles.subBulletPoint}>•</Text>
                    <Text style={styles.subBulletText}>
                      {translate(
                        "wageRightsScreen.protectionsForWorkers.subPoint4"
                      )}
                    </Text>
                  </View>
                  <View style={styles.subBulletItem}>
                    <Text style={styles.subBulletPoint}>•</Text>
                    <Text style={styles.subBulletText}>
                      {translate(
                        "wageRightsScreen.protectionsForWorkers.subPoint5"
                      )}
                    </Text>
                  </View>
                  <View style={styles.subBulletItem}>
                    <Text style={styles.subBulletPoint}>•</Text>
                    <Text style={styles.subBulletText}>
                      {translate(
                        "wageRightsScreen.protectionsForWorkers.subPoint6"
                      )}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {translate("wageRightsScreen.protectionsForWorkers.point3")}
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
});

export default WageRights;
