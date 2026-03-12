/**
 * Campaign structure: ids and block arrays. All copy lives in i18n (campaigns.en / campaigns.es).
 * Keys reference translate('campaigns.byId.<id>....').
 */
import type { CampaignContentBlock } from "../../../types/campaigns";

export const CAMPAIGN_IDS: number[] = [1, 2, 3, 4, 5, 6];

const campaign1Blocks: CampaignContentBlock[] = [
  { type: "paragraph", key: "campaigns.byId.1.published" },
  { type: "heading", level: 3, key: "campaigns.byId.1.sections.0.heading" },
  { type: "paragraph", key: "campaigns.byId.1.sections.0.body" },
  {
    type: "linkInternal",
    detailId: "community-jobs-program",
    labelKey: "campaigns.byId.1.sections.0.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.1.sections.1.heading" },
  { type: "paragraph", key: "campaigns.byId.1.sections.1.body" },
  {
    type: "linkInternal",
    detailId: "organizing-union-welfare-to-work",
    labelKey: "campaigns.byId.1.sections.1.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.1.sections.2.heading" },
  { type: "paragraph", key: "campaigns.byId.1.sections.2.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/transform-welfare-to-work-programs/welfare-reform-act-of-1996/",
    labelKey: "campaigns.byId.1.sections.2.linkLabel",
  },
];

const campaign2Blocks: CampaignContentBlock[] = [
  { type: "paragraph", key: "campaigns.byId.2.published" },
  { type: "paragraph", key: "campaigns.byId.2.intro" },
  { type: "hr" },
  { type: "heading", level: 3, key: "campaigns.byId.2.sections.0.heading" },
  { type: "paragraph", key: "campaigns.byId.2.sections.0.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/protect-public-sector-jobs/starbucks-baristas-stage-red-cup-rebellion/",
    labelKey: "campaigns.byId.2.sections.0.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.2.sections.1.heading" },
  { type: "paragraph", key: "campaigns.byId.2.sections.1.body" },
  {
    type: "linkInternal",
    detailId: "save-the-post-office",
    labelKey: "campaigns.byId.2.sections.1.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.2.sections.2.heading" },
  { type: "paragraph", key: "campaigns.byId.2.sections.2.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/amazon-workers-battle-the-coporate-giant/",
    labelKey: "campaigns.byId.2.sections.2.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.2.sections.3.heading" },
  { type: "paragraph", key: "campaigns.byId.2.sections.3.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/retaliation-for-union-organizing/",
    labelKey: "campaigns.byId.2.sections.3.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.2.sections.4.heading" },
  { type: "paragraph", key: "campaigns.byId.2.sections.4.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/gig-workers-organizing/",
    labelKey: "campaigns.byId.2.sections.4.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.2.sections.5.heading" },
  { type: "paragraph", key: "campaigns.byId.2.sections.5.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/protect-public-sector-jobs/teslas-resistance-to-union-efforts/",
    labelKey: "campaigns.byId.2.sections.5.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.2.sections.6.heading" },
  { type: "paragraph", key: "campaigns.byId.2.sections.6.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/big-tech-employees-quiet-about-election-this-time/",
    labelKey: "campaigns.byId.2.sections.6.linkLabel",
  },
  { type: "hr" },
  { type: "heading", level: 2, key: "campaigns.byId.2.actionStepsTitle" },
  {
    type: "orderedList",
    itemKeys: [
      "campaigns.byId.2.actionStepsItems.0",
      "campaigns.byId.2.actionStepsItems.1",
    ],
  },
  {
    type: "linkExternal",
    url: "https://actionnetwork.org/letters/pass-the-protecting-the-right-to-organize-pro-act?source=direct_link&",
    labelKey: "campaigns.byId.2.actionStepsLinkLabels.0",
  },
  { type: "heading", level: 2, key: "campaigns.byId.2.additionalMaterialsTitle" },
  {
    type: "orderedList",
    itemKeys: [
      "campaigns.byId.2.additionalMaterialsItems.0",
      "campaigns.byId.2.additionalMaterialsItems.1",
      "campaigns.byId.2.additionalMaterialsItems.2",
      "campaigns.byId.2.additionalMaterialsItems.3",
      "campaigns.byId.2.additionalMaterialsItems.4",
    ],
  },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/protect-public-sector-jobs/starbucks-workers-organize/",
    labelKey: "campaigns.byId.2.additionalMaterialsLinkLabels.0",
  },
  {
    type: "linkExternal",
    url: "https://livingwage-sf.org/put-pressure-on-senators-to-pass-the-pro-act/",
    labelKey: "campaigns.byId.2.additionalMaterialsLinkLabels.1",
  },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/protect-public-sector-jobs/campaign-to-save-the-u-s-postal-service/",
    labelKey: "campaigns.byId.2.additionalMaterialsLinkLabels.2",
  },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/save-the-us-postal-service/",
    labelKey: "campaigns.byId.2.additionalMaterialsLinkLabels.3",
  },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/dock-workers-strike/",
    labelKey: "campaigns.byId.2.additionalMaterialsLinkLabels.4",
  },
];

