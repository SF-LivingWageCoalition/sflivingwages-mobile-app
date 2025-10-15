import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice/userSlice";
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
import { LoginScreenProps } from "../types";
import { fetchToken, validateToken } from "./api/authApi";

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onSubmit = () => {
    // Do login logic here
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
      console.log(
        `LoginScreen: Trying to login user with email: '${userEmail}' and password: '${userPassword}'`
      );
      loginUser(userEmail, userPassword);
    }
  };

  // Login a WP user via the Simple JWT Login plugin
  const loginUser = async (email: string, password: string) => {
    const tokenData = await fetchToken(email, password);
    if (tokenData && tokenData.data && tokenData.success) {
      // Token fetch success. Validate the received token
      const validationData = await validateToken(tokenData.data.jwt);
      if (validationData && validationData.success && validationData.data) {
        // Token validation success. Set user data in Redux store
        console.log("LoginScreen: Login successful");
        dispatch(setUser(validationData.data)); // Set user data in Redux store
        navigation.goBack();
      } else {
        // Token validation failed.
        console.log("LoginScreen: Login failed");
        console.log("LoginScreen: Validation data:", validationData);
      }
    } else {
      // Token fetch failed.
      console.log("LoginScreen: Login failed");
      console.log("LoginScreen: Token data:", tokenData);
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
