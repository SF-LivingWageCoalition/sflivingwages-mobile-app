// See `App/auth/README.md` for examples and error handling patterns.
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { colors } from "../theme";
import { textStyles } from "../theme/fontStyles";
import { translate } from "../translation";
import { registerCustomer, unwrapOrThrow, ApiError } from "./api/authApi";
import { mapApiErrorToMessage } from "./errorHelpers";
import { RegisterScreenProps } from "../types/types";

const Register: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Handles the registration form submission.
   * Validates user input and calls the registration API.
   * Displays error messages for invalid input.
   * Navigates back on successful registration.
   */
  const onSubmit = async () => {
    // Do registration logic here

    // Basic input validation: check if email and password are provided
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

    // If no validation errors, proceed with registration
    if (Object.keys(newErrors).length === 0) {
      console.log(
        `RegisterScreen: Trying to register user with email: '${userEmail}' and password: '${userPassword}'`
      );
      setLoading(true);
      try {
        // Use unwrapOrThrow to convert ApiResult -> data or throw
        const registrationData = unwrapOrThrow(
          await registerCustomer(userEmail, userPassword)
        );
        // Successful registration: navigate back
        console.log("RegisterScreen: Registration successful");
        console.log(
          "RegisterScreen: Received registrationData:\n",
          JSON.stringify(registrationData, null, 2)
        );
        Alert.alert(
          "Registration successful",
          "You may now log in.",
          [{ text: "OK", onPress: () => navigation.goBack() }],
          { cancelable: true, onDismiss: () => navigation.goBack() }
        );
      } catch (error: unknown) {
        console.error(
          "RegisterScreen: Unexpected error during registration:",
          error
        );
        const message = mapApiErrorToMessage(
          error,
          "errors.registrationFailed"
        );
        setGeneralError(message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Begin Registration Form */}
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
            />
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
            </TouchableOpacity>
          </View>

          {/* Errors */}
          {generalError ? (
            <View>
              <Text style={styles.generalError}>{generalError}</Text>
            </View>
          ) : null}
        </View>
        {/* End Registration Form */}
      </View>

      {/* Loading overlay */}
      {loading ? (
        <View style={styles.loadingOverlay} pointerEvents="auto">
          <ActivityIndicator size="large" color={colors.light.primary} />
        </View>
      ) : null}
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
    // margin: 10,
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

export default Register;
