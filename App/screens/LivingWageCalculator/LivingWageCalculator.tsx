import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
  const navigation = useNavigation();

  const [LWC, setLWC] = useState({});
  const [LWCContent, setLWCContent] = useState({});
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
        {LWCContentRendered && (
          <WebView
            originWhitelist={["*"]}
            source={{ html: LWCContentRendered }}
            style={{ height: 600, width: "100%" }}
          />
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

export default LivingWageCalculator;
