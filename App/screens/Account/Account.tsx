import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AccountScreenProps } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store/store";
import { logoutUser } from "../../auth/api/authApi";
import {
  selectIsLoggedIn,
  selectUser,
  selectRoles,
  selectJwt,
} from "../../redux/features/userSlice/userSlice";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation";

const Account: React.FC<AccountScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);
  const roles = useSelector(selectRoles);
  const jwt = useSelector(selectJwt);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const onLogin = () => {
    // Navigate to Login Screen
    navigation.navigate("AuthNavigator", { screen: "Login" });
  };

  const onRegister = () => {
    // Navigate to Register Screen
    navigation.navigate("AuthNavigator", { screen: "Register" });
  };

  const onForgotPassword = () => {
    // Navigate to Forgot Password Screen
    navigation.navigate("AuthNavigator", { screen: "ForgotPassword" });
  };

  const onLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => logoutUser(dispatch) },
      ],
      { cancelable: true }
    );
  };

  // Login Button
  const LoginButton: React.FC = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>{translate("buttons.login")}</Text>
      </TouchableOpacity>
    );
  };

  // Forgot Password Button
  const ForgotPasswordButton: React.FC = () => {
    return (
      <TouchableOpacity style={styles.textButton} onPress={onForgotPassword}>
        <Text style={styles.textButtonText}>
          {translate("buttons.forgotPassword")}
        </Text>
      </TouchableOpacity>
    );
  };

  // Register Button
  const RegisterButton: React.FC = () => {
    return (
      <TouchableOpacity style={styles.textButton} onPress={onRegister}>
        <Text style={styles.textButtonText}>
          {translate("buttons.register")}
        </Text>
      </TouchableOpacity>
    );
  };

  // Logout Button
  const LogoutButton: React.FC = () => {
    return (
      <View style={styles.authButtonsContainer}>
        <TouchableOpacity style={styles.button} onPress={onLogout}>
          <Text style={styles.buttonText}>{translate("buttons.logout")}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Auth Buttons Container (Login, Register, Forgot Password)
  const AuthButtons: React.FC = () => {
    return (
      <View style={styles.authButtonsContainer}>
        <LoginButton />
        <View style={styles.textButtonContainer}>
          <ForgotPasswordButton />
          <RegisterButton />
        </View>
      </View>
    );
  };

  const UserInfo: React.FC = () => {
    if (user && roles && jwt) {
      return (
        <View>
          <View>
            <Text style={styles.subtitle}>
              {translate("accountScreen.isLoggedIn")}
            </Text>
            <Text style={styles.subtitle}>Welcome, {user.display_name}!</Text>
          </View>
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
        {/* Account Header */}
        <View>
          <Text style={styles.title}>{translate("accountScreen.title")}</Text>
          {/* User info */}
          {isLoggedIn ? (
            <UserInfo />
          ) : (
            <Text style={styles.subtitle}>
              {translate("accountScreen.isLoggedOut")}
            </Text>
          )}
        </View>
        {/* Auth Buttons */}
        {isLoggedIn ? <LogoutButton /> : <AuthButtons />}
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
  userSliceSubtitle: {
    ...textStyles.bodyBold,
    marginVertical: 10,
  },
  authButtonsContainer: {
    marginTop: 10,
    marginHorizontal: 22,
    gap: 16,
  },
  button: {
    backgroundColor: colors.light.primary,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 6,
    shadowColor: colors.light.primary,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
  },
  buttonText: {
    ...textStyles.button,
    color: colors.light.textOnPrimary,
    textAlign: "center",
  },
  textButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textButton: {
    // backgroundColor: colors.light.primary,
    // borderRadius: 30,
    // paddingVertical: 10,
    // paddingHorizontal: 15,
    // elevation: 6,
    // shadowColor: colors.light.primary,
    // shadowOpacity: 0.3,
    // shadowRadius: 3,
    // shadowOffset: { width: 1, height: 1 },
  },
  textButtonText: {
    ...textStyles.buttonSmall,
    color: colors.light.secondary,
  },
});

export default Account;
