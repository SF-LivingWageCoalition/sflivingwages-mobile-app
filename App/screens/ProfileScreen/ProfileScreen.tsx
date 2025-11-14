import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ProfileScreenProps } from "../../types/types";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUser,
  selectRoles,
  selectJwt,
} from "../../redux/features/userSlice/userSlice";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const user = useSelector(selectUser);
  const roles = useSelector(selectRoles);
  const jwt = useSelector(selectJwt);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  // User Info Component for Debugging (uses closures over selected values)
  const UserInfo: React.FC = () => {
    if (user && roles && jwt) {
      return (
        <View>
          <View>
            <Text style={styles.userSliceSubtitle}>userSlice user:</Text>
            <Text>ID: {user.ID}</Text>
            <Text>Display Name: {user.display_name}</Text>
            <Text>Activation Key: {user.user_activation_key}</Text>
            <Text>Email: {user.user_email}</Text>
            <Text>Login: {user.user_login}</Text>
            <Text>Nice Name: {user.user_nicename}</Text>
            <Text>Registered: {user.user_registered}</Text>
            <Text>Status: {user.user_status}</Text>
            <Text>URL: {user.user_url}</Text>
          </View>
          <View>
            <Text style={styles.userSliceSubtitle}>userSlice roles:</Text>
            <Text>User Roles: {roles.join(", ")}</Text>
          </View>
          <View>
            <Text style={styles.userSliceSubtitle}>userSlice jwt:</Text>
            <Text>JWT Token: {jwt[0]?.token}</Text>
            <Text>JWT Header: {JSON.stringify(jwt[0]?.header)}</Text>
            <Text>JWT Payload: {JSON.stringify(jwt[0]?.payload)}</Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {isLoggedIn ? (
            <View>
              <UserInfo />
            </View>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.light.surfaceVariant,
  },
  userSliceSubtitle: {
    ...textStyles.bodyBold,
    marginVertical: 10,
  },
});

export default ProfileScreen;
