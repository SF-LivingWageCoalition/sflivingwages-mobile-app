import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import appIcon from "../../../assets/icon.png";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { WageData } from "../../types/types";
import wageDataRaw from "./livingwage.json";

const wageData = wageDataRaw as WageData;

const LivingWageCalculator: React.FC = () => {
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [calculationResult, setCalculationResult] = useState<any | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const resultsCardRef = useRef<View>(null);

  function formatNumber(num: number) {
    return num.toLocaleString();
  }

  const handleSubmit = () => {
    const adultKey = adults === 1 ? "adult1" : "adult2";
    const kidKey = `kid${children}`;
    const entry = wageData[adultKey][kidKey];

    if (!entry) {
      console.error("No data found for selection", { adultKey, kidKey });
      setCalculationResult(null);
      return;
    }

    const { poverty, expenses } = entry;
    const housing = expenses.housing;
    const food = expenses.food;
    const childcare = expenses.childcare;
    const medical = expenses.medical;
    const transportation = expenses.transport;
    const other = expenses.other;
    const taxes = expenses.taxes;
    const totalMonthly =
      housing + food + childcare + medical + transportation + other + taxes;
    const livingWage =
      adultKey === "adult1" ? totalMonthly / 173.32 : totalMonthly / 173.32 / 2;
    const totalAnnual = totalMonthly * 12;

    setCalculationResult({
      povertyWage: poverty,
      livingWage,
      housing,
      food,
      childcare,
      medical,
      transportation,
      other,
      taxes,
      totalMonthly,
      totalAnnual,
    });

    // Scroll to results card after state update
    setTimeout(() => {
      resultsCardRef.current?.measureLayout(
        scrollViewRef.current as any,
        (x, y) => {
          scrollViewRef.current?.scrollTo({ y: y - 20, animated: true });
        },
        () => {}
      );
    }, 100);
  };

  const navigation = useNavigation();

  return (
    <ScrollView ref={scrollViewRef}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.circleBackButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5
            name="chevron-left"
            size={20}
            color={colors.light.chevronLight}
          />
        </TouchableOpacity>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={appIcon} />
          </View>
          <Text style={styles.title}>Living Wage Calculator</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.dropDownContainer}>
            <Text style={styles.numInHousehold}>
              Number of adults in your household
            </Text>
            <View style={styles.inputContainer}>
              <RNPickerSelect
                value={adults}
                onValueChange={(itemValue: number) => setAdults(itemValue)}
                items={[
                  { label: "1", value: 1 },
                  { label: "2", value: 2 },
                ]}
                placeholder={{}}
                style={pickerSelectStyles}
                Icon={() => {
                  return (
                    <FontAwesome5
                      name="chevron-down"
                      size={16}
                      color={colors.light.textSecondary}
                    />
                  );
                }}
              />
            </View>
          </View>

          <View style={styles.dropDownContainer2}>
            <Text style={styles.numInHousehold}>
              Number of children in your household
            </Text>
            <View style={styles.inputContainer}>
              <RNPickerSelect
                value={children}
                onValueChange={(itemValue: number) => setChildren(itemValue)}
                items={[
                  { label: "0", value: 0 },
                  { label: "1", value: 1 },
                  { label: "2", value: 2 },
                  { label: "3", value: 3 },
                ]}
                placeholder={{}}
                style={pickerSelectStyles}
                Icon={() => {
                  return (
                    <FontAwesome5
                      name="chevron-down"
                      size={16}
                      color={colors.light.textSecondary}
                    />
                  );
                }}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        {calculationResult && (
          <View ref={resultsCardRef} style={styles.resultsCard}>
            <Text style={styles.resultsTitle}>Results</Text>
            <Text style={textStyles.body}>
              Poverty wage:{" "}
              <Text style={styles.infoText}>
                ${calculationResult.povertyWage} /hour/adult
              </Text>
            </Text>
            <Text style={textStyles.body}>
              Living wage:{" "}
              <Text style={styles.infoText}>
                ${calculationResult.livingWage.toFixed(2)} /hour/adult
              </Text>
            </Text>
            <Text style={styles.monthlyTotalText}>
              Monthly total:{" "}
              <Text style={styles.infoText}>
                ${formatNumber(calculationResult.totalMonthly)}
              </Text>
            </Text>
            <Text style={textStyles.body}>
              Annual total:{" "}
              <Text style={styles.infoText}>
                ${formatNumber(calculationResult.totalAnnual)}
              </Text>
            </Text>
            <View style={styles.breakdownContainer}>
              <Text style={styles.breakdownTitle}>Breakdown:</Text>
              <Text style={textStyles.body}>
                Housing: ${formatNumber(calculationResult.housing)}
              </Text>
              <Text style={textStyles.body}>
                Food: ${formatNumber(calculationResult.food)}
              </Text>
              <Text style={textStyles.body}>
                Childcare: ${formatNumber(calculationResult.childcare)}
              </Text>
              <Text style={textStyles.body}>
                Medical: ${formatNumber(calculationResult.medical)}
              </Text>
              <Text style={textStyles.body}>
                Transportation: $
                {formatNumber(calculationResult.transportation)}
              </Text>
              <Text style={textStyles.body}>
                Other: ${formatNumber(calculationResult.other)}
              </Text>
              <Text style={textStyles.body}>
                Taxes: ${formatNumber(calculationResult.taxes)}
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.light.backgroundSecondary,
  },
  circleBackButton: {
    position: "absolute",
    top: 27,
    left: 27,
    backgroundColor: colors.light.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    elevation: 6,
    shadowColor: colors.light.primary,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
  },
  card: {
    backgroundColor: colors.light.surface,
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
    resizeMode: "cover",
    borderRadius: 10,
  },
  title: {
    ...textStyles.h3,
    textAlign: "center",
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
    color: colors.light.textOnPrimary,
    ...textStyles.button,
    textAlign: "center",
  },
  resultsCard: {
    backgroundColor: colors.light.background,
    borderRadius: 12,
    padding: 20,
    marginTop: 32,
    shadowColor: colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  numInHousehold: {
    ...textStyles.label,
    marginBottom: 8,
  },
  resultsTitle: {
    ...textStyles.label,
    marginBottom: 12,
  },
  breakdownTitle: {
    ...textStyles.label,
    marginBottom: 4,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.light.outline,
    backgroundColor: colors.light.background,
    overflow: "hidden",
  },
  formContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  dropDownContainer: {
    marginBottom: 24,
  },
  dropDownContainer2: {
    marginBottom: 32,
  },
  infoText: {
    ...textStyles.bodyBold,
  },
  monthlyTotalText: {
    ...textStyles.body,
    marginTop: 10,
  },
  breakdownContainer: {
    marginTop: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    paddingHorizontal: 12,
    borderWidth: 0,
    borderRadius: 8,
    color: colors.light.textPrimary,
    backgroundColor: colors.light.background,
    ...textStyles.body,
  },
  placeholder: {
    color: colors.light.textDisabled,
    ...textStyles.body,
  },
  iconContainer: {
    top: 17,
    right: 15,
  },
});

export default LivingWageCalculator;
