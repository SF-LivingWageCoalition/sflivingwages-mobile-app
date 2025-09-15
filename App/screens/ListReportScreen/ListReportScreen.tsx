import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  RefreshControl,
  Platform,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { colors } from "../../theme";
import { fontSize } from "../../theme/fontStyles";

interface ViolationAcf {
  business_name: string;
  address: string;
  latitude: number;
  longitude: number;
  violation_type: string;
  description: string;
  anonymous: boolean;
  date_time: string;
  timestamp: string;
}
export interface Violation {
  id: number;
  title: { rendered: string };
  acf: ViolationAcf;
}

const ListReportScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [reports, setReports] = useState<Violation[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchReports = useCallback(async () => {
    try {
      const res = await fetch(
        "https://www.wpmockup.xyz/wp-json/wp/v2/violations"
      );
      const data: Violation[] = await res.json();
      setReports(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error fetching reports:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchReports();
  }, [fetchReports]);

  const headerTitle = useMemo(
    () => `Reports ${reports.length ? `(${reports.length})` : ""}`,
    [reports.length]
  );

  const renderItem = ({ item }: { item: Violation }) => {
    const dt = item.acf?.timestamp
      ? new Date(item.acf.timestamp)
      : item.acf?.date_time
      ? new Date(item.acf.date_time)
      : null;

    return (
      <Pressable
        onPress={() =>
          navigation.navigate("ReportDetailScreen", { report: item })
        }
        android_ripple={{ color: colors.palette.gray200 }}
        style={styles.card}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.title} numberOfLines={1}>
            {item?.acf?.business_name || "Unknown business"}
          </Text>

          <View style={styles.badge}>
            <MaterialIcons
              name="report"
              size={14}
              color={colors.palette.blue600}
            />
            <Text style={styles.badgeText} numberOfLines={1}>
              {item?.acf?.violation_type || "Violation"}
            </Text>
          </View>
        </View>

        {!!item?.acf?.description && (
          <Text style={styles.description} numberOfLines={1}>
            {item.acf.description}
          </Text>
        )}

        <View style={styles.metaRow}>
          {dt && (
            <View style={styles.metaItem}>
              <MaterialIcons
                name="event"
                size={16}
                color={colors.palette.gray500}
              />
              <Text style={styles.metaText}>{dt.toLocaleDateString()}</Text>
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable hitSlop={10} onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back-ios"
            size={22}
            color={colors.palette.gray900}
          />
        </Pressable>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        <View style={{ width: 22 }} />
      </View>

      {loading ? (
        <View style={styles.loader}>
          <LottieView
            source={require("../../assets/animations/list.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
          <Text style={styles.loadingText}>Loading reports…</Text>
        </View>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.listContent,
            reports.length === 0 && { flex: 1, justifyContent: "center" },
          ]}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <LottieView
                source={require("../../assets/animations/list.json")}
                autoPlay
                loop
                style={styles.emptyLottie}
              />
              <Text style={styles.emptyTitle}>No reports yet</Text>
              <Text style={styles.emptySubtitle}>
                Pull down to refresh or check back later.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

//TODO: Translation

export default ListReportScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.palette.gray100 },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.palette.white,
    borderRadius: 12,
    padding: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.palette.gray200,
    // subtle shadow
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 2 },
    }),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
    marginBottom: 6,
  },
  title: {
    flex: 1,
    fontSize: fontSize.sm,
    fontWeight: "700",
    color: colors.palette.gray900,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.palette.blue100,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: fontSize.xxs,
    fontWeight: "600",
    color: colors.palette.blue600,
    maxWidth: 140,
  },
  description: {
    fontSize: fontSize.xs,
    color: colors.palette.gray900,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    gap: 14,
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: fontSize.xxs,
    color: colors.palette.gray500,
    maxWidth: 220,
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  lottie: { width: 160, height: 160 },
  loadingText: { color: colors.palette.gray500, fontSize: fontSize.xs },
  empty: { alignItems: "center", paddingHorizontal: 24 },
  emptyLottie: { width: 180, height: 180 },
  emptyTitle: {
    fontSize: fontSize.sm,
    fontWeight: "700",
    color: colors.palette.gray900,
    marginTop: 8,
  },
  emptySubtitle: {
    fontSize: fontSize.xs,
    color: colors.palette.gray500,
    marginTop: 4,
    textAlign: "center",
  },
});
