import React, { useState } from "react";
import {
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
  const [emailAddress, setEmailAddress] = useState<string>(
    "scott@scottmotion.com"
  );
  const [password, setPassword] = useState<string>("wordpress80!");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [authenticationData, setAuthenticationData] = useState<any>(null);
  const [validationData, setValidationData] = useState<any>(null);
  const [token, setToken] = useState<any>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onLogin = async (): Promise<void> => {
    // Get the JWT Token (Authenticate)
    try {
      const response = await fetch(
        `https://www.wpmockup.xyz/?rest_route=/simple-jwt-login/v1/auth&email=${emailAddress}&password=${password}`,
        {
          method: "POST",
          headers: { "cache-control": "no-cache" },
        }
      );

      // JWT Token retrieved
      if (response.ok && response.status !== 401) {
        const data = await response.json();
        setAuthenticationData(data);
        setToken(data.data.jwt);

        // Fetch protected data using the token (Validate)
        try {
          const protectedResponse = await fetch(
            "https://www.wpmockup.xyz/?rest_route=/simple-jwt-login/v1/auth/validate&JWT=" +
              data.data.jwt,
            {
              method: "POST",
              // headers: {
              //   // Authorization: `Bearer ${data.data.jwt}`,
              //   alg: "HS256",
              //   typ: "JWT",
              //   "cache-control": "no-cache",
              // },
            }
          );
          console.log("Protected response status:", protectedResponse.status);
          if (protectedResponse.ok) {
            const protectedData = await protectedResponse.json();
            setValidationData(protectedData);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Error fetching protected data:", error);
        } // end Validate
      }
    } catch (error) {
      // Error getting JWT token
      console.error("Error logging in:", error);
      setIsLoggedIn(false);
    } // end Authenticate

    const newErrors: { [key: string]: string } = {};
  };

  const onRegister = () => {
    const newErrors: { [key: string]: string } = {};
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    // setEmailAddress("");
    // setPassword("");
    setAuthenticationData(null);
    setToken(null);
    setValidationData(null);
    // Clear errors
    const newErrors: { [key: string]: string } = {};
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

        {!isLoggedIn && <LoginForm />}

        {/* Login/Register/Logout Buttons */}
        <View style={styles.buttonContainer}>
          {!isLoggedIn && <LoginButton />}
          {!isLoggedIn && <RegisterButton />}
          {isLoggedIn && <LogoutButton />}
        </View>

        <View style={styles.outputDataContainer}>
          <Text>Authentication Data:</Text>
          <Text>
            {authenticationData
              ? JSON.stringify(authenticationData)
              : "No response data"}
          </Text>
          <Text> </Text>
          <Text>Token:</Text>
          <Text>{token ? token : "No token"}</Text>
          <Text> </Text>
          <Text>Validation Data:</Text>
          <Text>
            {validationData
              ? JSON.stringify(validationData)
              : "No protected data"}
          </Text>
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
  outputDataContainer: {
    marginTop: 30,
  },
});

export default Account;
