import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import MainButton from "../../../components/MainButton";
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
  return (
    <Modal
      visible={visible}
      transparent
      presentationStyle="overFullScreen"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={() => {}}>
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
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: colors.light.surface,
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
