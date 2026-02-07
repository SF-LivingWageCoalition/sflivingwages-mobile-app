import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GooglePlacesTextInput, {
  GooglePlacesTextInputRef,
  Place,
} from "react-native-google-places-textinput";
import { SafeAreaView } from "react-native-safe-area-context";
import MainButton from "../../components/MainButton";
import PlatformMap from "../../components/PlatformMap/PlatformMap";
import { colors } from "../../theme";
import { fontSize } from "../../theme/fontStyles";
import { reportSchema } from "./validationSchemas";

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
  const placesRef = useRef<GooglePlacesTextInputRef | null>(null);

  const [violationType, setViolationType] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [markersAndroid, setMarkersAndroid] = useState([initialAndroidMarker]);
  const [markersIOS, setMarkersIOS] = useState([initialIOSMarker]);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const [errors, setErrors] = useState({
    violationType: null as string | null,
    description: null as string | null,
    selectedPlace: null as string | null,
  });

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
  };

  const resetForm = () => {
    setViolationType(null);
    setDescription("");
    setSelectedPlace(null);
    setErrors({ violationType: null, description: null, selectedPlace: null });
    placesRef.current?.clear();
  };

  const handleSubmit = () => {
    const formData = {
      violationType,
      description,
      selectedPlace,
    };

    const validation = reportSchema.safeParse(formData);
    if (!validation.success) {
      const newErrors = {
        violationType: null as string | null,
        description: null as string | null,
        selectedPlace: null as string | null,
      };
      validation.error.errors.forEach((err) => {
        if (err.path[0] === "violationType")
          newErrors.violationType = err.message;
        if (err.path[0] === "description") newErrors.description = err.message;
        if (err.path[0] === "selectedPlace")
          newErrors.selectedPlace = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({ violationType: null, description: null, selectedPlace: null });

    // Proceed with submission
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

      const newAndroidMarker = {
        coordinates: { latitude, longitude },
        title,
        snippet: address,
        draggable: false,
      };

      const newIOSMarker = {
        coordinates: { latitude, longitude },
        title,
        tintColor: colors.palette.red400,
        systemImageName: "mappin.circle.fill",
      };

      setMarkersAndroid((prev) => [...prev, newAndroidMarker]);
      setMarkersIOS((prev) => [...prev, newIOSMarker]);

      resetForm();
      setIsModalVisible(false);
    }
  };

  return (
    <GestureHandlerRootView style={styles.containerBS}>
      <View style={styles.flex1}>
        <PlatformMap
          style={styles.flex1}
          cameraPosition={initialCamera}
          markers={Platform.OS === "ios" ? markersIOS : markersAndroid}
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
          onPress={() => setIsModalVisible(true)}
          icon={
            <FontAwesome5 name="plus" size={20} color={colors.palette.red100} />
          }
          style={{ bottom: 40, left: 24 }}
        />

        <MainButton
          variant="circle"
          position="absolute"
          onPress={() => navigation.navigate("ListReportScreen")}
          icon={
            <FontAwesome5 name="list" size={23} color={colors.palette.red400} />
          }
          backgroundColor={colors.palette.gray800}
          style={{
            bottom: 120,
            left: 24,
          }}
        />

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <KeyboardAvoidingView
              style={styles.modalContainer}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.header2}>Report a Business Violation</Text>
                <MainButton
                  variant="text"
                  onPress={() => {
                    resetForm();
                    setIsModalVisible(false);
                  }}
                  icon={
                    <Ionicons
                      name="close"
                      size={32}
                      color={colors.palette.gray600}
                    />
                  }
                  style={styles.closeButton}
                  textStyle={{ color: colors.palette.gray600 }}
                />
              </View>
              <View style={styles.contentContainer}>
                <Dropdown
                  style={styles.dropdown}
                  placeholder="Select violation type"
                  placeholderStyle={styles.dropdownPlaceholder}
                  data={violationData}
                  labelField="label"
                  valueField="value"
                  value={violationType}
                  onChange={(item: any) => {
                    setViolationType(item.value);
                    setErrors((prev) => ({ ...prev, violationType: null }));
                  }}
                />
                {errors.violationType && (
                  <Text style={styles.errorText}>{errors.violationType}</Text>
                )}

                <TextInput
                  value={description}
                  onChangeText={(text) => {
                    setDescription(text);
                    setErrors((prev) => ({ ...prev, description: null }));
                  }}
                  placeholder="Description"
                  style={styles.textArea}
                  multiline
                  numberOfLines={4}
                />
                {errors.description && (
                  <Text style={styles.errorText}>{errors.description}</Text>
                )}

                <GooglePlacesTextInput
                  ref={placesRef}
                  apiKey={process.env.EXPO_PUBLIC_GOOGLE_AUTOCOMPLETE_API_KEY}
                  onPlaceSelect={(places: Place) => {
                    handlePlaceSelect(places);
                    setErrors((prev) => ({ ...prev, selectedPlace: null }));
                  }}
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
                {errors.selectedPlace && (
                  <Text style={styles.errorText}>{errors.selectedPlace}</Text>
                )}

                <Text style={styles.disclaimerText}>
                  All information provided is kept confidential and will not be
                  shared with anybody.
                </Text>

                <View style={styles.submitButtonContainer}>
                  <MainButton
                    variant="primary"
                    title="Submit"
                    onPress={() => {
                      Keyboard.dismiss();
                      handleSubmit();
                    }}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </Modal>
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