const campaign3Blocks: CampaignContentBlock[] = [
  { type: "paragraph", key: "campaigns.byId.3.intro" },
  { type: "hr" },
  { type: "heading", level: 3, key: "campaigns.byId.3.sections.0.heading" },
  { type: "paragraph", key: "campaigns.byId.3.sections.0.body" },
  {
    type: "linkInternal",
    detailId: "stopping-mass-incarceration",
    labelKey: "campaigns.byId.3.sections.0.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.3.sections.1.heading" },
  { type: "paragraph", key: "campaigns.byId.3.sections.1.body" },
  {
    type: "linkInternal",
    detailId: "ban-the-box",
    labelKey: "campaigns.byId.3.sections.1.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.3.sections.2.heading" },
  { type: "paragraph", key: "campaigns.byId.3.sections.2.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/elementor-20991/",
    labelKey: "campaigns.byId.3.sections.2.linkLabel",
  },
  { type: "hr" },
  { type: "heading", level: 2, key: "campaigns.byId.3.actionStepsTitle" },
  {
    type: "orderedList",
    itemKeys: [
      "campaigns.byId.3.actionStepsItems.0",
      "campaigns.byId.3.actionStepsItems.1",
    ],
  },
  {
    type: "linkExternal",
    url: "https://livingwage-sf.org/mass-incarceration/divesting-from-mass-incarceration/",
    labelKey: "campaigns.byId.3.actionStepsLinkLabels.0",
  },
  {
    type: "linkExternal",
    url: "https://livingwage-sf.org/file-fco-complaint/",
    labelKey: "campaigns.byId.3.actionStepsLinkLabels.1",
  },
  { type: "heading", level: 2, key: "campaigns.byId.3.additionalMaterialsTitle" },
  {
    type: "orderedList",
    itemKeys: [
      "campaigns.byId.3.additionalMaterialsItems.0",
      "campaigns.byId.3.additionalMaterialsItems.1",
      "campaigns.byId.3.additionalMaterialsItems.2",
    ],
  },
  {
    type: "linkExternal",
    url: "https://livingwage-sf.org/mass-incarceration/wages-of-formerly-incarcerated-people/",
    labelKey: "campaigns.byId.3.additionalMaterialsLinkLabels.0",
  },
  {
    type: "linkExternal",
    url: "https://livingwage-sf.org/mass-incarceration/incarcerated-women/",
    labelKey: "campaigns.byId.3.additionalMaterialsLinkLabels.1",
  },
  {
    type: "linkExternal",
    url: "https://livingwage-sf.org/mass-incarceration/ban-the-box/",
    labelKey: "campaigns.byId.3.additionalMaterialsLinkLabels.2",
  },
];

