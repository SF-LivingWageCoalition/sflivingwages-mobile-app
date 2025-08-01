import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import committeeData from "./committee.json";
import { translate } from "../../translation/i18n";
import en from "../../translation/locales/en";
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
        <View style={styles.memberListContainer}>
          <Text style={styles.membersHeadingText}>
            {translate("whoWeAreScreen.committeeTitle")}
          </Text>
          {committeeData.map((member) => (
            <View style={styles.memberContainer} key={member.id}>
              <Text style={styles.memberNameText}>{member.name}</Text>
              <Text style={styles.memberTitleText}>
                {member.title}
              </Text>
            </View>
          ))}

          {/* Begin separator for testing */}
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
              width: '100%',
              marginBottom: 14
            }}
          />
          {/* End separator for testing */}

          {en.whoWeAreScreen.committeeMembers.map((member) => (
            <View style={styles.memberContainer} key={member.id}>
              <Text style={styles.memberNameText}>{member.name}</Text>
              <Text style={styles.memberTitleText}>
                {member.title}
                {/* {translate(member.title)} */}
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
