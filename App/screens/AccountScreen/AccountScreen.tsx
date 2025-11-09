import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AccountScreenProps } from "../../types/types";
import { useSelector } from "react-redux";
import { logoutUser } from "../../api/auth/authApi";
import { selectIsLoggedIn } from "../../redux/features/userSlice/userSlice";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation";
import AccountScreenHeader from "./components/AccountScreenHeader";
import AccountScreenMenu from "./components/AccountScreenMenu";
import LoadingOverlay from "../../components/LoadingOverlay";

const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Local flag used to show an in-app overlay while logout is in progress.
  const [loggingOut, setLoggingOut] = useState(false);

  // This ensures the overlay remains visible until `clearUser()` has been dispatched.
  useEffect(() => {
    if (loggingOut && !isLoggedIn) {
      setLoggingOut(false);
    }
  }, [isLoggedIn, loggingOut]);

  /**
   * Navigation and Action Handlers
   * Handle navigation to different screens like login, register, forgot password
   * Logout confirmation alert calls logoutUser from authApi (immediate logout, no navigation)
   */

  // Login Handler
  const onLogin = () => {
    // Navigate to Login Screen
    navigation.navigate("AuthNavigator", { screen: "Login" });
  };

  // Register Handler
  const onRegister = () => {
    // Navigate to Register Screen
    navigation.navigate("AuthNavigator", { screen: "Register" });
  };

  // Forgot Password Handler
  const onForgotPassword = () => {
    // Navigate to Forgot Password Screen
    navigation.navigate("AuthNavigator", { screen: "ForgotPassword" });
  };

  // Logout Handler
  const onLogout = () => {
    Alert.alert(
      translate("accountScreen.logoutAlert.title"),
      translate("accountScreen.logoutAlert.message"),
      [
        {
          text: translate("buttons.cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: translate("buttons.ok"),
          onPress: () => {
            // Start the in-app overlay and kick off logout.
            setLoggingOut(true);
            // Call logoutUser(); it will dispatch clearUser() in its finally block.
            // We don't await here because Alert buttons expect a sync callback,
            // but setLoggingOut(true) gives immediate UI feedback.
            void logoutUser();
          },
        },
      ],
      { cancelable: true }
    );
  };

  /**
   * Button Components
   * Reusable button components for login, register, forgot password, and logout actions
   * Auth buttons container to group buttons together (login, register, forgot password)
   */

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
        <TouchableOpacity
          style={[styles.button, loggingOut ? styles.buttonDisabled : null]}
          onPress={onLogout}
          disabled={loggingOut}
        >
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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <AccountScreenHeader />
          {/* Account Menu */}
          {isLoggedIn && <AccountScreenMenu navigation={navigation} />}
          {/* Auth Buttons */}
          {isLoggedIn ? <LogoutButton /> : <AuthButtons />}
        </View>
      </ScrollView>

      {/* Overlay shown while logout is in progress. */}
      {loggingOut && <LoadingOverlay />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.light.surfaceVariant,
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
  buttonDisabled: {
    opacity: 0.7,
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

export default AccountScreen;
