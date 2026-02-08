import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../theme/colors";
import { textStyles, fontSize } from "../theme/fontStyles";

export type ButtonVariant = "primary" | "clear" | "outlined" | "circle" | "text";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode; // For circle button or icon+text buttons
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  position?: "absolute"; // For circle back button positioning
  positionTop?: number;
  positionLeft?: number;
  backgroundColor?: string;
}

const paddingSizes = {
  small: { vertical: 6, horizontal: 12 },
  medium: { vertical: 12, horizontal: 16 },
  large: { vertical: 14, horizontal: 20 },
} as const;

// The circle button will only have one size option, but this is here in case we need to add more sizes in the future
const circleSizes = {
  small: 40,
  medium: 50,
  large: 60,
} as const;

const fontSizes = {
  small: fontSize.xs,
  medium: fontSize.md,
  large: fontSize.lg,
} as const;

const MainButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  icon,
  isDisabled = false,
  isLoading = false,
  loadingText,
  style,
  textStyle,
  position,
  positionTop,
  positionLeft,
  backgroundColor,
}) => {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle = {};
    const variantStyles: ViewStyle = {};

    if (position === "absolute") {
      baseStyle.position = "absolute";
      if (positionTop !== undefined) baseStyle.top = positionTop;
      if (positionLeft !== undefined) baseStyle.left = positionLeft;
      baseStyle.zIndex = 10;
    }

    const sizePadding = paddingSizes[size];
    const circleSize = circleSizes[size];

    switch (variant) {
      case "primary":
        variantStyles.backgroundColor = colors.light.primary;
        variantStyles.borderRadius = 30;
        variantStyles.paddingVertical = sizePadding.vertical;
        variantStyles.paddingHorizontal = sizePadding.horizontal;
        variantStyles.elevation = 6;
        variantStyles.shadowColor = colors.light.primary;
        variantStyles.shadowOpacity = 0.3;
        variantStyles.shadowRadius = 3;
        variantStyles.shadowOffset = { width: 1, height: 1 };
        break;

      case "clear":
        variantStyles.backgroundColor = colors.light.surface;
        variantStyles.borderColor = colors.light.primary;
        variantStyles.borderWidth = 1;
        variantStyles.borderRadius = 30;
        variantStyles.paddingVertical = sizePadding.vertical;
        variantStyles.paddingHorizontal = sizePadding.horizontal;
        variantStyles.elevation = 6;
        variantStyles.shadowColor = colors.light.primary;
        variantStyles.shadowOpacity = 0.3;
        variantStyles.shadowRadius = 3;
        variantStyles.shadowOffset = { width: 1, height: 1 };
        break;

      case "outlined":
        variantStyles.backgroundColor = colors.light.surface;
        variantStyles.borderColor = colors.light.secondary;
        variantStyles.borderWidth = 1;
        variantStyles.borderRadius = 7;
        variantStyles.paddingVertical = sizePadding.vertical;
        variantStyles.paddingHorizontal = sizePadding.horizontal;
        variantStyles.elevation = 6;
        variantStyles.shadowColor = colors.light.secondary;
        variantStyles.shadowOpacity = 0.3;
        variantStyles.shadowRadius = 3;
        variantStyles.shadowOffset = { width: 1, height: 1 };
        break;

      case "circle":
        variantStyles.backgroundColor = colors.light.primary;
        variantStyles.width = circleSize;
        variantStyles.height = circleSize;
        variantStyles.borderRadius = circleSize / 2;
        variantStyles.justifyContent = "center";
        variantStyles.alignItems = "center";
        variantStyles.elevation = 6;
        variantStyles.shadowColor = colors.light.primary;
        variantStyles.shadowOpacity = 0.3;
        variantStyles.shadowRadius = 3;
        variantStyles.shadowOffset = { width: 1, height: 1 };
        break;

      case "text":
        variantStyles.backgroundColor = "transparent";
        variantStyles.paddingVertical = sizePadding.vertical;
        variantStyles.paddingHorizontal = sizePadding.horizontal;
        break;
    }
    if (backgroundColor !== undefined) {
      variantStyles.backgroundColor = backgroundColor;
    }
    return [baseStyle, variantStyles];
  };

  const getTextStyle = (): TextStyle[] => {
    const variantTextStyles: TextStyle = {};
    const selectedFontSize = fontSizes[size];

    switch (variant) {
      case "primary":
        variantTextStyles.fontFamily = textStyles.button.fontFamily;
        variantTextStyles.fontSize = selectedFontSize;
        variantTextStyles.color = colors.light.textOnPrimary;
        variantTextStyles.textAlign = "center";
        break;

      case "clear":
        variantTextStyles.fontFamily = textStyles.button.fontFamily;
        variantTextStyles.fontSize = selectedFontSize;
        variantTextStyles.color = colors.light.primary;
        variantTextStyles.textAlign = "center";
        break;

      case "outlined":
        variantTextStyles.fontFamily = textStyles.buttonSmall.fontFamily;
        variantTextStyles.fontSize = selectedFontSize;
        variantTextStyles.color = colors.light.secondary;
        variantTextStyles.textAlign = "center";
        break;

      case "circle":
        // Circle buttons don't have text, only icons
        break;

      case "text":
        variantTextStyles.fontFamily = textStyles.buttonSmall.fontFamily;
        variantTextStyles.fontSize = selectedFontSize;
        variantTextStyles.color = colors.light.secondary;
        variantTextStyles.textAlign = "center";
        break;
    }
    return [variantTextStyles];
  };

  const buttonStyles = getButtonStyle();
  const textStylesArray = getTextStyle();
  const buttonDisabled = isDisabled || isLoading;
  const displayText = isLoading ? loadingText || "Loading..." : title;

  let activityIndicatorColor;
  if (variant === "primary") {
    activityIndicatorColor = colors.light.textOnPrimary;
  } else if (variant === "clear") {
    activityIndicatorColor = colors.light.primary;
  } else if (variant === "outlined") {
    activityIndicatorColor = colors.light.secondary;
  } else if (variant === "circle") {
    activityIndicatorColor = colors.light.textOnPrimary;
  } else if (variant === "text") {
    activityIndicatorColor = colors.light.secondary;
  }

  const loadingIcon = isLoading ? (
    <ActivityIndicator size="small" color={activityIndicatorColor} />
  ) : (
    icon
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={buttonDisabled}
      style={({ pressed }) => [
        style,
        ...buttonStyles,
        buttonDisabled && styles.isDisabled,
        pressed && !buttonDisabled && styles.pressed,
      ]}
    >
      {variant === "circle" ? (
        isLoading ? (
          <ActivityIndicator size="small" color={activityIndicatorColor} />
        ) : (
          icon
        )
      ) : (
        <View style={styles.content}>
          {loadingIcon && (
            <View
              style={displayText ? styles.iconContainer : undefined}
            >
              {loadingIcon}
            </View>
          )}
          {displayText && (
            <Text
              style={
                textStyle ? [...textStylesArray, textStyle] : textStylesArray
              }
            >
              {displayText}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  isDisabled: {
    opacity: 0.9,
  },
  pressed: {
    opacity: 0.9,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginRight: 8,
  },
});

export default MainButton;
