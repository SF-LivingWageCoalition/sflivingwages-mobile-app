import { NavigationProp, ParamListBase } from "@react-navigation/native";

export type RootStackParamList = {
  TabStack: undefined;
  Preview: undefined;
  Event: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Donate: undefined;
  About: undefined;
};

export type WebBrowserResult = {
  type: string;
  url?: string;
};

export type EmailOptions = {
  cc?: string;
  bcc?: string;
};

export type RecaptchaRef = {
  open: () => void;
  close: () => void;
};

export type CampaignActionProps = {
  stepText?: string;
  url?: string;
  navigation?: NavigationProp<any>;
};

export type CampaignCardProps = {
  navigate?: (screen: string, params?: any) => void;
  title?: string;
};

export type CampaignTitleProps = {
  title?: string;
  url?: string;
  navigation?: NavigationProp<ParamListBase>;
};

export type AuctionCardProps = {
  categoryId?: number;
  name: string;
  description: string;
  price: number;
  link: string;
  image: string;
  previwImage: string; // Note: keeping the typo to maintain compatibility
};

export type PreviewScreenParams = {
  image: string;
};

export type CardProps = {
  name: string;
  description: string;
  price: number;
  link: string;
  image: string;
  previwImage: string; // Note: keeping the typo to maintain compatibility
};

export type ItemModalProps = {
  decription: string; // Note: keeping the typo to maintain compatibility
  title: string;
};
