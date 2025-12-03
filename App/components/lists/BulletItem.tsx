import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { textStyles } from "../../theme/fontStyles";

interface BulletItemProps {
  text: string;
  bulletSymbol?: string;
  style?: {
    container?: object;
    bullet?: object;
    text?: object;
  };
}

const BulletItem: React.FC<BulletItemProps> = ({
  text,
  bulletSymbol = "•",
  style = {},
}) => {
  return (
    <View style={[styles.bulletItem, style.container]}>
      <Text style={[styles.bulletPoint, style.bullet]}>{bulletSymbol}</Text>
      <Text style={[styles.bulletText, style.text]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bulletItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  bulletPoint: {
    ...textStyles.body,
    marginRight: 5,
    lineHeight: 24,
  },
  bulletText: {
    ...textStyles.body,
    flex: 1,
    lineHeight: 24,
  },
});

export default BulletItem;
