import React, { useRef } from "react";
import {
  Alert,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { registerCustomer } from "../../api/auth/authApi";
import { unwrapOrThrow } from "../../api/auth/utils";
import { useAuthForm } from "../../hooks/useAuthForm";
import { formStyles } from "../../theme/formStyles";
import { translate } from "../../translation";
import {
  registerSchema,
  type RegisterFormValues,
} from "../../validation/authSchema";
import LoadingOverlay from "../LoadingOverlay";
import MainButton from "../MainButton";
import EmailField from "../forms/EmailField";
import PasswordField from "../forms/PasswordField";

interface RegisterFormProps {
  /** Called after the success alert is acknowledged or dismissed. */
  onRegistered: () => void;
  style?: StyleProp<ViewStyle>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegistered, style }) => {
  const passwordRef = useRef<TextInput | null>(null);

  const { values, setField, errors, generalError, loading, submit } =
    useAuthForm<RegisterFormValues>({
      initialValues: { userEmail: "", userPassword: "" },
      schema: registerSchema,
      fallbackErrorKey: "errors.registrationFailed",
      onValid: async ({ userEmail, userPassword }) => {
        unwrapOrThrow(await registerCustomer(userEmail, userPassword));
        Alert.alert(
          translate("registerScreen.registerAlert.title"),
          translate("registerScreen.registerAlert.message"),
          [{ text: translate("buttons.ok"), onPress: onRegistered }],
          { cancelable: true, onDismiss: onRegistered },
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
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />

      <PasswordField
        inputRef={passwordRef}
        value={values.userPassword}
        onChangeText={(v) => setField("userPassword", v)}
        error={errors.userPassword}
        editable={!loading}
        autoComplete="new-password"
        returnKeyType="done"
        onSubmitEditing={submit}
        hint={translate("registerScreen.passwordRequirements")}
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

export default RegisterForm;
