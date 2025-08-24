import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../theme";

interface FloatingActionButtonProps {
  onPress: () => void;
}

const FloatingActionButton = (props: FloatingActionButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.fabText}>+</Text>
    </TouchableOpacity>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 24,
    bottom: 40,
    backgroundColor: colors.palette.red600,
    borderRadius: 70 / 2,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    color: colors.palette.red200,
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 36,
  },
});
