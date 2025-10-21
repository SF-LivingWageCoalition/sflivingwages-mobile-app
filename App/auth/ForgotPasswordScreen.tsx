import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../theme";
import { textStyles } from "../theme/fontStyles";
import { translate } from "../translation";
import { sendPasswordReset } from "./api/authApi";
import { ForgotPasswordScreenProps } from "../types/types";

const ForgotPassword: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onSubmit = async () => {
    // Do forgot password logic here
    // Basic validation
    const newErrors: { [key: string]: string } = {};
    if (!userEmail) {
      newErrors.userEmail = "Email is required";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // No errors, proceed with forgot password
      console.log(
        `ForgotPasswordScreen: Trying to reset password for email: '${userEmail}'`
      );
      // forgotPassword(userEmail);
      const resetData = await sendPasswordReset(userEmail); // via Simple JWT Login plugin
      if (resetData && resetData.success) {
        console.log("ForgotPasswordScreen: Password reset successful");
        console.log("ForgotPasswordScreen: Password reset data:", resetData);
        Alert.alert(
          "Password reset email sent.",
          "Please check your email to complete your password reset.",
          [{ text: "OK", onPress: () => navigation.goBack() }],
          { cancelable: true, onDismiss: () => navigation.goBack() }
        );
      } else {
        console.log("ForgotPasswordScreen: Password reset failed");
        console.log("ForgotPasswordScreen: Password reset data:", resetData);
      }
      // You can handle the resetData further if needed
      // E.g., show a confirmation message or handle errors based on the response
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Forgot Password Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputName}>
              {translate("accountScreen.emailAddress")}
              <Text style={styles.requiredField}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(userEmailInput) => setUserEmail(userEmailInput)}
              value={userEmail}
            />
            {errors.userEmail && (
              <Text style={styles.inputError}>{errors.userEmail}</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
              <Text style={styles.buttonText}>
                {translate("accountScreen.submit")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* End Forgot Password Form */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    gap: 20,
    marginHorizontal: 20,
    // margin: 20,
  },
  inputContainer: {
    // margin: 12,
  },
  inputName: {
    ...textStyles.label,
    // marginHorizontal: 10,
    // marginLeft: 10,
  },
  requiredField: {
    ...textStyles.bodyBold,
    color: colors.light.primary,
  },
  textInput: {
    // height: 30,
    borderBottomColor: colors.light.primary,
    borderBottomWidth: 1,
    // margin: 10,
  },
  inputError: {
    ...textStyles.caption,
    color: colors.light.error,
    marginTop: 10,
    // marginLeft: 10,
    // marginTop: 2,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 20,
  },
  button: {
    backgroundColor: colors.light.primary,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 6,
    shadowColor: colors.light.primary,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
  },
  buttonText: {
    ...textStyles.button,
    color: colors.light.textOnPrimary,
    textAlign: "center",
  },
});

export default ForgotPassword;
