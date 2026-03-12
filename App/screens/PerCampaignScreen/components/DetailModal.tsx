import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Modal,
  useWindowDimensions,
} from "react-native";
import { colors, textStyles } from "../../../theme";
import { translate } from "../../../translation";
import type { CampaignDetailId } from "../../../types/campaigns";

export type DetailModalProps = {
  detailId: CampaignDetailId | null;
  onClose: () => void;
};

function DetailModal({ detailId, onClose }: DetailModalProps) {
  const { width } = useWindowDimensions();
  if (!detailId) return null;

  const nameKey = `campaigns.details.${detailId}.name` as never;
  const contentKey = `campaigns.details.${detailId}.content` as never;
  const content2Key = `campaigns.details.${detailId}.content2` as never;

  const content2Raw = translate<string>(content2Key);
  const content2 =
    typeof content2Raw === "string" &&
    content2Raw.length > 0 &&
    !content2Raw.startsWith("campaigns.")
      ? content2Raw
      : undefined;

  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable
          style={[styles.modalContent, { width: Math.min(width - 32, 480) }]}
          onPress={(e) => e.stopPropagation()}
        >
          <ScrollView
            style={styles.modalScroll}
            contentContainerStyle={styles.modalScrollContent}
            showsVerticalScrollIndicator={true}
          >
            <Text style={styles.detailTitle}>{translate(nameKey)}</Text>
            <Text style={styles.detailBody}>{translate(contentKey)}</Text>
            {content2 ? (
              <Text style={[styles.detailBody, styles.detailBodySecond]}>
                {content2}
              </Text>
            ) : null}
          </ScrollView>
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.modalCloseButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.modalCloseText}>Close</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: colors.light.surface,
    borderRadius: 12,
    maxHeight: "85%",
    overflow: "hidden",
  },
  modalScroll: { maxHeight: "100%" },
  modalScrollContent: { padding: 20, paddingBottom: 16 },
  detailTitle: {
    ...textStyles.h4,
    color: colors.light.primaryDark,
    marginBottom: 12,
  },
  detailBody: {
    ...textStyles.body,
    color: colors.light.textPrimary,
    lineHeight: 22,
  },
  detailBodySecond: { marginTop: 12 },
  modalCloseButton: {
    padding: 14,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.light.surfaceVariant,
  },
  pressed: { opacity: 0.7 },
  modalCloseText: {
    ...textStyles.body,
    color: colors.light.primary,
    fontWeight: "600",
  },
});

export default DetailModal;
