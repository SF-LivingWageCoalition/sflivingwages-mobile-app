import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../theme";
import { fontSize, fontWeight } from "../../theme/fontStyles";

const IC_ARR_DOWN: ImageSourcePropType = require("../../assets/icons/ic_arr_down.png");
const IC_ARR_UP: ImageSourcePropType = require("../../assets/icons/ic_arr_up.png");

const LivingWageCalculator: React.FC = () => {
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [calculationResult, setCalculationResult] = useState<any | null>(null);

  const wageData = require("./livingwage.json");

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
    const livingWage = totalMonthly / 173.32;
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
  };

  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.circleBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>{"<"}</Text>
        </TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.title}>LIVING WAGE CALCULATOR</Text>
        </View>
        <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
              Number of adults in your household
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 8,
                borderColor: "#ccc",
                backgroundColor: "#fff",
                overflow: "hidden",
              }}
            >
              <RNPickerSelect
                value={adults}
                onValueChange={(itemValue: number) => setAdults(itemValue)}
                items={[
                  { label: "1", value: 1 },
                  { label: "2", value: 2 },
                ]}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                placeholder={{
                  label: "Select number of adults",
                  value: null,
                  color: "#999",
                }}
                Icon={() => (
                  <Image
                    source={IC_ARR_DOWN}
                    style={{
                      width: 20,
                      height: 20,
                      position: "absolute",
                      right: 12,
                      top: 15,
                    }}
                  />
                )}
              />
            </View>
          </View>

          <View style={{ marginBottom: 32 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
              Number of children in your household
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 8,
                borderColor: "#ccc",
                backgroundColor: "#fff",
                overflow: "hidden",
              }}
            >
              <RNPickerSelect
                value={children}
                onValueChange={(itemValue: number) => setChildren(itemValue)}
                items={[
                  { label: "0", value: 0 },
                  { label: "1", value: 1 },
                  { label: "2", value: 2 },
                  { label: "3", value: 3 },
                ]}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                placeholder={{
                  label: "Select number of children",
                  value: null,
                  color: "#999",
                }}
                Icon={() => (
                  <Image
                    source={IC_ARR_DOWN}
                    style={{
                      width: 20,
                      height: 20,
                      position: "absolute",
                      right: 12,
                      top: 15,
                    }}
                  />
                )}
              />
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: colors.light.primary,
              padding: 16,
              borderRadius: 12,
              alignItems: "center",
              width: "100%",
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{
                color: colors.light.textOnPrimary,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        {calculationResult && (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
              marginTop: 32,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 18, marginBottom: 12 }}
            >
              Results
            </Text>
            <Text>
              Poverty wage:{" "}
              <Text style={{ fontWeight: "bold" }}>
                ${calculationResult.povertyWage} /hour/adult
              </Text>
            </Text>
            <Text>
              Living wage:{" "}
              <Text style={{ fontWeight: "bold" }}>
                ${calculationResult.livingWage.toFixed(2)} /hour/adult
              </Text>
            </Text>
            <Text style={{ marginTop: 10 }}>
              Monthly total:{" "}
              <Text style={{ fontWeight: "bold" }}>
                ${formatNumber(calculationResult.totalMonthly)}
              </Text>
            </Text>
            <Text>
              Annual total:{" "}
              <Text style={{ fontWeight: "bold" }}>
                ${formatNumber(calculationResult.totalAnnual)}
              </Text>
            </Text>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                Breakdown:
              </Text>
              <Text>Housing: ${formatNumber(calculationResult.housing)}</Text>
              <Text>Food: ${formatNumber(calculationResult.food)}</Text>
              <Text>
                Childcare: ${formatNumber(calculationResult.childcare)}
              </Text>
              <Text>Medical: ${formatNumber(calculationResult.medical)}</Text>
              <Text>
                Transportation: $
                {formatNumber(calculationResult.transportation)}
              </Text>
              <Text>Other: ${formatNumber(calculationResult.other)}</Text>
              <Text>Taxes: ${formatNumber(calculationResult.taxes)}</Text>
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
    elevation: 5,
    shadowColor: colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backArrow: {
    color: colors.light.textOnPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
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
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    textAlign: "right",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    width: "100%",
    paddingHorizontal: 12,
    borderWidth: 0,
    borderRadius: 8,
    color: "#333",
    backgroundColor: "#fff",
    fontSize: 16,
  },
  inputAndroid: {
    height: 50,
    width: "100%",
    paddingHorizontal: 12,
    borderWidth: 0,
    borderRadius: 8,
    color: "#333",
    backgroundColor: "#fff",
    fontSize: 16,
  },
  placeholder: {
    color: "#999",
    fontSize: 16,
  },
});

export default LivingWageCalculator;
