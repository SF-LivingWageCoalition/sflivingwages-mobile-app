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
import appIcon from "../../../assets/icon.png";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation/i18n";
import { AssistanceTabParamList } from "../../types/types";

interface AssistanceHomeProps {
  navigation: NativeStackNavigationProp<AssistanceTabParamList>;
}

const AssistanceHome: React.FC<AssistanceHomeProps> = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={appIcon} />
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
    borderRadius: 10,
  },
  title: {
    ...textStyles.h3,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    ...textStyles.body,
    textAlign: "center",
    marginBottom: 30,
    color: colors.light.textSecondary,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 20,
  },
  button: {
    backgroundColor: colors.light.primary, // #d31623
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
    ...textStyles.button,
    color: colors.light.textOnPrimary, // #991b1b
    textAlign: "center",
  },
});

export default AssistanceHome;
