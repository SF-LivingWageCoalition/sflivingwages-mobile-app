// See `App/auth/README.md` for examples and error handling patterns.
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../theme";
import { textStyles } from "../theme/fontStyles";
import { translate } from "../translation";
import { sendPasswordReset, unwrapOrThrow, ApiError } from "./api/authApi";
import { mapApiErrorToMessage } from "./errorHelpers";
import { ForgotPasswordScreenProps } from "../types/types";

const ForgotPassword: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Handles the forgot password form submission.
   * Validates user input and calls the forgot password API.
   * Displays error messages for invalid input.
   * Navigates back on successful password reset.
   */
  const onSubmit = async () => {
    // Do forgot password logic here

    // Basic input validation: check if email is provided
    const newErrors: { [key: string]: string } = {};
    if (!userEmail) {
      newErrors.userEmail =
        translate("validation.emailRequired") || "Email is required";
    }
    setErrors(newErrors);
    setGeneralError(null);

    /**
     * Checks if there are any validation errors.
     * If none, proceeds with forgot password API call.
     */
    if (Object.keys(newErrors).length === 0) {
      // No errors, proceed with forgot password
      console.log(
        `ForgotPasswordScreen: Trying to reset password for email: '${userEmail}'`
      );
      // Call the sendPasswordReset function and await structured result
      setLoading(true);
      try {
        // Use unwrapOrThrow to convert ApiResult -> data or throw
        unwrapOrThrow(await sendPasswordReset(userEmail));
        // Success
        console.log("ForgotPasswordScreen: Password reset successful");
        Alert.alert(
          "Password reset email sent.",
          "Please check your email to complete your password reset.",
          [{ text: "OK", onPress: () => navigation.goBack() }],
          { cancelable: true, onDismiss: () => navigation.goBack() }
        );
      } catch (error: unknown) {
        console.error(
          "ForgotPasswordScreen: Error occurred during password reset:",
          error
        );
        const message = mapApiErrorToMessage(
          error,
          "errors.passwordResetFailed"
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
        {/* Begin Forgot Password Form */}
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

          {/* Submit Button */}
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

          {/* General Error Message */}
          {generalError ? (
            <View>
              <Text style={styles.generalError}>{generalError}</Text>
            </View>
          ) : null}
        </View>
        {/* End Forgot Password Form */}
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

export default ForgotPassword;
