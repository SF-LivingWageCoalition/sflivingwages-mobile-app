import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../theme";
import { fontSize, fontWeight } from "../../theme/fontStyles";
import { translate } from "../../translation";

const Account: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onLogin = () => {
    setIsLoggedIn(true);
    const newErrors: { [key: string]: string } = {};
  };

  const onRegister = () => {
    const newErrors: { [key: string]: string } = {};
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    const newErrors: { [key: string]: string } = {};
  };

  return (
    <ScrollView>
      <View style={styles.container}>
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

        {/* Login Inputs */}
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

        {/* Login Buttons */}
        <View style={styles.buttonContainer}>
          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonText}>
              {translate("accountScreen.login")}
            </Text>
          </TouchableOpacity>

          {/* Register Button */}
          {/* TODO: User separate page for registration? */}
          <TouchableOpacity style={styles.button} onPress={onRegister}>
            <Text style={styles.buttonText}>
              {translate("accountScreen.register")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={styles.buttonContainer}>
          {/* Logout Button */}
          <TouchableOpacity style={styles.button} onPress={onLogout}>
            <Text style={styles.buttonText}>
              {translate("accountScreen.logout")}
            </Text>
          </TouchableOpacity>
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

  inputContainer: {
    margin: 12,
  },
  inputName: {
    marginLeft: 10,
  },
  requiredField: {
    color: colors.light.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  textInput: {
    // height: 30,
    borderBottomColor: colors.light.primary,
    borderBottomWidth: 1,
    margin: 10,
    // marginHorizontal: 10,
    // marginBottom: 10,
  },
  inputError: {
    color: colors.light.error,
    fontSize: fontSize.xxs,
    marginLeft: 10,
    marginTop: 2,
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 22,
    gap: 20,
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
});

export default Account;
