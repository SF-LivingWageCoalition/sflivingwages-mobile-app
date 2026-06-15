import { CheckBox } from "@rneui/themed";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import GooglePlacesTextInput, {
  GooglePlacesTextInputRef,
  Place,
} from "react-native-google-places-textinput";

import appIcon from "../../../assets/icon.png";
import { submitViolation } from "../../api/violations/violationsApi";
import LoadingOverlay from "../../components/LoadingOverlay";
import MainButton from "../../components/MainButton";
import {
  selectJwt,
  selectUser,
} from "../../redux/features/userSlice/userSlice";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation/i18n";
import { assistanceSchema } from "./assistanceSchema";

const FORM_LIST_DATA = [{ key: "report-violation-form" }];

const ReportViolation: React.FC = () => {
  const user = useSelector(selectUser);
  const jwtItems = useSelector(selectJwt);
  const placesRef = useRef<GooglePlacesTextInputRef | null>(null);

  const [businessName, setBusinessName] = useState<string>("");
  const [businessAddress, setBusinessAddress] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setFullName(user.display_name ?? "");
      setUserEmail(user.user_email ?? "");
    }
  }, [user]);

  const [latitude, setLatitude] = useState<number | null>(null);
  console.log("🚀 ~ ReportViolation ~ latitude:", latitude);
  const [longitude, setLongitude] = useState<number | null>(null);
  console.log("🚀 ~ ReportViolation ~ longitude:", longitude);

  const assistList: string[] = [
    translate("assistScreen.assistList.wageTheft"),
    translate("assistScreen.assistList.unpaidOvertime"),
    translate("assistScreen.assistList.noBreaks"),
    translate("assistScreen.assistList.discrimination"),
    translate("assistScreen.assistList.immigrationStatus"),
  ];
  const [isChecked, setCheckState] = useState<boolean[]>(
    new Array(assistList.length).fill(false),
  );
  const [list, setAssistList] = useState<string[]>([]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handledState = (position: number, option: string): void => {
    const update = isChecked.map((item, index) =>
      index === position ? !item : item,
    );
    setCheckState(update);

    let updateList: string[] = [...list];
    if (!isChecked[position]) {
      updateList.push(option);
    } else {
      updateList = list.filter((item) => item !== option);
    }
    setAssistList(updateList);
  };

  const onSubmitData = async (): Promise<void> => {
    // Zod validation
    const result = assistanceSchema.safeParse({
      businessName,
      businessAddress,
      fullName,
      userEmail,
      userPhone: userPhone.replace(/\D/g, ""), // Only digits
      list,
    });
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    const jwt = jwtItems[0]?.token ?? "";
    setLoading(true);
    try {
      const apiResult = await submitViolation(
        {
          businessName,
          businessAddress,
          fullName,
          userEmail,
          userPhone: userPhone.replace(/\D/g, ""),
          violations: list,
        },
        jwt,
      );
      if (apiResult.success) {
        Alert.alert(
          translate("violationSubmit.successTitle"),
          translate("violationSubmit.successMessage"),
          [{ text: translate("buttons.ok"), onPress: resetAll }],
          { cancelable: true, onDismiss: resetAll },
        );
      } else {
        Alert.alert(
          translate("violationSubmit.errorTitle"),
          translate("violationSubmit.errorMessage"),
        );
      }
    } catch {
      Alert.alert(
        translate("violationSubmit.errorTitle"),
        translate("violationSubmit.errorMessage"),
      );
    } finally {
      setLoading(false);
    }
  };

  const resetAll = (): void => {
    setBusinessName("");
    setBusinessAddress("");
    setFullName(user?.display_name ?? "");
    setUserEmail(user?.user_email ?? "");
    setUserPhone("");
    setCheckState(new Array(assistList.length).fill(false));
    setAssistList([]);
    setLatitude(null);
    setLongitude(null);
    placesRef.current?.clear();
  };

  const handlePlaceSelect = (place: Place) => {
    const address = place?.details?.formattedAddress || "";

    setBusinessAddress(address);
    setErrors((prev) => {
      const { businessAddress, ...rest } = prev;
      return rest;
    });

    const location = place?.details?.location;
    if (location) {
      setLatitude(location.latitude);
      setLongitude(location.longitude);
    }
  };

  return (
    <>
      <FlatList
        data={FORM_LIST_DATA}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={() => (
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={styles.logoContainer}>
                <Image style={styles.logo} source={appIcon} />
              </View>
              <Text style={styles.intro}>
                {translate("assistScreen.title")}
              </Text>
              <Text style={styles.instruction}>
                {translate("assistScreen.subTitle")}
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputName}>
                  {translate("assistScreen.businessName")}
                  <Text style={styles.requiredField}>*</Text>
                </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(businessNameInput) =>
                    setBusinessName(businessNameInput)
                  }
                  value={businessName}
                />
                {errors.businessName && (
                  <Text style={styles.inputError}>{errors.businessName}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputName}>
                  {translate("assistScreen.businessAddress")}
                  <Text style={styles.requiredField}>*</Text>
                </Text>

                <GooglePlacesTextInput
                  ref={placesRef}
                  apiKey={process.env.EXPO_PUBLIC_GOOGLE_AUTOCOMPLETE_API_KEY}
                  onPlaceSelect={(places: Place) => {
                    handlePlaceSelect(places);
                  }}
                  fetchDetails={true}
                  detailsFields={[
                    "formattedAddress",
                    "location",
                    "viewport",
                    "photos",
                  ]}
                  placeHolderText=""
                  style={{
                    container: styles.placesContainer,
                    input: styles.placesInput,
                    suggestionsContainer: styles.placesSuggestions,
                  }}
                  nestedScrollEnabled={true}
                />
                {errors.businessAddress && (
                  <Text style={styles.inputError}>
                    {errors.businessAddress}
                  </Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputName}>
                  {translate("assistScreen.fullName")}
                  <Text style={styles.requiredField}>*</Text>
                </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(fullNameInput) => setFullName(fullNameInput)}
                  value={fullName}
                />
                {errors.fullName && (
                  <Text style={styles.inputError}>{errors.fullName}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputName}>
                  {translate("assistScreen.email")}
                  <Text style={styles.requiredField}>*</Text>
                </Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="email-address"
                  onChangeText={(userEmailInput) =>
                    setUserEmail(userEmailInput)
                  }
                  value={userEmail}
                />
                {errors.userEmail && (
                  <Text style={styles.inputError}>{errors.userEmail}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputName}>
                  {translate("assistScreen.phone")}{" "}
                  <Text style={styles.requiredField}>*</Text>
                </Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  onChangeText={(userPhoneInput) =>
                    setUserPhone(
                      userPhoneInput.replace(
                        /(\d{3})(\d{3})(\d{4})/,
                        "($1) $2-$3",
                      ),
                    )
                  }
                  value={userPhone}
                />
                {errors.userPhone && (
                  <Text style={styles.inputError}>{errors.userPhone}</Text>
                )}
              </View>
              <Text style={styles.instruction}>
                {translate("assistScreen.options")}
                <Text style={styles.requiredField}> *</Text>
              </Text>

              {assistList.map((assist, index) => {
                return (
                  <CheckBox
                    key={index}
                    title={assist}
                    textStyle={textStyles.body}
                    checkedColor={colors.light.primary}
                    checked={isChecked[index]}
                    onPress={() => handledState(index, assist)}
                  />
                );
              })}
              {errors.list && (
                <Text style={styles.inputError}>{errors.list}</Text>
              )}
              <Text style={styles.submitionInfo}>
                {translate("assistScreen.review")}
              </Text>
              <View style={styles.buttonStyles}>
                <MainButton
                  variant="primary"
                  title={translate("assistScreen.submit")}
                  onPress={onSubmitData}
                  isDisabled={loading}
                  style={styles.submitButtonStyle}
                />

                <MainButton
                  variant="clear"
                  title={translate("assistScreen.clear")}
                  onPress={resetAll}
                  isDisabled={loading}
                  style={styles.clearButtonStyle}
                />
              </View>
            </View>
          </View>
        )}
      />
      {loading && <LoadingOverlay />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.light.backgroundSecondary,
  },
  submitButtonStyle: {
    width: 100,
    marginTop: 20,
  },
  clearButtonStyle: {
    width: 100,
    marginTop: 20,
  },
  intro: {
    ...textStyles.h3,
    marginLeft: 20,
    marginTop: 10,
  },
  instruction: {
    ...textStyles.body,
    marginLeft: 20,
    marginBottom: 20,
  },
  inputName: {
    ...textStyles.label,
    marginLeft: 10,
  },
  card: {
    backgroundColor: colors.light.surface,
    borderRadius: 10,
    padding: 20,
    shadowColor: colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textInput: {
    height: 30,
    borderBottomColor: colors.light.primary,
    borderBottomWidth: 1,
    margin: 10,
  },
  addressTextInput: {
    minHeight: 72,
    borderColor: colors.light.primary,
    borderWidth: 1,
    margin: 10,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  requiredField: {
    ...textStyles.bodyBold,
    color: colors.light.primary,
  },
  buttonStyles: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 5,
    paddingBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  logoContainer: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    margin: 12,
  },
  submitionInfo: {
    ...textStyles.caption,
    marginTop: 12,
    textAlign: "center",
    fontStyle: "italic",
    color: colors.light.primary,
  },
  inputError: {
    ...textStyles.caption,
    color: colors.light.error,
    marginLeft: 10,
    marginTop: 2,
  },

  //google places styles
  placesContainer: {
    width: "100%",
    marginTop: 8,
    marginHorizontal: 10,
  },

  placesInput: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    textAlignVertical: "center",
    borderColor: colors.light.primary,
    ...textStyles.caption,
    height: 120,
  },

  placesSuggestions: {
    borderRadius: 4,
    elevation: 2,
  },
});

export default ReportViolation;
