declare module 'react-native-drop-down-item' {
  import { Component, ReactNode } from 'react';
  import { ViewProps, ImageSourcePropType } from 'react-native';

  interface DropDownItemProps extends ViewProps {
    contentVisible?: boolean;
    invisibleImage?: ImageSourcePropType;
    visibleImage?: ImageSourcePropType;
    header: ReactNode;
    children?: ReactNode;
  }

  export default class DropDownItem extends Component<DropDownItemProps> {}
}
