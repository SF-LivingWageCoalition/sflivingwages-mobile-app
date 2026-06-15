import { FontAwesome5 } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { loginUser, registerCustomer } from "../../api/auth/authApi";
import { mapApiErrorToMessage } from "../../api/auth/errorHelpers";
import { unwrapOrThrow } from "../../api/auth/utils";
import type { AuthModalProps } from "../../hooks/useAuthGate";
import type { AppDispatch } from "../../redux/store/store";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation";
import {
  loginSchema,
  registerSchema,
  type LoginFormValues,
  type RegisterFormValues,
} from "../../validation/authSchema";
import { mapZodErrorToFormErrors } from "../../validation/mapZodError";
import LoadingOverlay from "../LoadingOverlay";
import MainButton from "../MainButton";

type Tab = "login" | "register";

const AuthModal: React.FC<AuthModalProps> = ({
  visible,
  onClose,
  onSuccess,
  onForgotPassword,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<Tab>("login");

  // ─── Login form state ───────────────────────────────────────────────────────
  const [loginForm, setLoginForm] = useState<LoginFormValues>({
    userEmail: "",
    userPassword: "",
  });
  const [loginErrors, setLoginErrors] = useState<{ [key: string]: string }>({});
  const [loginGeneralError, setLoginGeneralError] = useState<string | null>(
    null,
  );
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const loginPasswordRef = useRef<TextInput | null>(null);

  // ─── Register form state ────────────────────────────────────────────────────
  const [registerForm, setRegisterForm] = useState<RegisterFormValues>({
    userEmail: "",
    userPassword: "",
  });
  const [registerErrors, setRegisterErrors] = useState<{
    [key: string]: string;
  }>({});
  const [registerGeneralError, setRegisterGeneralError] = useState<
    string | null
  >(null);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const registerPasswordRef = useRef<TextInput | null>(null);

  const [loading, setLoading] = useState(false);

  const resetForms = () => {
    setLoginForm({ userEmail: "", userPassword: "" });
    setLoginErrors({});
    setLoginGeneralError(null);
    setShowLoginPassword(false);
    setRegisterForm({ userEmail: "", userPassword: "" });
    setRegisterErrors({});
    setRegisterGeneralError(null);
    setShowRegisterPassword(false);
    setActiveTab("login");
  };

  const handleClose = () => {
    resetForms();
    onClose();
  };

  // ─── Login submit ───────────────────────────────────────────────────────────
  const onLoginSubmit = async () => {
    setLoginErrors({});
    setLoginGeneralError(null);

    const schema = loginSchema();
    const parsed = schema.safeParse(loginForm);
    if (!parsed.success) {
      const { fieldErrors, generalError: gen } = mapZodErrorToFormErrors(
        parsed.error,
      );
      setLoginErrors(fieldErrors);
      if (gen) setLoginGeneralError(gen);
      return;
    }

    const { userEmail: email, userPassword: password } = parsed.data;
    setLoading(true);
    try {
      unwrapOrThrow(await loginUser(email, password, dispatch));
      resetForms();
      onSuccess();
    } catch (error: unknown) {
      const message = mapApiErrorToMessage(error, "errors.loginFailed");
      setLoginGeneralError(message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Register submit ────────────────────────────────────────────────────────
  const onRegisterSubmit = async () => {
    setRegisterErrors({});
    setRegisterGeneralError(null);

    const schema = registerSchema();
    const parsed = schema.safeParse(registerForm);
    if (!parsed.success) {
      const { fieldErrors, generalError: gen } = mapZodErrorToFormErrors(
        parsed.error,
      );
      setRegisterErrors(fieldErrors);
      if (gen) setRegisterGeneralError(gen);
      return;
    }

    const { userEmail: email, userPassword: password } = parsed.data;
    setLoading(true);
    try {
      unwrapOrThrow(await registerCustomer(email, password));
      Alert.alert(
        translate("registerScreen.registerAlert.title"),
        translate("registerScreen.registerAlert.message"),
        [
          {
            text: translate("buttons.ok"),
            onPress: () => setActiveTab("login"),
          },
        ],
        { cancelable: true, onDismiss: () => setActiveTab("login") },
      );
      setRegisterForm({ userEmail: "", userPassword: "" });
      setRegisterErrors({});
      setRegisterGeneralError(null);
    } catch (error: unknown) {
      const message = mapApiErrorToMessage(error, "errors.registrationFailed");
      setRegisterGeneralError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={handleClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoid}
        >
          <Pressable style={styles.sheet} onPress={() => {}}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>
                {translate("authModal.title")}
              </Text>
              <TouchableOpacity
                onPress={handleClose}
                accessibilityLabel={translate("buttons.close")}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <FontAwesome5
                  name="times"
                  size={18}
                  color={colors.light.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* Tab bar */}
            <View style={styles.tabBar}>
              <TouchableOpacity
                style={[styles.tab, activeTab === "login" && styles.tabActive]}
                onPress={() => setActiveTab("login")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "login" && styles.tabTextActive,
                  ]}
                >
                  {translate("authModal.loginTab")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "register" && styles.tabActive,
                ]}
                onPress={() => setActiveTab("register")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "register" && styles.tabTextActive,
                  ]}
                >
                  {translate("authModal.registerTab")}
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {activeTab === "login" ? (
                <View>
                  {/* Email */}
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
                      onSubmitEditing={() => loginPasswordRef.current?.focus()}
                      onChangeText={(v) =>
                        setLoginForm((prev) => ({ ...prev, userEmail: v }))
                      }
                      value={loginForm.userEmail}
                      editable={!loading}
                    />
                    {loginErrors.userEmail ? (
                      <Text style={styles.inputError}>
                        {loginErrors.userEmail}
                      </Text>
                    ) : null}
                  </View>

                  {/* Password */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputName}>
                      {translate("inputs.password")}
                      <Text style={styles.requiredField}>*</Text>
                    </Text>
                    <View style={styles.passwordRow}>
                      <TextInput
                        ref={loginPasswordRef}
                        style={[styles.textInput, styles.passwordInput]}
                        autoComplete="password"
                        autoCorrect={false}
                        autoCapitalize="none"
                        returnKeyType="done"
                        onSubmitEditing={onLoginSubmit}
                        onChangeText={(v) =>
                          setLoginForm((prev) => ({ ...prev, userPassword: v }))
                        }
                        value={loginForm.userPassword}
                        editable={!loading}
                        secureTextEntry={!showLoginPassword}
                      />
                      <TouchableOpacity
                        onPress={() => setShowLoginPassword((p) => !p)}
                        style={styles.eyeToggle}
                      >
                        <FontAwesome5
                          name={showLoginPassword ? "eye-slash" : "eye"}
                          color="gray"
                          size={18}
                        />
                      </TouchableOpacity>
                    </View>
                    {loginErrors.userPassword ? (
                      <Text style={styles.inputError}>
                        {loginErrors.userPassword}
                      </Text>
                    ) : null}
                  </View>

                  {loginGeneralError ? (
                    <Text style={styles.generalError}>{loginGeneralError}</Text>
                  ) : null}

                  <View style={styles.buttonRow}>
                    <MainButton
                      variant="primary"
                      title={translate("buttons.submit")}
                      onPress={onLoginSubmit}
                      isDisabled={loading}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      resetForms();
                      onForgotPassword();
                    }}
                    style={styles.forgotPasswordRow}
                  >
                    <Text style={styles.forgotPasswordText}>
                      {translate("authModal.forgotPassword")}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  {/* Email */}
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
                      onSubmitEditing={() =>
                        registerPasswordRef.current?.focus()
                      }
                      onChangeText={(v) =>
                        setRegisterForm((prev) => ({ ...prev, userEmail: v }))
                      }
                      value={registerForm.userEmail}
                      editable={!loading}
                    />
                    {registerErrors.userEmail ? (
                      <Text style={styles.inputError}>
                        {registerErrors.userEmail}
                      </Text>
                    ) : null}
                  </View>

                  {/* Password */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputName}>
                      {translate("inputs.password")}
                      <Text style={styles.requiredField}>*</Text>
                    </Text>
                    <View style={styles.passwordRow}>
                      <TextInput
                        ref={registerPasswordRef}
                        style={[styles.textInput, styles.passwordInput]}
                        autoComplete="new-password"
                        autoCorrect={false}
                        autoCapitalize="none"
                        returnKeyType="done"
                        onSubmitEditing={onRegisterSubmit}
                        onChangeText={(v) =>
                          setRegisterForm((prev) => ({
                            ...prev,
                            userPassword: v,
                          }))
                        }
                        value={registerForm.userPassword}
                        editable={!loading}
                        secureTextEntry={!showRegisterPassword}
                      />
                      <TouchableOpacity
                        onPress={() => setShowRegisterPassword((p) => !p)}
                        style={styles.eyeToggle}
                      >
                        <FontAwesome5
                          name={showRegisterPassword ? "eye-slash" : "eye"}
                          color="gray"
                          size={18}
                        />
                      </TouchableOpacity>
                    </View>
                    {registerErrors.userPassword ? (
                      <Text style={styles.inputError}>
                        {registerErrors.userPassword}
                      </Text>
                    ) : null}
                    <Text style={styles.passwordHint}>
                      {translate("registerScreen.passwordRequirements")}
                    </Text>
                  </View>

                  {registerGeneralError ? (
                    <Text style={styles.generalError}>
                      {registerGeneralError}
                    </Text>
                  ) : null}

                  <View style={styles.buttonRow}>
                    <MainButton
                      variant="primary"
                      title={translate("buttons.submit")}
                      onPress={onRegisterSubmit}
                      isDisabled={loading}
                    />
                  </View>
                </View>
              )}
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>

      {loading && <LoadingOverlay />}
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.light.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === "ios" ? 36 : 24,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerTitle: {
    ...textStyles.h3,
    color: colors.light.textPrimary,
  },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.light.divider,
    marginHorizontal: 20,
    marginBottom: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.light.primary,
  },
  tabText: {
    ...textStyles.bodyBold,
    color: colors.light.textSecondary,
  },
  tabTextActive: {
    color: colors.light.primary,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputName: {
    ...textStyles.label,
    marginBottom: 6,
  },
  requiredField: {
    color: colors.light.primary,
  },
  textInput: {
    height: 42,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.primary,
    paddingHorizontal: 4,
    color: colors.light.textPrimary,
    ...textStyles.body,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
  },
  eyeToggle: {
    paddingLeft: 10,
    paddingVertical: 4,
  },
  inputError: {
    ...textStyles.caption,
    color: colors.light.error,
    marginTop: 4,
  },
  generalError: {
    ...textStyles.caption,
    color: colors.light.error,
    marginBottom: 8,
    textAlign: "center",
  },
  passwordHint: {
    ...textStyles.caption,
    color: colors.light.textSecondary,
    marginTop: 6,
  },
  buttonRow: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 4,
  },
  forgotPasswordRow: {
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 4,
  },
  forgotPasswordText: {
    ...textStyles.bodySmall,
    color: colors.light.secondary,
  },
});

export default AuthModal;
