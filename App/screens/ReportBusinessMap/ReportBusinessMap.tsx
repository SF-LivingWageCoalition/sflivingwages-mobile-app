import { StyleSheet, View, TextInput, Keyboard } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import GooglePlacesTextInput, {
  GooglePlacesTextInputRef,
  Place,
} from "react-native-google-places-textinput";
import { Dropdown } from "react-native-element-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

import FloatingActionButton from "../../components/FloatingActionButton/FloatingActionButton";
import PlatformMap from "../../components/PlatformMap/PlatformMap";
import MainButton from "../../components/MainButton/MainButton";
import { fontSize } from "../../theme/fontStyles";
import { Platform } from "react-native";
import { colors } from "../../theme";

// Use state for markers
const initialAndroidMarker = {
  coordinates: {
    latitude: 37.773972,
    longitude: -122.431297,
  },
  title: "Test Marker",
  snippet: "This is a test marker",
  draggable: false,
};
const initialIOSMarker = {
  coordinates: {
    latitude: 37.773972,
    longitude: -122.431297,
  },
  title: "Test Marker",
  tintColor: colors.palette.red400,
  systemImageName: "mappin.circle.fill",
};

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

  const violationData = [
    { label: "Discrimination", value: "discrimination" },
    { label: "Harassment", value: "harassment" },
    { label: "Unfair Treatment", value: "unfair_treatment" },
    { label: "Retaliation", value: "retaliation" },
    { label: "Unequal Pay", value: "unequal_pay" },
    { label: "Other", value: "other" },
  ];

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const placesRef = useRef<GooglePlacesTextInputRef | null>(null);

  const [violationType, setViolationType] = useState(null);
  const [description, setDescription] = useState("");
  const [sheetIndex, setSheetIndex] = useState(-1);

  // Markers state
  const [markersAndroid, setMarkersAndroid] = useState([initialAndroidMarker]);
  const [markersIOS, setMarkersIOS] = useState([initialIOSMarker]);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
  };

  const handleSubmit = () => {
    if (selectedPlace) {
      // Extract data from selected place safely
      const latitude =
        selectedPlace.details?.location?.latitude ?? DEFAULT_LATITUDE;
      const longitude =
        selectedPlace.details?.location?.longitude ?? DEFAULT_LONGITUDE;
      const title =
        selectedPlace.structuredFormat?.mainText?.text ||
        selectedPlace.structuredFormat?.secondaryText?.text ||
        "Selected Place";
      const address = `Violation Type: ${violationType} - ${description}`;

      // Android marker
      const newAndroidMarker = {
        coordinates: { latitude, longitude },
        title,
        snippet: address,
        draggable: false,
      };

      // iOS marker
      const newIOSMarker = {
        coordinates: { latitude, longitude },
        title,
        tintColor: colors.palette.red400,
        systemImageName: "mappin.circle.fill",
      };

      setMarkersAndroid((prev) => [...prev, newAndroidMarker]);
      setMarkersIOS((prev) => [...prev, newIOSMarker]);

      // Reset form
      setViolationType(null);
      setDescription("");
      setSelectedPlace(null);
      placesRef.current?.clear();
    }
  };

  const renderIcon = () => {
    return <Ionicons name="list" size={30} color={colors.palette.red200} />;
  };

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      style={styles.backdrop}
    />
  );

  return (
    <GestureHandlerRootView style={styles.containerBS}>
      <View style={styles.flex1}>
        <PlatformMap
          style={styles.flex1}
          cameraPosition={initialCamera}
          markers={Platform.OS === "ios" ? markersIOS : markersAndroid}
        />
        <FloatingActionButton onPress={() => setSheetIndex(0)} />
        <FloatingActionButton
          style={styles.listViewBtn}
          icon={renderIcon()}
          onPress={() => navigation.navigate("ListReportScreen")}
        />

        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          index={sheetIndex}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Dropdown
              style={styles.dropdown}
              placeholder="Select violation type"
              placeholderStyle={styles.dropdownPlaceholder}
              data={violationData}
              labelField="label"
              valueField="value"
              value={violationType}
              onChange={(item) => setViolationType(item.value)}
            />

            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
              style={styles.textArea}
              multiline
              numberOfLines={4}
            />

            <GooglePlacesTextInput
              ref={placesRef}
              apiKey={process.env.EXPO_PUBLIC_GOOGLE_AUTOCOMPLETE_API_KEY}
              onPlaceSelect={(places: Place) => handlePlaceSelect(places)}
              fetchDetails={true}
              detailsFields={[
                "formattedAddress",
                "location",
                "viewport",
                "photos",
              ]}
              placeHolderText="Business name"
              style={{
                container: styles.placesContainer,
                input: styles.placesInput,
                suggestionsContainer: styles.placesSuggestions,
                placeholder: styles.placesPlaceholder,
              }}
            />

            <View style={styles.submitButtonContainer}>
              <MainButton
                title="Submit"
                onPress={() => {
                  Keyboard.dismiss();
                  handleSubmit();
                  setTimeout(() => {
                    setSheetIndex(-1);
                    bottomSheetRef.current?.close();
                  }, 250); // delay to allow keyboard to close
                }}
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default ReportBusinessMap;

const styles = StyleSheet.create({
  listViewBtn: { backgroundColor: colors.palette.gray800, bottom: 120 },
  //
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
  //
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
  //google places
  placesContainer: {
    width: "100%",
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
    marginBottom: 16,
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
