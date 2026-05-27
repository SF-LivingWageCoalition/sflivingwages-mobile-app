import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { AccountScreenProps } from "../../types/types";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import type { AppDispatch } from "../../redux/store/store";
import { selectIsLoggedIn } from "../../redux/features/userSlice/userSlice";
import {
  validateUserThunk,
  logoutUserThunk,
} from "../../redux/features/userSlice/userThunks";
import { selectUserUiIsValidating } from "../../redux/features/userUiSlice/userUiSlice";
import { colors } from "../../theme";
import { translate } from "../../translation";
import MainButton from "../../components/MainButton";
import AccountScreenHeader from "./components/AccountScreenHeader";
import AccountScreenMenu from "./components/AccountScreenMenu";
import LoadingOverlay from "../../components/LoadingOverlay";

const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch<AppDispatch>();
  const isValidating = useSelector(selectUserUiIsValidating);

  // Local flag used to show an in-app overlay while logout is in progress.
  const [loggingOut, setLoggingOut] = useState(false);

  // This ensures the overlay remains visible until `clearUser()` has been dispatched.
  useEffect(() => {
    if (loggingOut && !isLoggedIn) {
      setLoggingOut(false);
    }
  }, [isLoggedIn, loggingOut]);

  useFocusEffect(
    React.useCallback(() => {
      if (!isLoggedIn) return;
      let cancelled = false;
      void (async () => {
        try {
          const ok = await dispatch(validateUserThunk()).unwrap();
          if (!ok && !cancelled) {
            // `validateUserThunk` will log out on 401; add UI handling here if desired
          }
        } catch {
          // ignore network/other errors
        }
      })();
      return () => {
        cancelled = true;
      };
    }, [isLoggedIn, dispatch]),
  );

  /**
   * Navigation and Action Handlers
   * Handle navigation to different screens like login, register, forgot password
   * Logout confirmation alert calls logoutUser from authApi (immediate logout, no navigation)
   */

  const onLogin = () => {
    navigation.navigate("AuthNavigator", { screen: "Login" });
  };

  const onRegister = () => {
    navigation.navigate("AuthNavigator", { screen: "Register" });
  };

  const onForgotPassword = () => {
    navigation.navigate("AuthNavigator", { screen: "ForgotPassword" });
  };

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
            // Dispatch a thunk that revokes the token (best-effort) and clears user state.
            // We don't await here because Alert buttons expect a sync callback,
            // but setLoggingOut(true) gives immediate UI feedback.
            void dispatch(logoutUserThunk());
          },
        },
      ],
      { cancelable: true },
    );
  };

  const AuthButtons: React.FC = () => (
    <View style={styles.authButtonsContainer}>
      <MainButton
        variant="primary"
        title={translate("buttons.login")}
        onPress={onLogin}
      />
      <View style={styles.textOnlyButtonContainer}>
        <MainButton
          variant="text"
          title={translate("buttons.forgotPassword")}
          onPress={onForgotPassword}
        />
        <MainButton
          variant="text"
          title={translate("buttons.register")}
          onPress={onRegister}
        />
      </View>
    </View>
  );

  const LogoutButton: React.FC = () => (
    <View style={styles.authButtonsContainer}>
      <MainButton
        variant="primary"
        title={translate("buttons.logout")}
        onPress={onLogout}
        isDisabled={loggingOut}
      />
    </View>
  );

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

      {/* Overlay shown while logout is in progress or token validation is running. */}
      {(loggingOut || isValidating) && <LoadingOverlay />}
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
    gap: 16,
  },
  textOnlyButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default AccountScreen;
