import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

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
    color: "#c91a1a",
    fontSize: 16,
  },
});

export default MyBackButton;
