import 'react-native-elements';
import { Component, ReactNode } from 'react';
import { ViewProps } from 'react-native';

declare module 'react-native-elements' {
  interface CardProps extends ViewProps {
    children?: ReactNode;
    featuredTitle?: string;
    featuredTitleStyle?: Record<string, unknown>;
    image?: { uri: string };
    containerStyle?: Record<string, unknown>;
  }

  export class Card extends Component<CardProps> {}
}
