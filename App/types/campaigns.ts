/**
 * Structured campaign content: block types and detail mapping.
 * All user-visible strings live in i18n (campaigns.en.ts / campaigns.es.ts).
 */

export type CampaignContentBlock =
  | { type: "heading"; level: 2 | 3; key: string }
  | { type: "paragraph"; key: string }
  | { type: "linkInternal"; detailId: string; labelKey: string }
  | { type: "linkExternal"; url: string; labelKey: string }
  | { type: "hr" }
  | { type: "orderedList"; itemKeys: string[] };

export type CampaignStructure = {
  id: number;
  blocks: CampaignContentBlock[];
};

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

/**
 * Map from campaignData.details[].name (section heading) to detailId.
 * Used when building campaign structure: "Read more" links that match a key
 * become linkInternal; others stay linkExternal.
 */
export const DETAIL_NAME_TO_ID: Record<string, CampaignDetailId> = {
  "a. Campaign for City Funding for MCO Wage Increase for Non-profits":
    "mco-wage-increase-nonprofits",
  "b. Support the Heroes Act": "support-heroes-act",
  "a. Stopping Mass Incarceration and Use of Prison Labor":
    "stopping-mass-incarceration",
  "b. Ban the Box Campaign to End Lifetime Discrimination of Formerly Incarcerated or Convicted People":
    "ban-the-box",
  "a. Dignity Campaign": "dignity-campaign",
  "b. Stopping the Cancellation of Temporary Protected Status":
    "stopping-tps-cancellation",
  "a. Campaign for a Community Jobs Program": "community-jobs-program",
  "c. Fight for $15 and the Right to a Union Without Retaliation":
    "fight-for-15-union",
  "d. Put pressure on Senators to pass the PRO Act": "pass-pro-act",
  "a. Rethink Trade": "rethink-trade",
  "b. Crusading Labor Lawyer Freed from Jail on Conditions to Chill Organizing":
    "crusading-labor-lawyer",
  "b. Organizing a Union of Welfare-to-Work Program Participants":
    "organizing-union-welfare-to-work",
  "b. Campaign to Save the U.S. Postal Service": "save-the-post-office",
};
