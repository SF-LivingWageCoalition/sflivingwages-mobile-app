import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { translate } from "../../../translation/i18n";

const WageRights: React.FC = () => {
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

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {translate("wageRightsScreen.minimumWage.title")}
            </Text>
            <Text style={styles.sectionText}>
              {translate("wageRightsScreen.minimumWage.content")}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {translate("wageRightsScreen.overtime.title")}
            </Text>
            <Text style={styles.sectionText}>
              {translate("wageRightsScreen.overtime.content")}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {translate("wageRightsScreen.breaks.title")}
            </Text>
            <Text style={styles.sectionText}>
              {translate("wageRightsScreen.breaks.content")}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default WageRights;
