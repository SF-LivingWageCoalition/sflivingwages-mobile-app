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
  previewImage: string;
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
  previewImage: string;
};

export type ItemModalProps = {
  description: string;
  title: string;
};

export type ProductItem = {
  id: number;
  name: string;
  description?: string;
  price_html?: string;
  prices: {
    price: number;
  };
  permalink: string;
  images: Array<{
    thumbnail: string;
    src: string;
  }>;
};

export type ArtsProps = {
  arts: Array<ProductItem>;
  isLoading: boolean;
};

export type BooksProps = {
  books: Array<ProductItem>;
  isLoading: boolean;
};

export type CdsProps = {
  cds: Array<ProductItem>;
  isLoading: boolean;
};

export type DvdsProps = {
  dvds: Array<ProductItem>;
  isLoading: boolean;
};

export type MyNavigationButtonProps = {
  author?: string;
  description?: string;
  title?: string;
};

export type SalesDetailParams = {
  image: string;
  bio: string;
  title: string;
};
