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

export type PhotoItem = {
  id?: number;
  title: string;
  path: string;
  author_image?: string;
  long_description?: string;
  closeDate: string;
  url: string;
};

export type PhotosProps = {
  photos: PhotoItem[];
};

export type TimeLeft = {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

export type DetailsScreenParams = {
  image: string;
  bio: string;
  title: string;
};

export type CardData = {
  valid: boolean;
  values?: {
    number?: string;
    expiry?: string;
    cvc?: string;
    type?: string;
    name?: string;
  };
  status?: {
    number?: string;
    expiry?: string;
    cvc?: string;
    name?: string;
  };
  [key: string]: any;
};

export type PaymentFormViewProps = {
  onSubmit: (cardData: CardData) => void;
  submitted?: boolean;
  error?: string;
};

export type AddSubscriptionViewProps = {
  onSubmit?: (cardData: CardData) => void;
  submitted?: boolean;
  error?: string;
};

export type AuctionNavState = {
  arts: ProductItem[];
  books: ProductItem[];
  photos: PhotoItem[];
  cds: ProductItem[];
  dvds: ProductItem[];
  modalVisible: boolean;
  bid: string;
  isLoading: boolean;
};

export type AuctionTabParamList = {
  Arts: undefined;
  Books: undefined;
  Cds: undefined;
  Dvds: undefined;
};

export type DonateContentItem = {
  title: string;
  body: string;
  url: string;
  btnTitle: string;
};

export type DonateMoneyState = {
  contents: DonateContentItem[];
};

export type ModalScreenProps = {
  route: {
    params: {
      image: string;
    };
  };
  navigation: NavigationProp<ParamListBase>;
};

export type ArticleSource = {
  id?: string;
  name: string;
};

export type ArticleItem = {
  title: string;
  description?: string;
  publishedAt?: string;
  source: ArticleSource;
  urlToImage?: string;
  url: string;
};

export type ArticleProps = {
  article: ArticleItem;
};
