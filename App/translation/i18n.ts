import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { I18nManager } from "react-native";
import en, { Translations } from "./locales/en";
import es from "./locales/es";

const i18n = new I18n();

i18n.enableFallback = true;
i18n.translations = { en, "en-US": en, es };

const fallbackLocate = "en-US";
const systemLocale = Localization.getLocales()[0];
const systemLocateTag = systemLocale?.languageTag ?? "en-US";

if (Object.prototype.hasOwnProperty.call(i18n.translations, systemLocateTag)) {
  i18n.locale = systemLocateTag;
} else {
  const generalLocate = systemLocateTag.split("-")[0];
  if (Object.prototype.hasOwnProperty.call(i18n.translations, generalLocate)) {
    i18n.locale = generalLocate;
  } else {
    i18n.locale = fallbackLocate;
  }
}

export const isRTL = systemLocale?.textDirection === "rtl";
I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

export type TxKeyPath = RecursiveKeyOf<Translations>;

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;

interface TranslateOptions {
  [key: string]: any; // Adjust this based on the actual options the library supports
}

export function translate(key: TxKeyPath, options?: TranslateOptions): string {
  return i18n.t(key, options);
}
