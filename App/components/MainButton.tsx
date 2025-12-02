import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../theme/colors";
import { textStyles } from "../theme/fontStyles";

export type ButtonVariant = "primary" | "clear" | "outlined" | "circle";
export type ButtonSize = "default" | "small";

export interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode; // For circle button or icon+text buttons
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  position?: "absolute"; // For circle back button positioning
  positionTop?: number;
  positionLeft?: number;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "default",
  icon,
  disabled = false,
  style,
  textStyle,
  position,
  positionTop,
  positionLeft,
}) => {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle = {};
    const variantStyles: ViewStyle = {};

    // Position styles
    if (position === "absolute") {
      baseStyle.position = "absolute";
      if (positionTop !== undefined) baseStyle.top = positionTop;
      if (positionLeft !== undefined) baseStyle.left = positionLeft;
      baseStyle.zIndex = 10;
    }

    // Variant-specific styles
    switch (variant) {
      case "primary":
        variantStyles.backgroundColor = colors.light.primary;
        variantStyles.borderRadius = 30;
        variantStyles.paddingVertical = 10;
        variantStyles.paddingHorizontal = 15;
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
        variantStyles.paddingVertical = 10;
        variantStyles.paddingHorizontal = 15;
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
        variantStyles.paddingVertical = 10;
        variantStyles.paddingHorizontal = 15;
        variantStyles.elevation = 6;
        variantStyles.shadowColor = colors.light.secondary;
        variantStyles.shadowOpacity = 0.3;
        variantStyles.shadowRadius = 3;
        variantStyles.shadowOffset = { width: 1, height: 1 };
        break;

      case "circle":
        variantStyles.backgroundColor = colors.light.primary;
        variantStyles.width = 40;
        variantStyles.height = 40;
        variantStyles.borderRadius = 20;
        variantStyles.justifyContent = "center";
        variantStyles.alignItems = "center";
        variantStyles.elevation = 6;
        variantStyles.shadowColor = colors.light.primary;
        variantStyles.shadowOpacity = 0.3;
        variantStyles.shadowRadius = 3;
        variantStyles.shadowOffset = { width: 1, height: 1 };
        break;
    }

    return [baseStyle, variantStyles];
  };

  const getTextStyle = (): TextStyle[] => {
    const variantTextStyles: TextStyle = {};

    switch (variant) {
      case "primary":
        variantTextStyles.fontFamily = textStyles.button.fontFamily;
        variantTextStyles.fontSize = textStyles.button.fontSize;
        variantTextStyles.color = colors.light.textOnPrimary;
        variantTextStyles.textAlign = "center";
        break;

      case "clear":
        variantTextStyles.fontFamily = textStyles.button.fontFamily;
        variantTextStyles.fontSize = textStyles.button.fontSize;
        variantTextStyles.color = colors.light.primary;
        variantTextStyles.textAlign = "center";
        break;

      case "outlined":
        variantTextStyles.fontFamily = textStyles.buttonSmall.fontFamily;
        variantTextStyles.fontSize = textStyles.buttonSmall.fontSize;
        variantTextStyles.color = colors.light.secondary;
        variantTextStyles.textAlign = "center";
        break;

      case "circle":
        // Circle buttons don't have text, only icons
        break;
    }

    return [variantTextStyles];
  };

  const buttonStyles = getButtonStyle();
  const textStylesArray = getTextStyle();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        ...buttonStyles,
        style,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {variant === "circle" ? (
        icon
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          {title && (
            <Text
              style={
                textStyle ? [...textStylesArray, textStyle] : textStylesArray
              }
            >
              {title}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
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

export default Button;
