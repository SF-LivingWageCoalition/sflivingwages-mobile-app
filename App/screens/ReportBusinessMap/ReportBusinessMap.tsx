import { StyleSheet, View, TextInput, Keyboard } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import GooglePlacesTextInput, {
  Place,
} from "react-native-google-places-textinput";
import { Dropdown } from "react-native-element-dropdown";

import FloatingActionButton from "../../components/FloatingActionButton/FloatingActionButton";
import PlatformMap from "../../components/PlatformMap/PlatformMap";
import MainButton from "../../components/MainButton/MainButton";
import { fontSize } from "../../theme/fontStyles";
import { colors } from "../../theme";

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

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [violationType, setViolationType] = useState(null);
  const [sheetIndex, setSheetIndex] = useState(-1);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handlePlaceSelect = (place: Place) => {
    //TODO: handle logic here
    console.log("Selected place:", JSON.stringify(place, null, 2));
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
        <PlatformMap style={styles.flex1} cameraPosition={initialCamera} />
        <FloatingActionButton onPress={() => setSheetIndex(0)} />
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          index={sheetIndex}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={styles.contentContainer}>
            <GooglePlacesTextInput
              apiKey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}
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
              placeholder="Description"
              style={styles.textArea}
              multiline
              numberOfLines={4}
            />

            <View style={styles.submitButtonContainer}>
              <MainButton
                title="Submit"
                onPress={() => {
                  Keyboard.dismiss();
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
