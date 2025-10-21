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
  ActivityIndicator,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { colors } from "../theme";
import { textStyles } from "../theme/fontStyles";
import { translate } from "../translation";
import { LoginScreenProps } from "../types/types";
import { loginUser } from "./api/authApi";

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    // Do login logic here
    // Basic input validation
    const newErrors: { [key: string]: string } = {};
    if (!userEmail) {
      newErrors.userEmail =
        translate("validation.emailRequired") || "Email is required";
    }
    if (!userPassword) {
      newErrors.userPassword =
        translate("validation.passwordRequired") || "Password is required";
    }
    setErrors(newErrors);
    setGeneralError(null);

    if (Object.keys(newErrors).length === 0) {
      // No errors, proceed with login
      console.log(
        `LoginScreen: Trying to login user with email: '${userEmail}' and password: '${userPassword}'`
      );
      // Call the loginUser function and await structured result
      setLoading(true);
      try {
        const result = await loginUser(userEmail, userPassword, dispatch);
        if (result && result.success) {
          // Successful login: navigate back
          // setUser called in authApi.loginUser
          console.log("LoginScreen: Login successful");
          console.log("LoginScreen: Login data:", result);
          navigation.goBack();
        } else {
          // Show an error message to the user
          console.log("LoginScreen: Login failed");
          console.log("LoginScreen: Login data:", result);
          const message =
            result?.errorMessage ||
            translate("errors.loginFailed") ||
            "Login failed. Please check your credentials.";
          setGeneralError(message);
        }
      } catch (error) {
        console.error("LoginScreen: Unexpected error during login:", error);
        setGeneralError(
          translate("errors.unexpectedError") ||
            "An unexpected error occurred. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          {/* Begin Login Form */}
          <View style={styles.formContainer}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputName}>
                {translate("inputs.emailAddress")}
                <Text style={styles.requiredField}>*</Text>
              </Text>
              <TextInput
                style={styles.textInput}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(userEmailInput) => setUserEmail(userEmailInput)}
                value={userEmail}
                editable={!loading}
              />
              {errors.userEmail && (
                <Text style={styles.inputError}>{errors.userEmail}</Text>
              )}
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputName}>
                {translate("inputs.password")}
                <Text style={styles.requiredField}>*</Text>
              </Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.textInput}
                  keyboardType="default"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(userPasswordInput) =>
                    setUserPassword(userPasswordInput)
                  }
                  value={userPassword}
                  editable={!loading}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={styles.passwordToggle}
                >
                  <FontAwesome5
                    name={showPassword ? "eye-slash" : "eye"}
                    color="gray"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              {errors.userPassword && (
                <Text style={styles.inputError}>{errors.userPassword}</Text>
              )}
            </View>

            {/* Submit Button (with spinner) */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, loading ? styles.buttonDisabled : null]}
                onPress={onSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color={colors.light.textOnPrimary}
                  />
                ) : (
                  <Text style={styles.buttonText}>
                    {translate("buttons.submit")}
                  </Text>
                )}
                {/* Submit Button (no spinner) */}
                {/* <Text style={styles.buttonText}>
                  {translate("buttons.submit")}
                </Text> */}
              </TouchableOpacity>
            </View>

            {/* Errors */}
            {generalError ? (
              <View>
                <Text style={styles.generalError}>{generalError}</Text>
              </View>
            ) : null}
          </View>
          {/* End Login Form */}
        </View>
      </ScrollView>

      {/* Loading overlay */}
      {loading ? (
        <View style={styles.loadingOverlay} pointerEvents="auto">
          <ActivityIndicator size="large" color={colors.light.primary} />
        </View>
      ) : null}
    </View>
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
    ...textStyles.label,
    // marginHorizontal: 10,
    // marginLeft: 10,
  },
  requiredField: {
    ...textStyles.bodyBold,
    color: colors.light.primary,
  },
  textInput: {
    // height: 30,
    borderBottomColor: colors.light.primary,
    borderBottomWidth: 1,
    flex: 1,
    // margin: 10,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordToggle: {
    padding: 10,
    position: "absolute",
    right: 0,
    // flexGrow: 0,
    flexShrink: 0,
  },
  inputError: {
    ...textStyles.caption,
    color: colors.light.error,
    marginTop: 10,
    // marginLeft: 10,
    // marginTop: 2,
  },
  generalError: {
    ...textStyles.caption,
    color: colors.light.error,
    textAlign: "center",
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
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    ...textStyles.button,
    color: colors.light.textOnPrimary,
    textAlign: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
  },
});

export default Login;
