import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import RNPickerSelect from 'react-native-picker-select';
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
import RenderHTML from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { WebView } from "react-native-webview";

const IC_ARR_DOWN: ImageSourcePropType = require("../../assets/icons/ic_arr_down.png");
const IC_ARR_UP: ImageSourcePropType = require("../../assets/icons/ic_arr_up.png");

const LivingWageCalculator: React.FC = () => {
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);

  const handleSubmit = () => {
    // Placeholder: calculation logic will go here
    console.log(`Adults: ${adults}, Children: ${children}`);
  };

  const navigation = useNavigation();

  const [LWCContentRendered, setLWCContentRendered] = useState();

  const { width } = useWindowDimensions();

  const fetchLWC = (): void => {
    fetch(
      "https://www.livingwage-sf.org/wp-json/wp/v2/pages/9299?_fields=content.rendered"
    )
      .then((resp) => resp.json())
      .then((data) => {
        setLWCContentRendered(data.content.rendered);
      });
  };

  useEffect(() => {
    fetchLWC();
  }, []);

  console.log("LWCContentRendered", LWCContentRendered);

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
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../../assets/icon.png")}
            />
          </View>
          <Text style={styles.title}>Living Wage Calculator</Text>
        </View>
        <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Number of adults in your household</Text>
            <View style={{ borderWidth: 1, borderRadius: 8, borderColor: '#ccc', backgroundColor: '#fff', overflow: 'hidden' }}>
              <RNPickerSelect
                value={adults}
                onValueChange={(itemValue: number) => setAdults(itemValue)}
                items={[
                  { label: '1', value: 1 },
                  { label: '2', value: 2 },
                ]}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                placeholder={{ label: 'Select number of adults', value: null, color: '#999' }}
                Icon={() => (
                  <Image source={IC_ARR_DOWN} style={{ width: 20, height: 20, position: 'absolute', right: 12, top: 15 }} />
                )}
              />
            </View>
          </View>

          <View style={{ marginBottom: 32 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Number of children in your household</Text>
            <View style={{ borderWidth: 1, borderRadius: 8, borderColor: '#ccc', backgroundColor: '#fff', overflow: 'hidden' }}>
              <RNPickerSelect
                value={children}
                onValueChange={(itemValue: number) => setChildren(itemValue)}
                items={[
                  { label: '0', value: 0 },
                  { label: '1', value: 1 },
                  { label: '2', value: 2 },
                  { label: '3', value: 3 },
                ]}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                placeholder={{ label: 'Select number of children', value: null, color: '#999' }}
                Icon={() => (
                  <Image source={IC_ARR_DOWN} style={{ width: 20, height: 20, position: 'absolute', right: 12, top: 15 }} />
                )}
              />
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: colors.light.primary,
              padding: 16,
              borderRadius: 12,
              alignItems: 'center',
              width: '100%',
            }}
            onPress={handleSubmit}
          >
            <Text style={{ color: colors.light.textOnPrimary, fontWeight: 'bold', fontSize: 18 }}>Submit</Text>
          </TouchableOpacity>
        </View>
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
    top: 40,
    left: 20,
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
    resizeMode: "contain",
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    textAlign: "center",
    marginBottom: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    width: '100%',
    paddingHorizontal: 12,
    borderWidth: 0,
    borderRadius: 8,
    color: '#333',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputAndroid: {
    height: 50,
    width: '100%',
    paddingHorizontal: 12,
    borderWidth: 0,
    borderRadius: 8,
    color: '#333',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  placeholder: {
    color: '#999',
    fontSize: 16,
  },
});

export default LivingWageCalculator;
