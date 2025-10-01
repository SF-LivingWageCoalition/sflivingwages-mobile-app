import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../auth/api/authApi";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../theme";
import { fontSize, fontWeight } from "../../theme/fontStyles";
import { translate } from "../../translation";
import { AccountScreenProps } from "../../types";
import { RootState } from "../../redux/store/store";

const Account: React.FC<AccountScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.userData.user);
  // const roles = useSelector((state: RootState) => state.userData.roles);

  useEffect(() => {
    // Check if user data exists in Redux store to determine login status
    if (user && user.ID) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

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
        { text: "OK", onPress: () => logout(dispatch) },
      ],
      { cancelable: true }
    );
  };

  // Login Button
  const LoginButton: React.FC = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>
          {translate("accountScreen.login")}
        </Text>
      </TouchableOpacity>
    );
  };

  // Forgot Password Button
  const ForgotPasswordButton: React.FC = () => {
    return (
      <TouchableOpacity style={styles.textButton} onPress={onForgotPassword}>
        <Text style={styles.textButtonText}>
          {translate("accountScreen.forgotPassword")}
        </Text>
      </TouchableOpacity>
    );
  };

  // Register Button
  const RegisterButton: React.FC = () => {
    return (
      <TouchableOpacity style={styles.textButton} onPress={onRegister}>
        <Text style={styles.textButtonText}>
          {translate("accountScreen.register")}
        </Text>
      </TouchableOpacity>
    );
  };

  // Logout Button
  const LogoutButton: React.FC = () => {
    return (
      <View style={styles.authButtonsContainer}>
        <TouchableOpacity style={styles.button} onPress={onLogout}>
          <Text style={styles.buttonText}>
            {translate("accountScreen.logout")}
          </Text>
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

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Account Header */}
        <View>
          <Text style={styles.title}>{translate("accountScreen.title")}</Text>
          {/* User info */}
          {isLoggedIn ? (
            <View>
              <Text style={styles.subtitle}>
                {translate("accountScreen.isLoggedIn")}
              </Text>
              <Text style={styles.subtitle}>Welcome, {user.display_name}!</Text>
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
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: fontSize.sm,
    textAlign: "center",
    marginBottom: 10,
    color: colors.light.textSecondary,
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
    fontSize: fontSize.md,
    color: colors.light.textOnPrimary,
    textAlign: "center",
    fontWeight: fontWeight.bold,
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
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.light.secondary,
  },
});

export default Account;
