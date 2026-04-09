/**
 * Structured campaign content: block types and detail mapping.
 * All user-visible strings live in i18n (campaigns.en.ts / campaigns.es.ts).
 */

/** Stable detail ids for in-app "Read more" content (campaigns.details.<detailId>) */
export const CAMPAIGN_DETAIL_IDS = [
  "mco-wage-increase-nonprofits",
  "support-heroes-act",
  "stopping-mass-incarceration",
  "ban-the-box",
  "dignity-campaign",
  "stopping-tps-cancellation",
  "community-jobs-program",
  "save-the-post-office",
  "fight-for-15-union",
  "pass-pro-act",
  "rethink-trade",
  "crusading-labor-lawyer",
  "organizing-union-welfare-to-work",
] as const;

export type CampaignDetailId = (typeof CAMPAIGN_DETAIL_IDS)[number];

/** One numbered row: body text plus an inline link (same row, wraps naturally). */
export type OrderedListWithLinksItem = {
  textKey: string;
  link:
    | { kind: "external"; url: string; labelKey: string }
    | { kind: "internal"; detailId: CampaignDetailId; labelKey: string };
};

export type CampaignContentBlock =
  | { type: "heading"; level: 2 | 3; key: string }
  | { type: "paragraph"; key: string }
  | { type: "linkInternal"; detailId: CampaignDetailId; labelKey: string }
  | { type: "linkExternal"; url: string; labelKey: string }
  | { type: "hr" }
  | { type: "orderedList"; itemKeys: string[] }
  | { type: "orderedListWithLinks"; items: OrderedListWithLinksItem[] };

export type CampaignStructure = {
  id: number;
  blocks: CampaignContentBlock[];
};
