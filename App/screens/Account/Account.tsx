import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme";
import { fontSize, fontWeight } from "../../theme/fontStyles";

const Account: React.FC = () => {
  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Account Screen</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.light.surfaceVariant,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Account;
