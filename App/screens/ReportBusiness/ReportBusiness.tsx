import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import MainButton from "../../components/MainButton/MainButton";
import { fontSize, fontWeight } from "../../theme/fontStyles";
import { colors } from "../../theme";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

const ReportBusiness = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View style={{ marginHorizontal: 16, flex: 1 }}>
      <Image
        style={{
          width: 300,
          height: 200,
          alignSelf: "center",
          marginTop: 30,
        }}
        resizeMode="contain"
        source={require("../../assets/images/map-intro.png")}
      />
      <Text
        style={{
          fontWeight: fontWeight.bold,
          fontSize: fontSize.md,
          marginVertical: 40,
          color: colors.palette.gray800,
        }}
      >
        Report Abusive Employers on the Map
      </Text>
      <Text
        style={{
          fontSize: fontSize.sm,
          color: colors.palette.gray700,
          lineHeight: 22,
        }}
      >
        Empower workers by allowing them to anonymously report businesses that
        violate workers’ rights. This map-based feature helps expose wage theft,
        unsafe conditions, and other abuses — making it easier for the community
        to stay informed and take action.
      </Text>

      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <MainButton
          title="Continue"
          onPress={() => navigation.navigate("ReportBusinessMap")}
        />
      </View>
    </View>
  );
};

export default ReportBusiness;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
