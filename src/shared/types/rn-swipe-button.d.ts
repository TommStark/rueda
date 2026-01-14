declare module 'rn-swipe-button' {
  import { Component } from 'react';
  import { ViewStyle, TextStyle } from 'react-native';

  interface SwipeButtonProps {
    containerStyles?: ViewStyle;
    disabled?: boolean;
    disabledRailBackgroundColor?: string;
    disabledThumbIconBackgroundColor?: string;
    disabledThumbIconBorderColor?: string;
    disableResetOnTap?: boolean;
    enableReverseSwipe?: boolean;
    height?: number;
    onSwipeFail?: () => void;
    onSwipeStart?: () => void;
    onSwipeSuccess?: () => void;
    railBackgroundColor?: string;
    railBorderColor?: string;
    railFillBackgroundColor?: string;
    railFillBorderColor?: string;
    railStyles?: ViewStyle;
    resetAfterSuccessAnimDelay?: number;
    resetAfterSuccessAnimDuration?: number;
    screenReaderEnabled?: boolean;
    shouldResetAfterSuccess?: boolean;
    swipeSuccessThreshold?: number;
    thumbIconBackgroundColor?: string;
    thumbIconBorderColor?: string;
    thumbIconComponent?: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thumbIconImageSource?: any; // Third-party library type - keeping original signature
    thumbIconStyles?: ViewStyle;
    title?: string;
    titleColor?: string;
    titleFontSize?: number;
    titleStyles?: TextStyle;
    width?: number | string;
  }

  export default class SwipeButton extends Component<SwipeButtonProps> {}
}