const campaign4Blocks: CampaignContentBlock[] = [
  { type: "paragraph", key: "campaigns.byId.4.intro" },
  { type: "hr" },
  { type: "heading", level: 3, key: "campaigns.byId.4.sections.0.heading" },
  { type: "paragraph", key: "campaigns.byId.4.sections.0.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/immigrants-in-the-shadows-of-the-crackdown/",
    labelKey: "campaigns.byId.4.sections.0.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.4.sections.1.heading" },
  { type: "paragraph", key: "campaigns.byId.4.sections.1.body" },
  {
    type: "linkInternal",
    detailId: "dignity-campaign",
    labelKey: "campaigns.byId.4.sections.1.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.4.sections.2.heading" },
  { type: "paragraph", key: "campaigns.byId.4.sections.2.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/immigration-reform/agribusiness-and-a-broken-immigration-system-uses-guest-worker-program-to-drive-down-wages-for-farmworkers/",
    labelKey: "campaigns.byId.4.sections.2.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.4.sections.3.heading" },
  { type: "paragraph", key: "campaigns.byId.4.sections.3.body" },
  {
    type: "linkInternal",
    detailId: "stopping-tps-cancellation",
    labelKey: "campaigns.byId.4.sections.3.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.4.sections.4.heading" },
  { type: "paragraph", key: "campaigns.byId.4.sections.4.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/immigration-activist-detained-by-ice/",
    labelKey: "campaigns.byId.4.sections.4.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.4.sections.5.heading" },
  { type: "paragraph", key: "campaigns.byId.4.sections.5.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/the-future-of-daca-under-the-trump-administration/",
    labelKey: "campaigns.byId.4.sections.5.linkLabel",
  },
  { type: "hr" },
  { type: "heading", level: 2, key: "campaigns.byId.4.actionStepsTitle" },
  {
    type: "orderedList",
    itemKeys: [
      "campaigns.byId.4.actionStepsItems.0",
      "campaigns.byId.4.actionStepsItems.1",
      "campaigns.byId.4.actionStepsItems.2",
    ],
  },
  {
    type: "linkExternal",
    url: "https://www.youtube.com/embed/WEkifI20Sek?rel=0",
    labelKey: "campaigns.byId.4.actionStepsLinkLabels.0",
  },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/know-your-rights/be-ready-for-ice/",
    labelKey: "campaigns.byId.4.actionStepsLinkLabels.1",
  },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/immigration-reform/pledge-of-resistance/",
    labelKey: "campaigns.byId.4.actionStepsLinkLabels.2",
  },
];

const campaign5Blocks: CampaignContentBlock[] = [
  { type: "paragraph", key: "campaigns.byId.5.intro" },
  { type: "hr" },
  { type: "heading", level: 3, key: "campaigns.byId.5.sections.0.heading" },
  { type: "paragraph", key: "campaigns.byId.5.sections.0.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/fair-trade/a-changing-labor-regime-the-rise-of-independent-unions-in-mexico/",
    labelKey: "campaigns.byId.5.sections.0.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.5.sections.1.heading" },
  { type: "paragraph", key: "campaigns.byId.5.sections.1.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/fair-trade/workers-at-vu-manufacturing-auto-parts-plant-fight-for-right-to-organize-a-union/",
    labelKey: "campaigns.byId.5.sections.1.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.5.sections.2.heading" },
  { type: "paragraph", key: "campaigns.byId.5.sections.2.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/fair-trade/building-of-a-culture-of-solidarity/",
    labelKey: "campaigns.byId.5.sections.2.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.5.sections.3.heading" },
  { type: "paragraph", key: "campaigns.byId.5.sections.3.body" },
  {
    type: "linkInternal",
    detailId: "crusading-labor-lawyer",
    labelKey: "campaigns.byId.5.sections.3.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.5.sections.4.heading" },
  { type: "paragraph", key: "campaigns.byId.5.sections.4.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/campaign-for-workers-rights-in-trade-deals/",
    labelKey: "campaigns.byId.5.sections.4.linkLabel",
  },
  { type: "hr" },
  { type: "heading", level: 2, key: "campaigns.byId.5.actionStepsTitle" },
  {
    type: "orderedList",
    itemKeys: [
      "campaigns.byId.5.actionStepsItems.0",
      "campaigns.byId.5.actionStepsItems.1",
    ],
  },
  {
    type: "linkExternal",
    url: "https://actionnetwork.org/petitions/we-demand-stronger-protections-for-workerss-rights-in-the-us-mexico-canada-agreement?source=direct_link&",
    labelKey: "campaigns.byId.5.actionStepsLinkLabels.0",
  },
  {
    type: "linkExternal",
    url: "https://www.paypal.com/donate/?hosted_button_id=5ARPDJWFF5YZJ",
    labelKey: "campaigns.byId.5.actionStepsLinkLabels.1",
  },
  { type: "heading", level: 2, key: "campaigns.byId.5.additionalMaterialsTitle" },
  {
    type: "orderedList",
    itemKeys: [
      "campaigns.byId.5.additionalMaterialsItems.0",
      "campaigns.byId.5.additionalMaterialsItems.1",
      "campaigns.byId.5.additionalMaterialsItems.2",
      "campaigns.byId.5.additionalMaterialsItems.3",
      "campaigns.byId.5.additionalMaterialsItems.4",
      "campaigns.byId.5.additionalMaterialsItems.5",
      "campaigns.byId.5.additionalMaterialsItems.6",
    ],
  },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/fair-trade/imleb-report-on-labor-law-reform-in-mexico/",
    labelKey: "campaigns.byId.5.additionalMaterialsLinkLabels.0",
  },
  {
    type: "linkExternal",
    url: "http://www.youtube.com/watch?v=WEkifI20Sek",
    labelKey: "campaigns.byId.5.additionalMaterialsLinkLabels.1",
  },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/fair-trade/conditions-of-maquiladora-workers/",
    labelKey: "campaigns.byId.5.additionalMaterialsLinkLabels.2",
  },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/fair-trade/free-trade-disproportionately-harms-black-and-brown-workers/",
    labelKey: "campaigns.byId.5.additionalMaterialsLinkLabels.3",
  },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/fair-trade/rethink-trade/",
    labelKey: "campaigns.byId.5.additionalMaterialsLinkLabels.4",
  },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/new-tariffs-put-three-decade-trade-partnership-at-risk/",
    labelKey: "campaigns.byId.5.additionalMaterialsLinkLabels.5",
  },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/say-goodbye-to-our-neoliberal-era/",
    labelKey: "campaigns.byId.5.additionalMaterialsLinkLabels.6",
  },
];

