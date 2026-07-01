// See `App/api/auth/README.md` for examples and error handling patterns.
import React from "react";
import {
  Alert,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { sendPasswordReset } from "../../api/auth/authApi";
import { unwrapOrThrow } from "../../api/auth/utils";
import { useAuthForm } from "../../hooks/useAuthForm";
import { formStyles } from "../../theme/formStyles";
import { translate } from "../../translation";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../../validation/authSchema";
import LoadingOverlay from "../LoadingOverlay";
import MainButton from "../MainButton";
import EmailField from "../forms/EmailField";

interface ForgotPasswordFormProps {
  /** Called after the success alert is acknowledged or dismissed. */
  onSent: () => void;
  style?: StyleProp<ViewStyle>;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSent,
  style,
}) => {
  const { values, setField, errors, generalError, loading, submit } =
    useAuthForm<ForgotPasswordFormValues>({
      initialValues: { userEmail: "" },
      schema: forgotPasswordSchema,
      fallbackErrorKey: "errors.passwordResetFailed",
      onValid: async ({ userEmail }) => {
        unwrapOrThrow(await sendPasswordReset(userEmail));
        Alert.alert(
          translate("forgotPasswordScreen.forgotPasswordAlert.title"),
          translate("forgotPasswordScreen.forgotPasswordAlert.message"),
          [{ text: translate("buttons.ok"), onPress: onSent }],
          { cancelable: true, onDismiss: onSent },
        );
      },
    });

  return (
    <View style={[styles.container, style]}>
      <EmailField
        value={values.userEmail}
        onChangeText={(v) => setField("userEmail", v)}
        error={errors.userEmail}
        editable={!loading}
        returnKeyType="done"
        onSubmitEditing={submit}
      />

      {generalError ? (
        <Text style={formStyles.generalError}>{generalError}</Text>
      ) : null}

      <View style={styles.buttonContainer}>
        <MainButton
          variant="primary"
          title={translate("buttons.submit")}
          onPress={submit}
          isDisabled={loading}
        />
      </View>

      {loading && <LoadingOverlay />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 4,
  },
});

export default ForgotPasswordForm;
