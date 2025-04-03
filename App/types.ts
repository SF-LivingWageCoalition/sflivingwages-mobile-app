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