const campaign6Blocks: CampaignContentBlock[] = [
  { type: "heading", level: 3, key: "campaigns.byId.6.sections.0.heading" },
  { type: "paragraph", key: "campaigns.byId.6.sections.0.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/raising-wages/campaign-to-raise-the-state-minimum-wage/",
    labelKey: "campaigns.byId.6.sections.0.linkLabel",
  },
  { type: "heading", level: 3, key: "campaigns.byId.6.sections.1.heading" },
  { type: "paragraph", key: "campaigns.byId.6.sections.1.body" },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/raising-wages/campaign-in-2024-for-wage-increases/",
    labelKey: "campaigns.byId.6.sections.1.linkLabel",
  },
  { type: "hr" },
  { type: "heading", level: 2, key: "campaigns.byId.6.actionStepsTitle" },
  {
    type: "orderedList",
    itemKeys: ["campaigns.byId.6.actionStepsItems.0"],
  },
  {
    type: "linkExternal",
    url: "https://actionnetwork.org/petitions/raise-wages-to-protect-and-serve-our-communities?source=direct_link&",
    labelKey: "campaigns.byId.6.actionStepsLinkLabels.0",
  },
  { type: "heading", level: 2, key: "campaigns.byId.6.additionalMaterialsTitle" },
  {
    type: "orderedList",
    itemKeys: [
      "campaigns.byId.6.additionalMaterialsItems.0",
      "campaigns.byId.6.additionalMaterialsItems.1",
      "campaigns.byId.6.additionalMaterialsItems.2",
      "campaigns.byId.6.additionalMaterialsItems.3",
    ],
  },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/raising-wages/campaign-for-wage-increases-for-city-funded-nonprofit-workers-ihss-home-care-workers-and-calworks-parents-in-community-service-jobs/",
    labelKey: "campaigns.byId.6.additionalMaterialsLinkLabels.0",
  },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/raising-wages/campaign-for-city-funding-for-mco-wage-increase-for-non-profits",
    labelKey: "campaigns.byId.6.additionalMaterialsLinkLabels.1",
  },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/raising-wages/wage-increases-won-for-25000-low-wage-workers",
    labelKey: "campaigns.byId.6.additionalMaterialsLinkLabels.2",
  },
  {
    type: "linkExternal",
    url: "https://www.livingwage-sf.org/raising-wages/wage-rates-for-2022/",
    labelKey: "campaigns.byId.6.additionalMaterialsLinkLabels.3",
  },
];

const CAMPAIGN_BLOCKS: Record<number, CampaignContentBlock[]> = {
  1: campaign1Blocks,
  2: campaign2Blocks,
  3: campaign3Blocks,
  4: campaign4Blocks,
  5: campaign5Blocks,
  6: campaign6Blocks,
};

export function getCampaignBlocks(campaignId: number): CampaignContentBlock[] | undefined {
  return CAMPAIGN_BLOCKS[campaignId];
}
