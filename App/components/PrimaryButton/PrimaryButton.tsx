// ...existing code...

import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import type { TouchableOpacityProps } from "react-native";
import { fontSize } from "../../theme/fontStyles";
import { colors } from "../../theme";

type PrimaryButtonProps = {
  title: string;
  textStyle?: TextStyle;
  style?: ViewStyle;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
} & TouchableOpacityProps;

const PrimaryButton: React.FC<PrimaryButtonProps> = (
  props: PrimaryButtonProps
) => {
  const {
    title,
    style,
    textStyle,
    disabled = false,
    loading = false,
    size = "md",
    ...rest
  } = props;
  const isDisabled = disabled || loading;
  let sizeStyle, fontSizeValue;
  switch (size) {
    case "sm":
      sizeStyle = styles.sm;
      fontSizeValue = fontSize.sm;
      break;
    case "lg":
      sizeStyle = styles.lg;
      fontSizeValue = fontSize.lg;
      break;
    default:
      sizeStyle = styles.md;
      fontSizeValue = fontSize.md;
  }
  return (
    <TouchableOpacity
      style={[styles.button, sizeStyle, style, isDisabled && styles.disabled]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, { fontSize: fontSizeValue }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.palette.red600,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  lg: {
    paddingVertical: 18,
    paddingHorizontal: 36,
  },
  text: {
    color: colors.palette.red100,
    fontWeight: "bold",
  },
  disabled: {
    backgroundColor: "#A9A9A9",
  },
});
