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
import { fontSize, textStyles } from "../theme/fontStyles";

export type ButtonVariant =
  | "primary"
  | "clear"
  | "outlined"
  | "circle"
  | "text";
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
    const sizePadding = paddingSizes[size];
    const circleSize = circleSizes[size];

    const padding: ViewStyle = {
      paddingVertical: sizePadding.vertical,
      paddingHorizontal: sizePadding.horizontal,
    };

    const shadow = (shadowColor: string): ViewStyle => ({
      elevation: 6,
      shadowColor,
      shadowOpacity: 0.3,
      shadowRadius: 3,
      shadowOffset: { width: 1, height: 1 },
    });

    const baseStyle: ViewStyle =
      position === "absolute"
        ? {
            position: "absolute",
            ...(positionTop !== undefined && { top: positionTop }),
            ...(positionLeft !== undefined && { left: positionLeft }),
            zIndex: 10,
          }
        : {};

    const getVariantStyle = (): ViewStyle => {
      switch (variant) {
        case "primary":
          return {
            backgroundColor: colors.light.primary,
            borderRadius: 30,
            ...padding,
            ...shadow(colors.light.primary),
          };

        case "clear":
          return {
            backgroundColor: colors.light.surface,
            borderColor: colors.light.primary,
            borderWidth: 1,
            borderRadius: 30,
            ...padding,
            ...shadow(colors.light.primary),
          };

        case "outlined":
          return {
            backgroundColor: colors.light.surface,
            borderColor: colors.light.secondary,
            borderWidth: 1,
            borderRadius: 7,
            ...padding,
            ...shadow(colors.light.secondary),
          };

        case "circle":
          return {
            backgroundColor: colors.light.primary,
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            justifyContent: "center",
            alignItems: "center",
            ...shadow(colors.light.primary),
          };

        case "text":
          return {
            backgroundColor: "transparent",
            ...padding,
          };
      }
    };

    const variantStyles = getVariantStyle();
    return [
      baseStyle,
      backgroundColor !== undefined
        ? { ...variantStyles, backgroundColor }
        : variantStyles,
    ];
  };

  const getTextStyle = (): TextStyle[] => {
    const selectedFontSize = fontSizes[size];

    const getVariantTextStyle = (): TextStyle => {
      switch (variant) {
        case "primary":
          return {
            fontFamily: textStyles.button.fontFamily,
            fontSize: selectedFontSize,
            color: colors.light.textOnPrimary,
            textAlign: "center",
          };

        case "clear":
          return {
            fontFamily: textStyles.button.fontFamily,
            fontSize: selectedFontSize,
            color: colors.light.primary,
            textAlign: "center",
          };

        case "outlined":
          return {
            fontFamily: textStyles.buttonSmall.fontFamily,
            fontSize: selectedFontSize,
            color: colors.light.secondary,
            textAlign: "center",
          };

        case "circle":
          // Circle buttons don't have text, only icons
          return {};

        case "text":
          return {
            fontFamily: textStyles.buttonSmall.fontFamily,
            fontSize: selectedFontSize,
            color: colors.light.secondary,
            textAlign: "center",
          };
      }
    };

    return [getVariantTextStyle()];
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
            <View style={displayText ? styles.iconContainer : undefined}>
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
