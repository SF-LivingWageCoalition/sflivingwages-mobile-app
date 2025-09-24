import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../theme";
import { fontSize, fontWeight } from "../theme/fontStyles";
import { translate } from "../translation";

const Login: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [authenticationData, setAuthenticationData] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
  const [validationData, setValidationData] = useState<any>(null);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const onSubmit = () => {
    // Do login logic here
    console.log(
      `Trying to login user with email: '${userEmail}' and password: '${userPassword}'`
    );
    // Basic validation
    const newErrors: { [key: string]: string } = {};
    if (!userEmail) {
      newErrors.userEmail = "Email is required";
    }
    if (!userPassword) {
      newErrors.userPassword = "Password is required";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // No errors, proceed with login
      loginUser(userEmail, userPassword);
    }
  };

  // Login a WP user via the Simple JWT Login plugin
  const loginUser = async (email: string, password: string) => {
    await fetchToken(email, password); // TODO: .then? try/catch?
    // If token is valid, set isLoggedIn to true
    if (tokenIsValid) {
      setIsLoggedIn(true);
    }
  };

  // Fetch JWT Token (Authenticate)
  const fetchToken = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://www.livingwage-sf.org/?rest_route=/simple-jwt-login/v1/auth&email=${email}&password=${password}`,
        {
          method: "POST",
          headers: { "cache-control": "no-cache" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Token fetch response data:", data);
        // Handle successful token fetch (e.g., store token, navigate to another screen)
        setAuthenticationData(data); // TODO: Remove later?
        setToken(data.data.jwt);
        await validateToken(data.data.jwt);
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  // Validate JWT Token (Validate)
  const validateToken = async (jwtToken: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://www.livingwage-sf.org/?rest_route=/simple-jwt-login/v1/auth/validate&JWT=${jwtToken}`,
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
      if (response.ok) {
        const data = await response.json();
        console.log("Token validation response data:", data);
        // Handle successful token validation (e.g., navigate to another screen)
        setTokenIsValid(true);
        setValidationData(data); // TODO: Remove later? Set token/user data in Redux store?
        setIsLoggedIn(true); // TODO: Move to login function
      }
    } catch (error) {
      console.error("Error validating token:", error);
    }
  };

  return (
    <ScrollView>
      <View>
        <Text>Login Screen</Text>
        {/* Login Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputName}>
              {translate("accountScreen.emailAddress")}
              <Text style={styles.requiredField}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(userEmailInput) => setUserEmail(userEmailInput)}
              value={userEmail}
            />
            {errors.userEmail && (
              <Text style={styles.inputError}>{errors.userEmail}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputName}>
              {translate("accountScreen.password")}
              <Text style={styles.requiredField}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(userPasswordInput) =>
                setUserPassword(userPasswordInput)
              }
              value={userPassword}
            />
            {errors.userPassword && (
              <Text style={styles.inputError}>{errors.userPassword}</Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
              <Text style={styles.buttonText}>
                {translate("accountScreen.submit")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* End Login Form */}
      </View>
      {isLoggedIn && <Text>Login Successful</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    gap: 20,
    marginHorizontal: 20,
    // margin: 20,
  },
  inputContainer: {
    // margin: 12,
  },
  inputName: {
    // marginHorizontal: 10,
    // marginLeft: 10,
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
    // margin: 10,
  },
  inputError: {
    color: colors.light.error,
    fontSize: fontSize.xxs,
    marginTop: 10,
    // marginLeft: 10,
    // marginTop: 2,
  },
  buttonContainer: {
    marginTop: 20,
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

export default Login;
