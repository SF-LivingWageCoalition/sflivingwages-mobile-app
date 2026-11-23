import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface CheckboxProps {
  title: string;
  checked: boolean;
  onPress: () => void;
  checkedColor?: string;
  uncheckedColor?: string;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Checkbox: React.FC<CheckboxProps> = ({
  title,
  checked,
  onPress,
  checkedColor,
  uncheckedColor = "#bfbfbf",
  disabled = false,
  containerStyle,
  textStyle,
}) => {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, containerStyle]}
    >
      <View style={styles.row}>
        <FontAwesome
          name={checked ? "check-square-o" : "square-o"}
          size={24}
          color={checked ? checkedColor : uncheckedColor}
        />
        <Text style={[styles.title, textStyle]}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    borderColor: "#ededed",
    borderWidth: 1,
    borderRadius: 3,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 10,
    marginRight: 10,
    flexShrink: 1,
  },
});

export default Checkbox;
