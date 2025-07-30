import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import bodyText from "./bodyText.json";
import committeeData from "./committee.json";
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
          {bodyText.map((bodyText) => (
            <Text style={styles.bodyText} key={bodyText.id}>
              {bodyText.text}
            </Text>
          ))}
        </View>
        <View style={styles.memberListContainer}>
          <Text style={styles.membersHeadingText}>Coordinating Committee</Text>
          {committeeData.map((member) => (
            <View style={styles.memberContainer} key={member.id}>
              <Text style={styles.memberNameText}>{member.name}</Text>
              <Text style={styles.memberTitleText}>{member.title}</Text>
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
