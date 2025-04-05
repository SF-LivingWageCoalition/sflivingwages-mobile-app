import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import { Image, TouchableWithoutFeedback } from "react-native";
import { LogoHeaderProps } from "../../../App/types";
import { bannerStyle } from "../style/styleSheet";

const LogoHeader: React.FC<LogoHeaderProps> = ({ navigation }) => {
  // If navigation is not provided as a prop, use the useNavigation hook
  const nav = navigation || useNavigation<NavigationProp<ParamListBase>>();

  return (
    <TouchableWithoutFeedback onPress={() => nav.navigate("Home")}>
      <Image
        source={require("../../../assets/sflwc_logo_finaltemp.png")}
        style={bannerStyle.logoHeaderImageStyle}
      />
    </TouchableWithoutFeedback>
  );
};

export default LogoHeader;
