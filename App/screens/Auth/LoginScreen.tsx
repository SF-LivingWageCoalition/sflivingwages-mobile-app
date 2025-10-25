// See `App/api/auth/README.md` for examples and error handling patterns.
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store/store";
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
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation";
import { LoginScreenProps } from "../../types/types";
import { loginUser, unwrapOrThrow, ApiError } from "../../api/auth/authApi";
import { mapApiErrorToMessage } from "./errorHelpers";

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();

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
      console.log(
        `LoginScreen: Trying to login user with email: '${userEmail}' and password: '${userPassword}'`
      );
      setLoading(true);
      try {
        const validatedData = unwrapOrThrow(
          await loginUser(userEmail, userPassword, dispatch)
        );
        console.log("LoginScreen: Login successful.");
        console.log(
          "LoginScreen: Received validatedData:\n",
          JSON.stringify(validatedData, null, 2)
        );
        navigation.goBack();
      } catch (error: unknown) {
        console.error("LoginScreen: Unexpected error during login:", error);
        const message = mapApiErrorToMessage(error, "errors.loginFailed");
        setGeneralError(message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
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
                onChangeText={(userEmailInput) => setUserEmail(userEmailInput)}
                value={userEmail}
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

            {generalError ? (
              <View>
                <Text style={styles.generalError}>{generalError}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>

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
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordToggle: {
    padding: 10,
    position: "absolute",
    right: 0,
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
