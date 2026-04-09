import React from "react";
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, textStyles } from "../../../theme";
import { translate } from "../../../translation";
import type {
  CampaignContentBlock,
  CampaignDetailId,
  OrderedListWithLinksItem,
} from "../../../types/campaigns";

/** Same pattern as ContributeScreen.handleOpenURL */
async function openExternalUrl(url: string): Promise<void> {
  const supported = await Linking.canOpenURL(url);
  if (!supported) {
    Alert.alert(
      "Unable to open link",
      "This URL isn't supported on your device.",
    );
    return;
  }
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(
      "Unable to open link",
      "Something went wrong. Please try again.",
    );
  }
}

export type BlockRendererProps = {
  block: CampaignContentBlock;
  onInternalLinkPress: (detailId: CampaignDetailId) => void;
};

function OrderedListLinkRow({
  index,
  item,
  onInternalLinkPress,
}: {
  index: number;
  item: OrderedListWithLinksItem;
  onInternalLinkPress: (detailId: CampaignDetailId) => void;
}) {
  const onLinkPress = () => {
    if (item.link.kind === "external") {
      void openExternalUrl(item.link.url);
    } else {
      onInternalLinkPress(item.link.detailId);
    }
  };

  return (
    <View style={styles.listItem}>
      <Text style={styles.listNumber}>{index + 1}.</Text>
      <Text style={styles.listItemText}>
        {translate(item.textKey as never)}{" "}
        <Text
          accessibilityRole="link"
          style={styles.linkText}
          onPress={onLinkPress}
        >
          {translate(item.link.labelKey as never)}
        </Text>
      </Text>
    </View>
  );
}

function BlockRenderer({ block, onInternalLinkPress }: BlockRendererProps) {
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
          onPress={() => onInternalLinkPress(block.detailId)}
          style={({ pressed }) => [styles.link, pressed && styles.linkPressed]}
        >
          <Text style={styles.linkText}>
            {translate(block.labelKey as never)}
          </Text>
        </Pressable>
      );
    case "linkExternal":
      return (
        <Pressable
          onPress={() => void openExternalUrl(block.url)}
          style={({ pressed }) => [styles.link, pressed && styles.linkPressed]}
        >
          <Text style={styles.linkText}>
            {translate(block.labelKey as never)}
          </Text>
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
    case "orderedListWithLinks":
      return (
        <View style={styles.listContainer}>
          {block.items.map((item, index) => (
            <OrderedListLinkRow
              key={item.textKey}
              index={index}
              item={item}
              onInternalLinkPress={onInternalLinkPress}
            />
          ))}
        </View>
      );
    default: {
      const _: never = block;
      return null;
    }
  }
}

const styles = StyleSheet.create({
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
    alignItems: "flex-start",
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
});

export default BlockRenderer;
