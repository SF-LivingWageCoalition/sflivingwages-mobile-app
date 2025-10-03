import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { LogoHeaderProps } from "../types/types";
import sflwcLogo from "../assets/icons/sflwc_logo_finaltemp.png";

const LogoHeader: React.FC<LogoHeaderProps> = ({ navigation }) => {
  // If navigation is not provided as a prop, use the useNavigation hook
  const nav = navigation || useNavigation<NavigationProp<ParamListBase>>();

  return (
    <TouchableWithoutFeedback onPress={() => nav.navigate("Home")}>
      <Image
        source={sflwcLogo}
        style={styles.logoHeaderImageStyle}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  /*
    logoHeaderImageStyle style both ios and android will have flex:1, but ios and android will have platform specific height:
    logoHeaderImageStyle already has its own {braces} so for styling, you only need a single set of brace to hold it.
    Ex: <View style = {bannerStyle.logoHeaderImageStyle} />
  */
  logoHeaderImageStyle: {
    /* non-platform specific styling */
    flex: 1,
    ...Platform.select({
      /* ios styling */
      ios: {
        height: 55,
        width: 180,
        resizeMode: "contain" as const,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
      },
      /* android styling */
      android: {
        height: 55,
        width: 180,
        resizeMode: "contain" as const,
        marginBottom: 5,
        alignItems: "center",
        justifyContent: "center",
      },
    }),
  },
});

export default LogoHeader;
