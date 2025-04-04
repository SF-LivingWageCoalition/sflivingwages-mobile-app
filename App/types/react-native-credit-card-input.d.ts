declare module 'react-native-credit-card-input' {
  import { Component } from 'react';
  import { ViewProps } from 'react-native';

  export interface CardData {
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
  }

  export interface CreditCardInputProps extends ViewProps {
    autoFocus?: boolean;
    requiresName?: boolean;
    requiresCVC?: boolean;
    requiresPostalCode?: boolean;
    validatePostalCode?: (text: string) => boolean;
    allowScroll?: boolean;
    cardImageFront?: number;
    cardImageBack?: number;
    labelStyle?: any;
    inputStyle?: any;
    inputContainerStyle?: any;
    validColor?: string;
    invalidColor?: string;
    placeholderColor?: string;
    additionalInputsProps?: any;
    onChange: (cardData: CardData) => void;
  }

  export class CreditCardInput extends Component<CreditCardInputProps> {}
}
