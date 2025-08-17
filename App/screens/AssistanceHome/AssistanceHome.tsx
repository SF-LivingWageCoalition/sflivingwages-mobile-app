import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../theme";
import { fontSize, fontWeight } from "../../theme/fontStyles";
import { translate } from "../../translation/i18n";
import { AssistanceTabParamList } from "../../types";

interface AssistanceHomeProps {
  navigation: NativeStackNavigationProp<AssistanceTabParamList>;
}

const AssistanceHome: React.FC<AssistanceHomeProps> = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../../assets/icon.png")}
            />
          </View>
          <Text style={styles.title}>
            {translate("assistHomeScreen.title")}
          </Text>
          <Text style={styles.subtitle}>
            {translate("assistHomeScreen.subtitle")}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("ReportViolation")}
            >
              <Text style={styles.buttonText}>
                {translate("assistHomeScreen.getAssistance")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("WageRights")}
            >
              <Text style={styles.buttonText}>
                {translate("assistHomeScreen.wageRights")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("BeReadyForICE")}
            >
              <Text style={styles.buttonText}>
                {translate("assistHomeScreen.beReadyForICE")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("LivingWageCalculator")}
            >
              <Text style={styles.buttonText}>Living Wage Calculator</Text>
            </TouchableOpacity>
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
    backgroundColor: colors.light.surfaceVariant,
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: fontSize.sm,
    textAlign: "center",
    marginBottom: 30,
    color: colors.light.textSecondary,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 20,
  },
  button: {
    backgroundColor: colors.light.primary,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 6,
    shadowColor: colors.light.primary,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
  },
  buttonText: {
    fontSize: fontSize.md,
    color: colors.light.textOnPrimary,
    textAlign: "center",
    fontWeight: fontWeight.bold,
  },
});

export default AssistanceHome;
