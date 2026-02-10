import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../theme";
import { textStyles } from "../../../theme/fontStyles";
import { translate } from "../../../translation";
import { FontAwesome5 } from "@expo/vector-icons";
import HorizontalDivider from "./HorizontalDivider";
import { AccountScreenProps } from "../../../types/types";

const AccountScreenMenu: React.FC<AccountScreenProps> = ({ navigation }) => {
  return (
    <View>
      <HorizontalDivider />
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() =>
          navigation.navigate("AccountNavigator", { screen: "Profile" })
        }
      >
        <Text style={styles.menuItemText}>
          {translate("accountScreen.profile")}
        </Text>
        <FontAwesome5
          name="chevron-right"
          size={20}
          color={colors.light.primary}
        />
      </TouchableOpacity>
      <HorizontalDivider />
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuItemText: {
    ...textStyles.body,
    color: colors.light.primary,
  },
});

export default AccountScreenMenu;
