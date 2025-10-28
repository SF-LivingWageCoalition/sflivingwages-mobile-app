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
import { logoutUser } from "../../api/auth/authApi";
import {
  selectIsLoggedIn,
  selectUser,
  selectRoles,
  selectJwt,
} from "../../redux/features/userSlice/userSlice";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation";

const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);
  const roles = useSelector(selectRoles);
  const jwt = useSelector(selectJwt);

  const isLoggedIn = useSelector(selectIsLoggedIn);

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

  /**
   * UI Components
   * Components for the account screen header, menu, etc.
   */

  // Account Screen Header
  const AccountScreenHeader: React.FC = () => {
    return (
      <View>
        <Text style={styles.title}>{translate("accountScreen.title")}</Text>
        {isLoggedIn && user ? (
          <View>
            {/* <Text style={styles.subtitle}>
              {translate("accountScreen.isLoggedIn")}
            </Text> */}
            <Text style={styles.subtitle}>Welcome, {user.display_name}!</Text>
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

  // Account Screen Menu (Profile, Settings, etc.)
  const AccountScreenMenu: React.FC = () => {
    return (
      <View>
        <Text style={styles.userSliceSubtitle}>Account Menu:</Text>
        <HorizontalDivider />
        <TouchableOpacity
          style={styles.menuItem}
          // onPress={() => navigation.navigate("Profile")}
          onPress={() => {}}
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

  // Horizontal Divider
  const HorizontalDivider: React.FC = () => {
    return <View style={styles.horizontalDivider} />;
  };

  // User Info Component for Debugging
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
        <AccountScreenHeader />
        {/* Account Menu & Info */}
        {isLoggedIn ? (
          <View>
            <AccountScreenMenu />
            <UserInfo />
          </View>
        ) : null}
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
  horizontalDivider: {
    borderBottomColor: colors.light.onSurfaceVariant,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
});

export default AccountScreen;
