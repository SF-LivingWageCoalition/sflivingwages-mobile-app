import { SEND_TO } from "@env";
import { CheckBox } from "@rneui/themed";
import qs from "querystring";
import React, { useState } from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import appIcon from "../../../assets/icon.png";
import MainButton from "../../components/MainButton";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation/i18n";
import { EmailOptions } from "../../types/types";
import { assistanceSchema } from "./assistanceSchema";

const sendEmail = async (
  to: string,
  subject: string,
  body: string,
  options: EmailOptions = {},
): Promise<void> => {
  const { cc, bcc } = options;
  let url = `mailto:${to}`;

  // Create email link query
  const query = qs.stringify({
    subject,
    body,
    cc,
    bcc,
  });

  if (query.length) {
    url += `?${query}`;
  }

  // check if we can use this link
  const canOpen = await Linking.canOpenURL(url);
  if (!canOpen) {
    throw new Error("Provided URL can not be handled");
  }

  return Linking.openURL(url);
};

const ReportViolation: React.FC = () => {
  const [businessName, setBusinessName] = useState<string>("");
  const [businessAddress, setBusinessAddress] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userNotes, setUserNotes] = useState<string>("");

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

  const handledState = (position: any, option: string): void => {
    const update = isChecked.map((item, index) =>
      index === position ? !item : item,
    );
    setCheckState(update);

    let updateList = [...list];
    if (!isChecked[position]) {
      updateList = [...list, option];
    } else {
      updateList.splice(list.indexOf(position), 1);
    }
    setAssistList(updateList);
  };

  const onSubmitData = (): void => {
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
    const strBodyFormat = `
            \nSan Francisco Living Wage Coalition Assist\n\n\nBusiness Name :\t\t${businessName}\n\nBusiness Address :\t\t${businessAddress}\n\nName :\t\t${fullName}\n\nEmail :\t\t${userEmail}\n\nPhone :\t\t${userPhone}\n\nSituation :\t\t${list.join(
              ", ",
            )}
            `;
    sendEmail(
      SEND_TO, // San Francisco Living Wage Coalition Email.
      "ASSIST",
      strBodyFormat,
    ).then(() => {
      resetAll();
    });
  };

  const resetAll = (): void => {
    setBusinessName("");
    setBusinessAddress("");
    setFullName("");
    setUserEmail("");
    setUserPhone("");
    setUserNotes(""); // not used
    setCheckState(new Array(assistList.length).fill(false));
    setAssistList([]);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={appIcon} />
          </View>
          <Text style={styles.intro}>{translate("assistScreen.title")}</Text>
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
            <TextInput
              style={styles.addressTextInput}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              onChangeText={(businessAddressInput) =>
                setBusinessAddress(businessAddressInput)
              }
              value={businessAddress}
            />
            {errors.businessAddress && (
              <Text style={styles.inputError}>{errors.businessAddress}</Text>
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
              onChangeText={(userEmailInput) => setUserEmail(userEmailInput)}
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
                  userPhoneInput.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"),
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
                checkedColor={colors.light.primary} // or change to green
                checked={isChecked[index]}
                onPress={() => handledState(index, assist)}
              />
            );
          })}
          {errors.list && <Text style={styles.inputError}>{errors.list}</Text>}
          <Text style={styles.submitionInfo}>
            {translate("assistScreen.review")}
          </Text>
          <View style={styles.buttonStyles}>
            <MainButton
              variant="primary"
              title={translate("assistScreen.submit")}
              onPress={onSubmitData}
              style={styles.submitButtonStyle}
            />

            <MainButton
              variant="clear"
              title={translate("assistScreen.clear")}
              onPress={resetAll}
              style={styles.clearButtonStyle}
            />
          </View>
        </View>
      </View>
    </ScrollView>
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
});

export default ReportViolation;
