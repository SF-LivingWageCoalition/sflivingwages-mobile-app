import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { AuthModalProps } from "../../hooks/useAuthGate";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation";
import AuthTabs, { type AuthTab } from "../auth/AuthTabs";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

const AuthModal: React.FC<AuthModalProps> = ({
  visible,
  onClose,
  onSuccess,
  onForgotPassword,
}) => {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");

  const handleClose = () => {
    setActiveTab("login");
    onClose();
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

            <AuthTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              style={styles.tabBar}
            />

            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {activeTab === "login" ? (
                <LoginForm
                  key={visible ? "login-open" : "login-closed"}
                  onSuccess={onSuccess}
                  onForgotPassword={onForgotPassword}
                />
              ) : (
                <RegisterForm
                  key={visible ? "register-open" : "register-closed"}
                  onRegistered={() => setActiveTab("login")}
                />
              )}
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
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
    marginHorizontal: 20,
    marginBottom: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
});

export default AuthModal;
