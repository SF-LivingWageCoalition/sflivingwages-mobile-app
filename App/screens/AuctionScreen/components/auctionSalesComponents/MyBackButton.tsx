import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../../theme";
import { fontSize } from "../../../../theme/fontStyles";

const MyBackButton = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity
      style={styles.backButtonStyle}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Text style={styles.textStyle}>Back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButtonStyle: {
    paddingTop: 20,
  },
  textStyle: {
    color: colors.light.primary,
    fontSize: fontSize.md,
  },
});

export default MyBackButton;
