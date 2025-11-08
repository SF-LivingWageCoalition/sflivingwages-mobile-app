// See `App/api/auth/README.md` for examples and error handling patterns.
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
import LoadingOverlay from "../../components/LoadingOverlay";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation";
import { sendPasswordReset } from "../../api/auth/authApi";
import { unwrapOrThrow } from "../../api/auth/utils";
import { mapApiErrorToMessage } from "../../api/auth/errorHelpers";
import { ForgotPasswordScreenProps } from "../../types/types";
import {
  createForgotPasswordSchema,
  type ForgotPasswordInput,
} from "../../validation/authValidation";
import { mapZodErrorToFormErrors } from "../../validation/mapZodError";

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const [form, setForm] = useState<ForgotPasswordInput>({ userEmail: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    // reset previous errors
    setErrors({});
    setGeneralError(null);

    const schema = createForgotPasswordSchema();
    const parsed = schema.safeParse(form);

    if (!parsed.success) {
      const { fieldErrors, generalError: gen } = mapZodErrorToFormErrors(
        parsed.error
      );
      setErrors(fieldErrors);
      if (gen) setGeneralError(gen);
      return;
    }

    const { userEmail: email } = parsed.data;

    console.log(
      `ForgotPasswordScreen: Trying to reset password for email: '${email}'`
    );
    setLoading(true);
    try {
      unwrapOrThrow(await sendPasswordReset(email));
      console.log("ForgotPasswordScreen: Password reset successful");
      Alert.alert(
        translate("forgotPasswordScreen.forgotPasswordAlert.title"),
        translate("forgotPasswordScreen.forgotPasswordAlert.message"),
        [{ text: translate("buttons.ok"), onPress: () => navigation.goBack() }],
        { cancelable: true, onDismiss: () => navigation.goBack() }
      );
    } catch (error: unknown) {
      console.error(
        "ForgotPasswordScreen: Error occurred during password reset:",
        error
      );
      const message = mapApiErrorToMessage(error, "errors.passwordResetFailed");
      setGeneralError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
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
                autoComplete="email"
                returnKeyType="done"
                onSubmitEditing={onSubmit}
                onChangeText={(userEmailInput) =>
                  setForm((prev) => ({ ...prev, userEmail: userEmailInput }))
                }
                value={form.userEmail}
                editable={!loading}
              />
              {errors.userEmail && (
                <Text style={styles.inputError}>{errors.userEmail}</Text>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, loading ? styles.buttonDisabled : null]}
                onPress={onSubmit}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {translate("buttons.submit")}
                </Text>
              </TouchableOpacity>
            </View>

            {generalError ? (
              <View>
                <Text style={styles.generalError}>{generalError}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>

      {loading && <LoadingOverlay />}
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
  },
  inputContainer: {},
  inputName: {
    ...textStyles.label,
  },
  requiredField: {
    ...textStyles.bodyBold,
    color: colors.light.primary,
  },
  textInput: {
    borderBottomColor: colors.light.primary,
    borderBottomWidth: 1,
  },
  inputError: {
    ...textStyles.caption,
    color: colors.light.error,
    marginTop: 10,
  },
  generalError: {
    ...textStyles.caption,
    color: colors.light.error,
    textAlign: "center",
    marginTop: 10,
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
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    ...textStyles.button,
    color: colors.light.textOnPrimary,
    textAlign: "center",
  },
});

export default ForgotPasswordScreen;
