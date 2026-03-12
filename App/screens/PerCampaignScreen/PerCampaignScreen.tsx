import { useRoute } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, textStyles } from "../../theme";
import { translate } from "../../translation";
import type { CampaignDetailId } from "../../types/campaigns";
import { getCampaignBlocks } from "../CampaignScreen/data/campaignStructure";
import BlockRenderer from "./components/BlockRenderer";
import DetailModal from "./components/DetailModal";

const PerCampaignScreen: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const [detailModalId, setDetailModalId] = useState<CampaignDetailId | null>(
    null,
  );

  const blocks = getCampaignBlocks(id);
  const titleKey = `campaigns.byId.${id}.title` as never;

  const handleInternalLinkPress = useCallback((detailId: CampaignDetailId) => {
    setDetailModalId(detailId);
  }, []);

  if (!blocks || blocks.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFoundText}>Campaign not found.</Text>
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
  notFoundText: {
    ...textStyles.body,
    color: colors.light.textPrimary,
    padding: 16,
  },
});

export default PerCampaignScreen;
