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
import Button from "../../components/Button";
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
          onPress: () => {},
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
      <Button
        variant="primary"
        title={translate("buttons.login")}
        onPress={onLogin}
      />
    );
  };

  // Forgot Password Button
  const ForgotPasswordButton: React.FC = () => {
    return (
      <TouchableOpacity
        style={styles.textOnlyButton}
        onPress={onForgotPassword}
      >
        <Text style={styles.textOnlyButtonText}>
          {translate("buttons.forgotPassword")}
        </Text>
      </TouchableOpacity>
    );
  };

  // Register Button
  const RegisterButton: React.FC = () => {
    return (
      <TouchableOpacity style={styles.textOnlyButton} onPress={onRegister}>
        <Text style={styles.textOnlyButtonText}>
          {translate("buttons.register")}
        </Text>
      </TouchableOpacity>
    );
  };

  // Logout Button
  const LogoutButton: React.FC = () => {
    return (
      <View style={styles.authButtonsContainer}>
        <Button
          variant="primary"
          title={translate("buttons.logout")}
          onPress={onLogout}
          disabled={loggingOut}
        />
      </View>
    );
  };

  // Auth Buttons Container (Login, Register, Forgot Password)
  const AuthButtons: React.FC = () => {
    return (
      <View style={styles.authButtonsContainer}>
        <LoginButton />
        <View style={styles.textOnlyButtonContainer}>
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
    backgroundColor: colors.light.background,
  },
  authButtonsContainer: {
    marginTop: 10,
    // marginHorizontal: 22,
    gap: 16,
  },
  textOnlyButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textOnlyButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textOnlyButtonText: {
    ...textStyles.buttonSmall,
    color: colors.light.secondary,
  },
});

export default AccountScreen;
