import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./style/styles";

const MyBackButton = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity
      style={styles.backButtonSytle}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Text style={{ color: "#c91a1a", fontSize: 16 }}>Back</Text>
    </TouchableOpacity>
  );
};

export default MyBackButton;
