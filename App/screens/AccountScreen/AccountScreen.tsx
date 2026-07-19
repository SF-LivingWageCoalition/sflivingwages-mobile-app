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
  deleteAccountThunk,
} from "../../redux/features/userSlice/userThunks";
import { selectUserUiIsValidating } from "../../redux/features/userUiSlice/userUiSlice";
import { colors } from "../../theme";
import { translate } from "../../translation";
import {
  getStatusFromError,
  mapApiErrorToMessage,
} from "../../api/auth/errorHelpers";
import MainButton from "../../components/MainButton";
import AccountScreenHeader from "./components/AccountScreenHeader";
import DeletePasswordModal from "./components/DeletePasswordModal";
import AccountScreenMenu from "./components/AccountScreenMenu";
import LoadingOverlay from "../../components/LoadingOverlay";

const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch<AppDispatch>();
  const isValidating = useSelector(selectUserUiIsValidating);

  // Local flag used to show an in-app overlay while logout is in progress.
  const [loggingOut, setLoggingOut] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [isDeletePasswordModalVisible, setIsDeletePasswordModalVisible] =
    useState(false);

  // use shared `getStatusFromError` from auth error helpers

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
          await dispatch(validateUserThunk()).unwrap();
          // success: nothing to do here — extraReducers update the store
        } catch (err) {
          if (!cancelled) {
            const status = getStatusFromError(err);
            if (status === 401) {
              // `validateUserThunk` caused a 401; extraReducers clear user state.
              // Add UI handling here if desired.
            }
          }
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
          onPress: async () => {
            setLoggingOut(true);
            try {
              await dispatch(logoutUserThunk()).unwrap();
              // optional: navigate or show success
            } catch (err) {
              // show localized error (mapApiErrorToMessage/getStatusFromError)
            } finally {
              setLoggingOut(false); // or check mountedRef.current before calling
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  const onDeleteAccount = () => {
    setDeletePassword("");
    setIsDeletePasswordModalVisible(true);
  };

  const closeDeletePasswordModal = () => {
    if (deletingAccount) return;
    setDeletePassword("");
    setIsDeletePasswordModalVisible(false);
  };

  const submitDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      Alert.alert(
        translate("accountScreen.deleteAccountError.title"),
        translate("validation.passwordRequired"),
      );
      return;
    }

    setDeletingAccount(true);
    try {
      await dispatch(deleteAccountThunk({ password: deletePassword })).unwrap();
      setDeletePassword("");
      setIsDeletePasswordModalVisible(false);
      Alert.alert(
        translate("accountScreen.deleteAccountSuccess.title"),
        translate("accountScreen.deleteAccountSuccess.message"),
      );
    } catch (err) {
      Alert.alert(
        translate("accountScreen.deleteAccountError.title"),
        mapApiErrorToMessage(err),
      );
    } finally {
      setDeletingAccount(false);
    }
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
        isDisabled={loggingOut || deletingAccount}
      />
    </View>
  );

  const DeleteAccountButton: React.FC = () => (
    <View style={styles.authButtonsContainer}>
      <MainButton
        variant="clear"
        title={translate("buttons.deleteAccount")}
        onPress={onDeleteAccount}
        isDisabled={loggingOut || deletingAccount}
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
          {isLoggedIn ? (
            <>
              <LogoutButton />
              <DeleteAccountButton />
            </>
          ) : (
            <AuthButtons />
          )}
        </View>
      </ScrollView>

      {/* Overlay shown while logout is in progress or token validation is running. */}
      {(loggingOut || deletingAccount || isValidating) && <LoadingOverlay />}

      <DeletePasswordModal
        visible={isDeletePasswordModalVisible}
        password={deletePassword}
        deletingAccount={deletingAccount}
        onChangePassword={setDeletePassword}
        onClose={closeDeletePasswordModal}
        onSubmit={submitDeleteAccount}
      />
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
