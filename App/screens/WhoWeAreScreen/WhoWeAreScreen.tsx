import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { translate } from "../../translation/i18n";
import { colors } from "../../theme";
import { fontSize, fontWeight } from "../../theme/fontStyles";

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

  // We need to tranlate the entire committeeMembers first
  const committeeMembers = translate('whoWeAreScreen.committeeMembers');

  // Now change the translated committeeMembers into an array
  const objToArr = (obj) => {
    if (obj.length > 0) {
      return obj;
    }
    let arr = [];
    for (let i = 0; i < Object.keys(obj).length; i++) {
      const n = `member${i + 1}`;
      console.log("Test");
      console.log(n);
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

        {/* Committe Members */}
        <View style={styles.memberListContainer}>
          <Text style={styles.membersHeadingText}>
            {translate("whoWeAreScreen.committeeTitle")}
          </Text>
          {objToArr(committeeMembers).map((member) => (
            <View style={styles.memberContainer} key={member.id}>
              <Text style={styles.memberNameText}>{member.name}</Text>
              <Text style={styles.memberTitleText}>
                {member.title}
              </Text>
            </View>
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
  memberListContainer: {
    alignItems: "center",
  },
  memberContainer: {
    alignItems: "center",
    marginBottom: 18,
  },
  memberNameText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  memberTitleText: {
    fontSize: fontSize.sm,
  },
});

export default WhoWeAre;
