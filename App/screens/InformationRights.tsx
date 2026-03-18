import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { colors } from "../theme";
import { textStyles } from "../theme/fontStyles";

const InformationRights: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate("Assistance", { screen: "WageRights" })
        }
      >
        <Text style={styles.label}>Know Your Wage Rights</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate("Assistance", { screen: "BeReadyForICE" })
        }
      >
        <Text style={styles.label}>Be Ready for ICE</Text>
      </TouchableOpacity>
    </View>
  );
};

// ...existing code...

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.light.background, padding: 16 },
  item: {
    backgroundColor: colors.light.surface,
    borderColor: colors.light.surfaceVariant,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  label: { ...textStyles.bodyBold, color: colors.light.textPrimary },
});

export default InformationRights;
