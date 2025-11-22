import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import MainButton from "../../components/MainButton/MainButton";
import { fontSize, fontWeight } from "../../theme/fontStyles";
import { translate } from "../../translation";
import { colors } from "../../theme";

const ReportBusiness = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={30} color="black" />
        </TouchableOpacity>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require("../../assets/images/map-intro.png")}
        />
        <Text style={styles.title}>{translate("reportBusiness.title")}</Text>
        <Text style={styles.description}>
          {translate("reportBusiness.body")}
        </Text>

        <View style={styles.buttonContainer}>
          <MainButton
            title={translate("reportBusiness.cta")}
            onPress={() => navigation.navigate("ReportBusinessMap")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReportBusiness;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    marginHorizontal: 16,
    flex: 1,
  },
  image: {
    width: 300,
    height: 200,
    alignSelf: "center",
    marginTop: 30,
  },
  title: {
    fontWeight: fontWeight.bold,
    fontSize: fontSize.md,
    marginVertical: 40,
    color: colors.palette.gray800,
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.palette.gray700,
    lineHeight: 22,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
