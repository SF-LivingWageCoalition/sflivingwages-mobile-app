import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { translate } from "../../translation/i18n";
import { colors } from "../../theme";
import { fontSize, fontWeight } from "../../theme/fontStyles";
import CommitteeMember from "./components/CommitteeMember";
import { CommitteeMemberData } from "../../types";

/**
 * Who We Are Screen component
 * Displays information about the Living Wage Coalition
 * source: (https://www.livingwage-sf.org/who-we-are/)
 */
const WhoWeAre: React.FC = () => {

  // SFLWC Logo
  const logo = {
    src: require("../../assets/icons/sflwc_logo_finaltemp.png"),
  };

  /**
   * Change an object into an array
   * Used to change a translated object (containing an arrary of objects) into an mappable array
   * @param obj 
   * @returns arr The translated array
   */
  const objToArr = (obj: any) => {
    if (obj.length > 0) {
      return obj;
    }
    let arr = [];
    for (let i = 0; i < Object.keys(obj).length; i++) {
      const n = `element${i + 1}`;
      arr.push(obj[n]);
    }
    return arr;
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo.src} style={styles.logo} />
        </View>
        <View>
          <Text style={styles.bodyText}>
            {translate("whoWeAreScreen.body")}
          </Text>
        </View>

        {/* Committe Members section */}
        <View style={styles.membersListContainer}>
          <Text style={styles.membersHeadingText}>
            {translate("whoWeAreScreen.committeeTitle")}
          </Text>
          {/* Committee Members List */}
          {objToArr(translate('whoWeAreScreen.committeeMembers')).map((member: CommitteeMemberData) => (
            <CommitteeMember key={member.id} member={member} />
          ))}
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  logoContainer: {
    padding: 20,
    backgroundColor: colors.light.primary,
    alignItems: "center",
    marginBottom: 18,
  },
  logo: {
    maxWidth: "100%",
    resizeMode: "contain",
  },
  bodyText: {
    fontSize: fontSize.md,
    marginBottom: 18,
  },
  membersHeadingText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: 18,
    textTransform: "uppercase",
  },
  membersListContainer: {
    alignItems: "center",
  },
});

export default WhoWeAre;
