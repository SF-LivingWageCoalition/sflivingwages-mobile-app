declare module 'react-native-image-pan-zoom' {
  import { Component, ReactNode } from 'react';
  import { ViewProps } from 'react-native';

  interface ImageZoomProps extends ViewProps {
    cropWidth: number;
    cropHeight: number;
    imageWidth: number;
    imageHeight: number;
    minScale?: number;
    maxScale?: number;
    enableSwipeDown?: boolean;
    enableCenterFocus?: boolean;
    swipeDownThreshold?: number;
    pinchToZoom?: boolean;
    enableDoubleClickZoom?: boolean;
    doubleClickScale?: number;
    onClick?: (gestureState: any) => void;
    onDoubleClick?: (gestureState: any) => void;
    onLongPress?: (gestureState: any) => void;
    onMove?: (position: any) => void;
    onStartShouldSetPanResponder?: (e: any, gestureState: any) => boolean;
    onPanResponderMove?: (e: any, gestureState: any) => void;
    onSwipeDown?: () => void;
    horizontalOuterRangeOffset?: (offsetX: number) => void;
    responderRelease?: (vx: number, scale: number) => void;
    children?: ReactNode;
  }

  export default class ImageZoom extends Component<ImageZoomProps> {}
}
