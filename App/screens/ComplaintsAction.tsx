import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AssistanceTabParamList } from "../types/types";
import { colors } from "../theme";
import { textStyles } from "../theme/fontStyles";

const ComplaintsAction: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AssistanceTabParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("ReportViolation")}
      >
        <Text style={styles.label}>Report Violation</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("ReportBusiness")}
      >
        <Text style={styles.label}>Workplace Violation Map</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default ComplaintsAction;
