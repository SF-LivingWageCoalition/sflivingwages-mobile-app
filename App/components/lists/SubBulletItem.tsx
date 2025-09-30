import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fontSize, fontFamily } from "../../theme/fontStyles";

interface SubBulletItemProps {
  text: string;
  bulletSymbol?: string;
  style?: {
    container?: object;
    bullet?: object;
    text?: object;
  };
}

const SubBulletItem: React.FC<SubBulletItemProps> = ({
  text,
  bulletSymbol = "◦",
  style = {},
}) => {
  return (
    <View style={[styles.subBulletItem, style.container]}>
      <Text style={[styles.subBulletPoint, style.bullet]}>{bulletSymbol}</Text>
      <Text style={[styles.subBulletText, style.text]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subBulletItem: {
    flexDirection: "row",
    marginLeft: 16, // Indent for sub-bullets
    marginBottom: 8,
  },
  subBulletPoint: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
    marginRight: 5,
    lineHeight: 20,
  },
  subBulletText: {
    flex: 1,
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
    lineHeight: 20,
  },
});

export default SubBulletItem;
