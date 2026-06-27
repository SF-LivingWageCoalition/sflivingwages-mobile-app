import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation";

export type AuthTab = "login" | "register";

interface AuthTabsProps {
  activeTab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
  style?: StyleProp<ViewStyle>;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab, onTabChange, style }) => {
  return (
    <View style={[styles.tabBar, style]}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "login" && styles.tabActive]}
        onPress={() => onTabChange("login")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "login" && styles.tabTextActive,
          ]}
        >
          {translate("authModal.loginTab")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === "register" && styles.tabActive]}
        onPress={() => onTabChange("register")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "register" && styles.tabTextActive,
          ]}
        >
          {translate("authModal.registerTab")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.light.divider,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.light.primary,
  },
  tabText: {
    ...textStyles.bodyBold,
    color: colors.light.textSecondary,
  },
  tabTextActive: {
    color: colors.light.primary,
  },
});

export default AuthTabs;
