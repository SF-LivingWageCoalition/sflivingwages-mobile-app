import { BASE_URL, SEND_TO, SITE_KEY_V3 } from "@env";
import { useNavigation } from "@react-navigation/native";
import qs from "querystring";
import React, { useCallback, useRef, useState } from "react";
import {
  Image,
  Linking,
  LogBox,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Recaptcha from "react-native-recaptcha-that-works";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import appIcon from "../../../assets/icon.png";
import MainButton from "../../components/MainButton";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation/i18n";
import { EmailOptions, RecaptchaRef } from "../../types/types";
import { assistanceSchema } from "./assistanceSchema";

const sendEmail = async (
  to: string,
  subject: string,
  body: string,
  options: EmailOptions = {}
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
  const navigation = useNavigation();
  const [fullName, setFullName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userNotes, setUserNotes] = useState<string>("");

  const [valid, setIsValid] = useState<boolean>(false);
  const [isEmpty, setEmpty] = useState<boolean>(false);

  const assistList: string[] = [
    translate("assistScreen.assistList.wageTheft"),
    translate("assistScreen.assistList.unpaidOvertime"),
    translate("assistScreen.assistList.noBreaks"),
    translate("assistScreen.assistList.discrimination"),
    translate("assistScreen.assistList.immigrationStatus"),
  ];
  const [isChecked, setCheckState] = useState<boolean[]>(
    new Array(assistList.length).fill(false)
  );
  const [list, setAssistList] = useState<string[]>([]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const recaptcha = useRef<RecaptchaRef>(null);

  const handledState = (position: any, option: string): void => {
    const update = isChecked.map((item, index) =>
      index === position ? !item : item
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
      setEmpty(true);
      return;
    }
    setErrors({});
    if (!valid) {
      setEmpty(true);
      return;
    }
    setEmpty(false);
    const strBodyFormat = `
            \nSan Francisco Living Wage Coalition Assist\n\n\nName :\t\t${fullName}\n\nEmail :\t\t${userEmail}\n\nPhone :\t\t${userPhone}\n\nSituation :\t\t${list.join(
      ", "
    )}
            `;
    sendEmail(
      SEND_TO, // San Francisco Living Wage Coalition Email.
      "ASSIST",
      strBodyFormat
    ).then(() => {
      resetAll();
    });
  };

  const resetAll = (): void => {
    setFullName("");
    setUserEmail("");
    setUserPhone("");
    setUserNotes(""); // not used
    setCheckState(new Array(assistList.length).fill(false));
    setAssistList([]);
    setIsValid(false);
    setEmpty(false);
  };

  const send = useCallback((): void => {
    recaptcha.current?.open();
  }, []);

  const close = useCallback((): void => {
    recaptcha.current?.close();
  }, []);

  const onVerify = (token: string): void => {
    if (token) {
      setEmpty(false);
      setIsValid(true);
    } else {
      setEmpty(true);
      setIsValid(false);
    }
  };

  // Ignore the warning about defaultProps - I left it in for now.
  // We wont see this error in the app (production or dev), but it will show up in the console.
  // This is a warning from react-native-elements about defaultProps.
  // Probably we could change package, but I am not sure about the design.
  // It will not break the app
  LogBox.ignoreLogs([
    "Support for defaultProps will be removed from function components",
  ]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <MainButton
          variant="circle"
          position="absolute"
          positionTop={27}
          positionLeft={27}
          onPress={() => navigation.goBack()}
          icon={
            <FontAwesome5
              name="chevron-left"
              size={20}
              color={colors.light.chevronLight}
            />
          }
        />
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
                  userPhoneInput.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
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

          {isEmpty ? (
            <Text style={styles.recaptchaMessage}>
              {translate("assistScreen.require")}
            </Text>
          ) : null}
          <View style={styles.buttonStylesRecaptcha}>
            <Recaptcha
              headerComponent={
                <View style={styles.headerComponentView}>
                  <MainButton
                    variant="outlined"
                    title={translate("assistScreen.close")}
                    onPress={close}
                    style={styles.recaptchaButtonStyle}
                  />
                </View>
              }
              lang={"en"}
              ref={recaptcha}
              siteKey={SITE_KEY_V3} // site key
              baseUrl={BASE_URL} // San Francisco Living Wage Coalition domain
              onVerify={onVerify}
              size={"invisible"} // change to 'normal' for version 2
              theme={"light"}
            />
            <MainButton
              variant="outlined"
              title={translate("assistScreen.recaptcha")}
              size="small"
              onPress={send}
              style={styles.recaptchaButtonStyle}
            />
          </View>
          {isEmpty ? (
            <Text style={styles.recaptchaMessage}>
              {translate("assistScreen.complete")}
            </Text>
          ) : null}
          <Text style={styles.submitionInfo}>
            {translate("assistScreen.review")}
          </Text>
          <View style={styles.buttonStyles}>
            <MainButton
              variant="primary"
              title={translate("assistScreen.submit")}
              onPress={onSubmitData}
              style={styles.primaryButtonStyle}
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
  primaryButtonStyle: {
    width: 100,
    marginTop: 20,
  },
  clearButtonStyle: {
    width: 100,
    marginTop: 20,
  },
  recaptchaButtonStyle: {
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
  buttonStylesRecaptcha: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 5,
  },
  recaptchaMessage: {
    ...textStyles.caption,
    textAlign: "center",
    color: colors.light.primary,
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
  headerComponentView: {
    marginTop: Platform.OS === "ios" ? 12 : 0,
    padding: Platform.OS === "ios" ? 18 : 13,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: colors.light.primary,
  },
  inputError: {
    ...textStyles.caption,
    color: colors.light.error,
    marginLeft: 10,
    marginTop: 2,
  },
});

export default ReportViolation;
