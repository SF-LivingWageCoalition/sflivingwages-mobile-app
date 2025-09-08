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
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [responseData, setResponseData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [token, setToken] = useState<any>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onLogin = async (): Promise<void> => {
    // Get the JWT Token
    try {
      const response = await fetch(
        // `https://www.wpmockup.xyz/?rest_route=/simple-jwt-login/v1/auth&username=${username}&password=${password}`,
        `https://www.wpmockup.xyz/?rest_route=/simple-jwt-login/v1/auth&username=admin&password=wordpress80!`,
        {
          method: "POST",
          headers: { "cache-control": "no-cache" },
        }
      );

      // JWT Token retrieved
      if (response.ok && response.status !== 401) {
        const data = await response.json();
        // console.log("Token request data:", data.data.jwt);
        setResponseData(data);
        setToken(data.data.jwt);

        // Fetch protected data using the token
        try {
          console.log("Fetching protected data...");
          console.log("Using token:", data.data.jwt);
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
            console.log("Protected data:", protectedData);
            setUserData(protectedData);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Error fetching protected data:", error);
        }
      }
    } catch (error) {
      // Error getting JWT token
      console.error("Error logging in:", error);
      setIsLoggedIn(false);
    }
    const newErrors: { [key: string]: string } = {};
  };

  const onRegister = () => {
    const newErrors: { [key: string]: string } = {};
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setResponseData(null);
    setToken(null);
    setUserData(null);
    // Clear errors
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

        <View>
          <Text>Response Data:</Text>
          <Text>
            {responseData ? JSON.stringify(responseData) : "No response data"}
          </Text>
          <Text> </Text>
          <Text>Token:</Text>
          <Text>{token ? token : "No token"}</Text>
          <Text> </Text>
          <Text>Protected Data:</Text>
          <Text>
            {userData ? JSON.stringify(userData) : "No protected data"}
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
});

export default Account;
