import { BASE_URL, SEND_TO, SITE_KEY_V3 } from "@env";
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
  TouchableOpacity,
  View,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Recaptcha from "react-native-recaptcha-that-works";
import { EmailOptions, RecaptchaRef } from "../../../../App/types";
import { translate } from "../../../translation/i18n";
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

const AssistanceScreen: React.FC = () => {
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
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../../../assets/icon.png")}
            />
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
                checkedColor={"#D31623"} // or change to green
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
                  <TouchableOpacity
                    style={styles.recaptchaButton}
                    onPress={close}
                  >
                    <Text style={styles.recaptchaText}>
                      {translate("assistScreen.close")}
                    </Text>
                  </TouchableOpacity>
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
            <TouchableOpacity style={styles.recaptchaButton} onPress={send}>
              <Text style={styles.recaptchaText}>
                {translate("assistScreen.recaptcha")}
              </Text>
            </TouchableOpacity>
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
            <TouchableOpacity onPress={onSubmitData}>
              <View style={styles.submitButton}>
                <Text style={styles.submitButtonText}>
                  {translate("assistScreen.submit")}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={resetAll}>
              <Text style={styles.submitButtonText}>
                {translate("assistScreen.clear")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  intro: {
    marginLeft: 20,
    marginTop: 10,
  },
  instruction: {
    marginLeft: 20,
    marginBottom: 20,
  },
  inputName: {
    marginLeft: 10,
  },
  card: {
    paddingTop: 35,
    backgroundColor: "white",
    margin: 10,
    padding: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  textInput: {
    height: 30,
    borderBottomColor: "#d31623",
    borderBottomWidth: 1,
    margin: 10,
  },
  requiredField: {
    color: "#d31623",
    fontSize: 16,
    fontWeight: "900",
  },
  submitButton: {
    backgroundColor: "white",
    borderColor: "#d31623",
    borderWidth: 1,
    padding: 10,
    width: 100,
    height: 40,
    marginTop: 20,
    borderRadius: 10,
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
    padding: 4,
  },
  recaptchaMessage: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    color: "#D31623",
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
  },
  logoContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#d31623",
    fontWeight: "900",
    textAlign: "center",
  },
  inputContainer: {
    margin: 12,
  },
  submitionInfo: {
    marginTop: 12,
    textAlign: "center",
    // fontWeight: '900',
    fontStyle: "italic",
    fontSize: 13,
    color: "#D31623",
  },
  recaptchaButton: {
    backgroundColor: "#1C94EF",
    borderColor: "#1C94EF",
    // borderWidth: 1,
    padding: 10,
    width: 100,
    height: 40,
    marginTop: 20,
  },
  recaptchaText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
  headerComponentView: {
    marginTop: Platform.OS === "ios" ? 12 : 0,
    padding: Platform.OS === "ios" ? 18 : 13,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#D31623",
  },
  inputError: {
    color: "#D31623",
    fontSize: 13,
    marginLeft: 10,
    marginTop: 2,
  },
});

export default AssistanceScreen;
