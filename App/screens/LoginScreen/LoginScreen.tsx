// See `App/api/auth/README.md` for examples and error handling patterns.
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store/store";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LoadingOverlay from "../../components/LoadingOverlay";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation";
import {
  createLoginSchema,
  type LoginInput,
} from "../../validation/authValidation";
import { mapZodErrorToFormErrors } from "../../validation/mapZodError";
import { LoginScreenProps } from "../../types/types";
import { loginUser } from "../../api/auth/authApi";
import { unwrapOrThrow } from "../../api/auth/utils";
import { mapApiErrorToMessage } from "../../api/auth/errorHelpers";

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const passwordRef = useRef<TextInput | null>(null);

  const [form, setForm] = useState<LoginInput>({
    userEmail: "",
    userPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    // reset previous errors
    setErrors({});
    setGeneralError(null);

    const schema = createLoginSchema();
    const parsed = schema.safeParse(form);

    if (!parsed.success) {
      const { fieldErrors, generalError: gen } = mapZodErrorToFormErrors(
        parsed.error
      );
      setErrors(fieldErrors);
      if (gen) setGeneralError(gen);
      return;
    }

    // safe to use parsed.data
    const { userEmail: email, userPassword: password } = parsed.data;

    console.log(
      "LoginScreen: Trying to login user with email address and password..."
    );
    setLoading(true);
    /*
      Note: `loginUser(email, password, dispatch)` performs the full
      login flow and will dispatch `setUser(...)` on success. That helper
      normalizes JWT shapes before writing to the store (see
      `App/api/auth/utils.normalizeJwt`).
    */
    try {
      const validatedData = unwrapOrThrow(
        await loginUser(email, password, dispatch)
      );
      console.log("LoginScreen: Login successful.");
      console.log(
        "LoginScreen: Received validatedData:\n",
        JSON.stringify(validatedData, null, 2) // PPI leak check: ensure no sensitive data is logged
      );
      navigation.goBack();
    } catch (error: unknown) {
      console.error("LoginScreen: Unexpected error during login:", error);
      const message = mapApiErrorToMessage(error, "errors.loginFailed");
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
                autoComplete="email"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
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

            <View style={styles.inputContainer}>
              <Text style={styles.inputName}>
                {translate("inputs.password")}
                <Text style={styles.requiredField}>*</Text>
              </Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  ref={passwordRef}
                  style={[styles.textInput, styles.textInputWithToggle]}
                  keyboardType="default"
                  autoComplete="password"
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="done"
                  onSubmitEditing={onSubmit}
                  onChangeText={(userPasswordInput) =>
                    setForm((prev) => ({
                      ...prev,
                      userPassword: userPasswordInput,
                    }))
                  }
                  value={form.userPassword}
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
    flex: 1,
  },
  textInputWithToggle: {
    paddingRight: 48, // leave room for the visibility toggle
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordToggle: {
    padding: 10,
    position: "absolute",
    right: 0,
    height: "100%",
    justifyContent: "center",
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
});

export default LoginScreen;
