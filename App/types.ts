import { NavigationProp, ParamListBase } from "@react-navigation/native";

export type RootStackParamList = {
  TabStack: undefined;
  Preview: { image: string };
  EventsNavigator: undefined;
  WhoWeAre: undefined;
  AuthNavigator: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Auction: undefined;
  Donate: undefined;
  Assist: undefined;
  Account: undefined;
};

export type AssistanceTabParamList = {
  AssistanceHome: undefined;
  ReportViolation: undefined;
  WageRights: undefined;
  BeReadyForICE: undefined;
  LivingWageCalculator: undefined;
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

export type LPsProps = {
  lps: Array<ProductItem>;
  isLoading: boolean;
};

export type MyNavigationButtonProps = {
  author?: string;
  description?: string;
  title?: string;
};

export type DetailParams = {
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

export type ViewProps = {
  onSubmit: (cardData: CardData) => void;
  submitted?: boolean;
  error?: string;
};

export type AuctionNavState = {
  arts: ProductItem[];
  books: ProductItem[];
  photos: PhotoItem[];
  cds: ProductItem[];
  dvds: ProductItem[];
  lps: ProductItem[];
  modalVisible: boolean;
  bid: string;
  isLoading: boolean;
};

export type AuctionTabParamList = {
  Arts: undefined;
  Books: undefined;
  Cds: undefined;
  Dvds: undefined;
  LPs: undefined;
};

export type DonateSection = { title: string; content: React.ReactNode };

export type DonateContentItem = {
  title: string;
  items: React.ReactNode[];
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
  navigation: NavigationProp<RootStackParamList>;
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

export type EventItem = {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  venue: {
    venue: string;
    address: string;
    city: string;
    state: string;
  };
};
export type EventDetailsProps = {
  route: any;
};

export type EventsListItemProps = {
  event: EventItem;
  index: number;
};

export type EventsListData = {
  events: EventItem[];
  next_rest_url?: string;
};

export type EventStackParamList = {
  Events: any;
  EventDetails: any;
};

export type CarouselImageProps = {
  image: {
    id: number;
    title: string;
    src: any;
    destination: string;
  };
  onPress: () => void;
};

export type NewHomeScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

export type LogoHeaderProps = {
  navigation: NavigationProp<ParamListBase>;
};

export type CommitteeMemberData = {
  id: number;
  name: string;
  title: string;
};

export type CommitteMemberProps = {
  member: CommitteeMemberData;
};

export interface Expenses {
  housing: number;
  food: number;
  childcare: number;
  medical: number;
  transport: number;
  other: number;
  taxes: number;
}
export interface WageEntry {
  poverty: number;
  expenses: Expenses;
}
export interface Household {
  [kid: string]: WageEntry;
  kid0: WageEntry;
  kid1: WageEntry;
  kid2: WageEntry;
  kid3: WageEntry;
}
export interface WageData {
  adult1: Household;
  adult2: Household;
}

export type AuthStackParamList = {
  Login: any;
  Register: any;
  ForgotPassword: any;
};

export type AccountScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};
