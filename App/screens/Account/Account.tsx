import React, { useState } from "react";
import {
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
// import AuthNavigator from "../../auth/AuthNav";

const Account: React.FC<AccountScreenProps> = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // const [emailAddress, setEmailAddress] = useState<string>(
  //   "scott@scottmotion.com"
  // );
  // const [password, setPassword] = useState<string>("wordpress80!");

  // const [authenticationData, setAuthenticationData] = useState<any>(null);
  // const [validationData, setValidationData] = useState<any>(null);
  // const [token, setToken] = useState<any>(null);

  // const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onLogin = () => {
    // Navigate to Login Screen
    navigation.navigate("AuthNavigator", { screen: "Login" });
    // setIsLoggedIn(true);
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
    setIsLoggedIn(false);
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

  const LoginForm: React.FC = () => {
    return (
      <View style={styles.inputContainer}>
        {/* Username Input */}
        <Text style={styles.inputName}>
          {translate("accountScreen.emailAddress")}
          <Text style={styles.requiredField}>*</Text>
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(emailAddressInput) =>
            setEmailAddress(emailAddressInput)
          }
          value={emailAddress}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.emailAddress && (
          <Text style={styles.inputError}>{errors.emailAddress}</Text>
        )}

        {/* Password Input */}
        <Text style={styles.inputName}>
          {translate("accountScreen.password")}
          <Text style={styles.requiredField}>*</Text>
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(passwordInput) => setPassword(passwordInput)}
          value={password}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.password && (
          <Text style={styles.inputError}>{errors.password}</Text>
        )}
      </View>
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

  const LoginForm: React.FC = () => {
    return (
      <View style={styles.inputContainer}>
        {/* Username Input */}
        <Text style={styles.inputName}>
          {translate("accountScreen.username")}
          <Text style={styles.requiredField}>*</Text>
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(usernameInput) => setUsername(usernameInput)}
          value={username}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.username && (
          <Text style={styles.inputError}>{errors.username}</Text>
        )}

        {/* Password Input */}
        <Text style={styles.inputName}>
          {translate("accountScreen.password")}
          <Text style={styles.requiredField}>*</Text>
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(passwordInput) => setPassword(passwordInput)}
          value={password}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.password && (
          <Text style={styles.inputError}>{errors.password}</Text>
        )}
      </View>
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

  // Register Button
  {
    /* TODO: User separate page for registration? */
  }
  const RegisterButton: React.FC = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={onRegister}>
        <Text style={styles.buttonText}>
          {translate("accountScreen.register")}
        </Text>
      </TouchableOpacity>
    );
  };

  // Logout Button
  const LogoutButton: React.FC = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={onLogout}>
        <Text style={styles.buttonText}>
          {translate("accountScreen.logout")}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Account Header */}
        <View>
          <Text style={styles.title}>{translate("accountScreen.title")}</Text>
          {isLoggedIn ? (
            <Text style={styles.subtitle}>
              {translate("accountScreen.isLoggedIn")}
            </Text>
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
