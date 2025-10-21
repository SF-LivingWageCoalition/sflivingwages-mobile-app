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
import { registerUser, registerCustomer } from "./api/authApi";
import { RegisterScreenProps } from "../types/types";

const Register: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onSubmit = async () => {
    // Do registration logic here
    console.log(
      `Trying to register user with email: '${userEmail}' and password: '${userPassword}'`
    );
    // Basic validation
    const newErrors: { [key: string]: string } = {};
    if (!userEmail) {
      newErrors.userEmail = "Email is required";
    }
    if (!userPassword) {
      newErrors.userPassword = "Password is required";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // No errors, proceed with registration
      // registerUser(userEmail, userPassword); // via Simple JWT Login plugin
      const registrationData = await registerCustomer(userEmail, userPassword); // via WooCommerce REST API
      if (registrationData && registrationData.id) {
        console.log("Registration successful");
        console.log("Registration data:", registrationData);
        Alert.alert(
          "Registration successful",
          "You may now log in.",
          [{ text: "OK", onPress: () => navigation.goBack() }],
          { cancelable: true, onDismiss: () => navigation.goBack() }
        );
      } else {
        console.log("Registration failed");
        console.log("Registration data:", registrationData);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Registration Form */}
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

          <View style={styles.inputContainer}>
            <Text style={styles.inputName}>
              {translate("accountScreen.password")}
              <Text style={styles.requiredField}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(userPasswordInput) =>
                setUserPassword(userPasswordInput)
              }
              value={userPassword}
            />
            {errors.userPassword && (
              <Text style={styles.inputError}>{errors.userPassword}</Text>
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
        {/* End Registration Form */}
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

export default Register;
