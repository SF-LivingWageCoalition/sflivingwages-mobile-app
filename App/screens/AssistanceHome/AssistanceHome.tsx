import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import appIcon from "../../../assets/icon.png";
import MainButton from "../../components/MainButton";
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
            <MainButton
              variant="primary"
              title={translate("assistHomeScreen.getAssistance")}
              onPress={() => navigation.navigate("ReportViolation")}
            />

            <MainButton
              variant="primary"
              title={translate("assistHomeScreen.wageRights")}
              onPress={() => navigation.navigate("WageRights")}
            />

            <MainButton
              variant="primary"
              title={translate("assistHomeScreen.beReadyForICE")}
              onPress={() => navigation.navigate("BeReadyForICE")}
            />

            <MainButton
              variant="primary"
              title="Living Wage Calculator"
              onPress={() => navigation.navigate("LivingWageCalculator")}
            />
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
    ...textStyles.h3,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    ...textStyles.body,
    ...textStyles.body,
    textAlign: "center",
    marginBottom: 30,
    color: colors.light.textSecondary,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 20,
  },
});

export default AssistanceHome;
