declare module 'react-native-swiper/src' {
  import { Component, ReactNode } from 'react';
  import { ViewStyle, StyleProp } from 'react-native';

  interface SwiperProps {
    horizontal?: boolean;
    loop?: boolean;
    index?: number;
    showsButtons?: boolean;
    autoplay?: boolean;
    autoplayTimeout?: number;
    autoplayDirection?: boolean;
    showsPagination?: boolean;
    showsHorizontalScrollIndicator?: boolean;
    showsVerticalScrollIndicator?: boolean;
    scrollsToTop?: boolean;
    removeClippedSubviews?: boolean;
    automaticallyAdjustContentInsets?: boolean;
    scrollEnabled?: boolean;
    onIndexChanged?: (index: number) => void;
    onMomentumScrollEnd?: (e: any, state: any) => void;
    onTouchStartCapture?: (e: any) => void;
    onTouchStart?: (e: any) => void;
    onTouchEnd?: (e: any) => void;
    onScroll?: (e: any) => void;
    loadMinimal?: boolean;
    loadMinimalSize?: number;
    loadMinimalLoader?: ReactNode;
    style?: StyleProp<ViewStyle>;
    activeDotColor?: string;
    dotColor?: string;
    dotStyle?: StyleProp<ViewStyle>;
    activeDotStyle?: StyleProp<ViewStyle>;
    paginationStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    buttonWrapperStyle?: StyleProp<ViewStyle>;
    nextButton?: ReactNode;
    prevButton?: ReactNode;
    children?: ReactNode;
  }

  export default class Swiper extends Component<SwiperProps> {}
}
