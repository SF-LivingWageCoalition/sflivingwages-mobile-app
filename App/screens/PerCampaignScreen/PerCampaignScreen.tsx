import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Modal,
  Linking,
  useWindowDimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { colors, textStyles } from "../../theme";
import { translate } from "../../translation";
import { getCampaignBlocks } from "../CampaignScreen/data/campaignStructure";
import type { CampaignContentBlock } from "../../types/campaigns";
import type { CampaignDetailId } from "../../types/campaigns";

function BlockRenderer({
  block,
  onInternalLinkPress,
}: {
  block: CampaignContentBlock;
  onInternalLinkPress: (detailId: CampaignDetailId) => void;
}) {
  switch (block.type) {
    case "heading":
      return (
        <Text
          style={[
            block.level === 2 ? styles.heading2 : styles.heading3,
            styles.blockSpacing,
          ]}
        >
          {translate(block.key as never)}
        </Text>
      );
    case "paragraph":
      return (
        <Text style={[styles.paragraph, styles.blockSpacing]}>
          {translate(block.key as never)}
        </Text>
      );
    case "linkInternal":
      return (
        <Pressable
          onPress={() => onInternalLinkPress(block.detailId as CampaignDetailId)}
          style={({ pressed }) => [styles.link, pressed && styles.linkPressed]}
        >
          <Text style={styles.linkText}>{translate(block.labelKey as never)}</Text>
        </Pressable>
      );
    case "linkExternal":
      return (
        <Pressable
          onPress={() => Linking.openURL(block.url)}
          style={({ pressed }) => [styles.link, pressed && styles.linkPressed]}
        >
          <Text style={styles.linkText}>{translate(block.labelKey as never)}</Text>
        </Pressable>
      );
    case "hr":
      return <View style={styles.hr} />;
    case "orderedList":
      return (
        <View style={styles.listContainer}>
          {block.itemKeys.map((itemKey, index) => (
            <View key={itemKey} style={styles.listItem}>
              <Text style={styles.listNumber}>{index + 1}.</Text>
              <Text style={styles.listItemText}>
                {translate(itemKey as never)}
              </Text>
            </View>
          ))}
        </View>
      );
    default: {
      const _: never = block;
      return null;
    }
  }
}

function DetailModal({
  detailId,
  onClose,
}: {
  detailId: CampaignDetailId | null;
  onClose: () => void;
}) {
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
              pressed && styles.linkPressed,
            ]}
          >
            <Text style={styles.modalCloseText}>Close</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const PerCampaignScreen: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const [detailModalId, setDetailModalId] = useState<CampaignDetailId | null>(
    null
  );

  const blocks = getCampaignBlocks(id);
  const titleKey = `campaigns.byId.${id}.title` as never;

  const handleInternalLinkPress = useCallback((detailId: CampaignDetailId) => {
    setDetailModalId(detailId);
  }, []);

  if (!blocks || blocks.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Campaign not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>{translate(titleKey)}</Text>
        {blocks.map((block, index) => (
          <BlockRenderer
            key={index}
            block={block}
            onInternalLinkPress={handleInternalLinkPress}
          />
        ))}
      </ScrollView>
      <DetailModal
        detailId={detailModalId}
        onClose={() => setDetailModalId(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },
  title: {
    ...textStyles.h3,
    color: colors.light.primaryDark,
    textAlign: "left",
    marginBottom: 16,
  },
  blockSpacing: { marginBottom: 12 },
  heading2: {
    ...textStyles.h4,
    color: colors.light.primaryDark,
    marginTop: 8,
  },
  heading3: {
    ...textStyles.h5,
    color: colors.light.primaryDark,
    marginTop: 8,
  },
  paragraph: {
    ...textStyles.body,
    color: colors.light.textPrimary,
    lineHeight: 22,
  },
  link: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  linkPressed: { opacity: 0.7 },
  linkText: {
    ...textStyles.body,
    color: colors.light.primary,
    textDecorationLine: "underline",
  },
  hr: {
    height: 1,
    backgroundColor: colors.light.surfaceVariant,
    marginVertical: 16,
  },
  listContainer: { marginBottom: 12 },
  listItem: {
    flexDirection: "row",
    marginBottom: 6,
    paddingLeft: 4,
  },
  listNumber: {
    ...textStyles.body,
    color: colors.light.textPrimary,
    marginRight: 6,
    minWidth: 20,
  },
  listItemText: {
    ...textStyles.body,
    color: colors.light.textPrimary,
    flex: 1,
    lineHeight: 22,
  },
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
  modalCloseText: {
    ...textStyles.body,
    color: colors.light.primary,
    fontWeight: "600",
  },
});

export default PerCampaignScreen;
