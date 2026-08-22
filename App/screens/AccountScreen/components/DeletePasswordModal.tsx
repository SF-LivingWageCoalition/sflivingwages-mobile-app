import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MainButton from "../../../components/MainButton";
import LoadingOverlay from "../../../components/LoadingOverlay";
import PasswordField from "../../../components/forms/PasswordField";
import { colors } from "../../../theme";
import { textStyles } from "../../../theme/fontStyles";
import { translate } from "../../../translation";

type DeletePasswordModalProps = {
  visible: boolean;
  password: string;
  deletingAccount: boolean;
  onChangePassword: (text: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

const DeletePasswordModal: React.FC<DeletePasswordModalProps> = ({
  visible,
  password,
  deletingAccount,
  onChangePassword,
  onClose,
  onSubmit,
}) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleBackdropPress = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
      return;
    }

    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      presentationStyle="overFullScreen"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={handleBackdropPress}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoid}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.modalContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.modalTitle}>
                {translate("accountScreen.deleteAccountPasswordPrompt.title")}
              </Text>
              <Text style={styles.modalMessage}>
                {translate("accountScreen.deleteAccountPasswordPrompt.message")}
              </Text>

              <PasswordField
                value={password}
                onChangeText={onChangePassword}
                editable={!deletingAccount}
                label={translate("inputs.password")}
              />

              <View style={styles.modalActions}>
                <MainButton
                  variant="clear"
                  title={translate("buttons.cancel")}
                  onPress={onClose}
                  isDisabled={deletingAccount}
                  style={styles.modalActionButton}
                />
                <MainButton
                  variant="primary"
                  title={translate("buttons.deleteAccount")}
                  onPress={onSubmit}
                  isDisabled={deletingAccount}
                  style={styles.modalActionButton}
                />
              </View>
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>

      {deletingAccount && <LoadingOverlay />}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  keyboardAvoid: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: colors.light.surface,
  },
  modalContent: {
    padding: 16,
  },
  modalTitle: {
    ...textStyles.h4,
    color: colors.light.textPrimary,
    marginBottom: 8,
  },
  modalMessage: {
    ...textStyles.body,
    color: colors.light.textSecondary,
    marginBottom: 12,
  },
  modalActions: {
    marginTop: 14,
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  modalActionButton: {
    flex: 1,
  },
});

export default DeletePasswordModal;
