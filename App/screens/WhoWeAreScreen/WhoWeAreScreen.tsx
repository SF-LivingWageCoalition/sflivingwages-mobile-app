import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import sflwcLogo from "../../assets/icons/sflwc_logo_finaltemp.png";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation/i18n";
import { CommitteeMemberData } from "../../types/types";
import CommitteeMember from "./components/CommitteeMember";

/**
 * Who We Are Screen component
 * Displays information about the Living Wage Coalition
 * source: (https://www.livingwage-sf.org/who-we-are/)
 */

const WhoWeAre: React.FC = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={sflwcLogo} style={styles.logo} />
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
          {translate<CommitteeMemberData[]>(
            "whoWeAreScreen.committeeMembers"
          ).map((member: CommitteeMemberData) => (
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
    ...textStyles.bodyLarge,
    marginBottom: 18,
  },
  membersHeadingText: {
    ...textStyles.h2,
    marginBottom: 18,
    textTransform: "uppercase",
  },
  membersListContainer: {
    alignItems: "center",
  },
});

export default WhoWeAre;
