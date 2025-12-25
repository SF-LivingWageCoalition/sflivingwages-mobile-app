import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../theme";
import { textStyles } from "../../../theme/fontStyles";
import { translate } from "../../../translation";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../../redux/features/userSlice/userSlice";

const AccountScreenHeader: React.FC = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <View>
      <Text style={styles.title}>{translate("accountScreen.title")}</Text>
      {isLoggedIn && user ? (
        <View>
          <Text style={styles.subtitle}>
            {translate("accountScreen.isLoggedIn", { name: user.display_name })}
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.subtitle}>
            {translate("accountScreen.isLoggedOut")}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...textStyles.h3,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    ...textStyles.body,
    textAlign: "center",
    marginBottom: 10,
    color: colors.light.textSecondary,
  },
});

export default AccountScreenHeader;
