import { FontAwesome5 } from "@expo/vector-icons";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainButton from "../../components/MainButton";
import PlatformMap from "../../components/PlatformMap/PlatformMap";
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

const ReportBusinessMap = () => {
  const DEFAULT_LATITUDE = 37.773972;
  const DEFAULT_LONGITUDE = -122.431297;
  const DEFAULT_ZOOM = 14;

  const initialCamera = {
    coordinates: {
      latitude: DEFAULT_LATITUDE,
      longitude: DEFAULT_LONGITUDE,
    },
    zoom: DEFAULT_ZOOM,
  };

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [reports, setReports] = useState<Violation[]>([]);

  const fetchReports = useCallback(async () => {
    try {
      const res = await fetch(
        "https://www.wpmockup.xyz/wp-json/wp/v2/violations",
      );
      if (!res.ok) {
        throw new Error(
          `Failed to fetch reports: ${res.status} ${res.statusText}`,
        );
      }
      const data: Violation[] = await res.json();
      setReports(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error fetching reports:", e);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <GestureHandlerRootView style={styles.containerBS}>
      <View style={styles.flex1}>
        <PlatformMap
          style={styles.flex1}
          cameraPosition={initialCamera}
          markers={reports.map((report) => ({
            coordinates: {
              latitude: report.acf.latitude,
              longitude: report.acf.longitude,
            },
            title: report.acf.business_name,
            snippet: report.acf.violation_type,
            draggable: false,
            tintColor:
              Platform.OS === "ios" ? colors.palette.red400 : undefined,
            systemImageName:
              Platform.OS === "ios" ? "mappin.circle.fill" : undefined,
          }))}
        />

        <MainButton
          variant="circle"
          position="absolute"
          positionTop={50}
          positionLeft={24}
          onPress={() => navigation.goBack()}
          icon={
            <FontAwesome5
              name="chevron-left"
              size={20}
              color={colors.light.chevronLight}
            />
          }
        />

        <MainButton
          variant="circle"
          position="absolute"
          onPress={() => navigation.navigate("ListReportScreen")}
          icon={
            <FontAwesome5 name="list" size={23} color={colors.palette.red400} />
          }
          backgroundColor={colors.palette.gray800}
          style={{ bottom: 40, left: 24 }}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default ReportBusinessMap;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },

  listViewButton: {
    marginLeft: 10,
    backgroundColor: colors.palette.red400,
    padding: 10,
    borderRadius: 5,
  },
  listViewText: {
    color: "white",
    fontSize: fontSize.md,
  },

  container: {
    flex: 1,
  },
  containerBS: {
    flex: 1,
    backgroundColor: "grey",
  },
  flex1: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  closeButton: {
    padding: 8,
  },
  header2: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.palette.gray900,
  },
  disclaimerText: {
    fontSize: fontSize.sm,
    fontStyle: "italic",
    color: colors.palette.gray600,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.palette.red400,
    marginTop: 4,
    marginBottom: 8,
  },
  // google places
  placesContainer: {
    width: "100%",
    marginTop: 16,
  },
  placesPlaceholder: {
    color: colors.palette.gray400,
    fontSize: fontSize.md,
  },
  placesInput: {
    borderWidth: 1,
    borderRadius: 10,
    fontSize: fontSize.md,
    borderColor: colors.palette.gray300,
  },
  placesSuggestions: {
    borderRadius: 4,
    padding: 12,
    elevation: 2,
  },

  textArea: {
    minHeight: 90,
    textAlignVertical: "top",
    paddingTop: 10,
    borderWidth: 1,
    borderColor: colors.palette.gray300,
    borderRadius: 10,
    marginTop: 16,
    fontSize: fontSize.md,
    paddingHorizontal: 12,
  },
  dropdown: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.palette.gray300,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 12,
  },
  dropdownPlaceholder: {
    color: colors.palette.gray400,
    fontSize: fontSize.md,
  },
  submitButtonContainer: {
    marginTop: 31,
  },
  backdrop: {
    backgroundColor: "rgba(211, 22, 35, 0.7)",
  },
});
