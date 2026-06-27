import React, { useRef } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useDispatch } from "react-redux";
import { useAuthForm } from "../../hooks/useAuthForm";
import { loginUserThunk } from "../../redux/features/userSlice/userThunks";
import type { AppDispatch } from "../../redux/store/store";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation";
import { loginSchema, type LoginFormValues } from "../../validation/authSchema";
import LoadingOverlay from "../LoadingOverlay";
import MainButton from "../MainButton";
import EmailField from "../forms/EmailField";
import PasswordField from "../forms/PasswordField";
import { formStyles } from "../forms/formStyles";

interface LoginFormProps {
  onSuccess: () => void;
  /** When provided, an inline "Forgot password?" link is shown. */
  onForgotPassword?: () => void;
  style?: StyleProp<ViewStyle>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onForgotPassword,
  style,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const passwordRef = useRef<TextInput | null>(null);

  const { values, setField, errors, generalError, loading, submit } =
    useAuthForm<LoginFormValues>({
      initialValues: { userEmail: "", userPassword: "" },
      schema: loginSchema,
      fallbackErrorKey: "errors.loginFailed",
      onValid: async ({ userEmail, userPassword }) => {
        await dispatch(
          loginUserThunk({ email: userEmail, password: userPassword }),
        ).unwrap();
        onSuccess();
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
        autoComplete="password"
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

      {onForgotPassword ? (
        <TouchableOpacity
          onPress={onForgotPassword}
          style={styles.forgotPasswordRow}
        >
          <Text style={styles.forgotPasswordText}>
            {translate("authModal.forgotPassword")}
          </Text>
        </TouchableOpacity>
      ) : null}

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
  forgotPasswordRow: {
    alignItems: "center",
    paddingVertical: 4,
  },
  forgotPasswordText: {
    ...textStyles.bodySmall,
    color: colors.light.secondary,
  },
});

export default LoginForm;
