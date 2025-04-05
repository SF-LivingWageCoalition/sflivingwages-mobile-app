declare module 'react-native-keyboard-spacer' {
  import { Component } from 'react';
  import { ViewProps } from 'react-native';

  interface KeyboardSpacerProps extends ViewProps {
    topSpacing?: number;
    onToggle?: (isKeyboardShown: boolean, keyboardHeight: number) => void;
  }

  export default class KeyboardSpacer extends Component<KeyboardSpacerProps> {}
}
