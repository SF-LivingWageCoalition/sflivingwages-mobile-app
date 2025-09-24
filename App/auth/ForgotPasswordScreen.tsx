import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../theme";
import { fontSize, fontWeight } from "../theme/fontStyles";
import { translate } from "../translation";

const ForgotPassword: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onSubmit = () => {
    // Do forgot password logic here
    console.log(`Trying to reset password for email: '${userEmail}'`);
    // Basic validation
    const newErrors: { [key: string]: string } = {};
    if (!userEmail) {
      newErrors.userEmail = "Email is required";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // No errors, proceed with forgot password
      forgotPassword(userEmail);
    }
  };

  // Send a password reset email via the Simple JWT Login plugin
  const forgotPassword = async (email: string) => {
    console.log(`Called forgotPassword with email: '${email}'`);
    try {
      const response = await fetch(
        `https://www.livingwage-sf.org.xyz/?rest_route=/simple-jwt-login/v1/user/reset_password&email=${email}`,
        {
          method: "POST",
          headers: { "cache-control": "no-cache" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Forgot password response data:", data);
        // Handle successful password reset (e.g., show a confirmation message)
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Forgot Password Screen</Text>

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
    // marginHorizontal: 10,
    // marginLeft: 10,
  },
  requiredField: {
    color: colors.light.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  textInput: {
    // height: 30,
    borderBottomColor: colors.light.primary,
    borderBottomWidth: 1,
    // margin: 10,
  },
  inputError: {
    color: colors.light.error,
    fontSize: fontSize.xxs,
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
    fontSize: fontSize.md,
    color: colors.light.textOnPrimary,
    textAlign: "center",
    fontWeight: fontWeight.bold,
  },
});

export default ForgotPassword;
