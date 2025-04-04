import React from "react";
import { TouchableOpacity, Text } from "react-native";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
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
