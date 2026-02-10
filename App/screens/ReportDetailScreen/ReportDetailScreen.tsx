import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useMemo } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MainButton from "../../components/MainButton";
import { colors } from "../../theme";
import { fontSize } from "../../theme/fontStyles";
import { Violation } from "../ListReportScreen/ListReportScreen";

const ReportDetailScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { report } = route.params as { report: Violation };

  const dt = useMemo(() => {
    const raw = report?.acf?.timestamp || report?.acf?.date_time;
    return raw ? new Date(raw) : null;
  }, [report]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <MainButton
          variant="circle"
          size="small"
          onPress={() => navigation.goBack()}
          icon={
            <FontAwesome5
              name="chevron-left"
              size={20}
              color={colors.light.chevronLight}
            />
          }
        />
        <Text style={styles.headerTitle} numberOfLines={1}>
          Report Details
        </Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {report.acf.business_name || "Unknown business"}
          </Text>
          <View style={styles.badge}>
            <MaterialIcons
              name="report"
              size={14}
              color={colors.palette.blue600}
            />
            <Text style={styles.badgeText} numberOfLines={1}>
              {report.acf.violation_type || "Violation"}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <InfoRow
            icon="place"
            label="Address"
            value={report.acf.address || "—"}
          />
          <Divider />
          <InfoRow
            icon="event"
            label="Date"
            value={dt ? dt.toLocaleDateString() : "—"}
          />
          <Divider />
          <InfoRow
            icon="info-outline"
            label="Description"
            value={report.acf.description || "—"}
            multiline
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportDetailScreen;

//TODO: Refactor to separate file

interface InfoRowProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
  trailing?: React.ReactNode;
  multiline?: boolean;
}

const InfoRow = ({ icon, label, value, trailing, multiline }: InfoRowProps) => {
  return (
    <View style={styles.infoRow}>
      <MaterialIcons name={icon} size={18} color={colors.palette.gray500} />
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <Text
          style={[styles.value, multiline && { lineHeight: 20 }]}
          numberOfLines={multiline ? 0 : 1}
        >
          {value}
        </Text>
      </View>
      {trailing}
    </View>
  );
};

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.palette.gray100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.palette.gray200,
    backgroundColor: colors.palette.gray100,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: fontSize.md,
    fontWeight: "700",
    color: colors.palette.gray900,
  },

  content: { padding: 16, gap: 16 },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    flex: 1,
    fontSize: fontSize.xl,
    fontWeight: "800",
    color: colors.palette.gray900,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.palette.blue100,
    borderRadius: 10,
    width: "50%",
  },
  badgeText: { fontSize: 12, fontWeight: "700", color: colors.palette.blue600 },

  card: {
    backgroundColor: colors.palette.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.palette.gray200,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 2 },
    }),
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 8,
  },
  label: {
    fontSize: fontSize.xxs,
    color: colors.palette.gray500,
    marginBottom: 2,
  },
  value: {
    fontSize: fontSize.sm,
    color: colors.palette.gray900,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: colors.palette.gray200,
    marginHorizontal: 8,
  },

  rowActions: { flexDirection: "row", gap: 6, marginLeft: 8 },
  iconBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: colors.palette.gray100,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.palette.gray200,
  },

  actionsRow: { flexDirection: "row", gap: 12, marginTop: 4 },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.palette.blue600,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
  },
  primaryBtnText: {
    color: colors.palette.white,
    fontWeight: "700",
    fontSize: fontSize.xs,
  },
});
