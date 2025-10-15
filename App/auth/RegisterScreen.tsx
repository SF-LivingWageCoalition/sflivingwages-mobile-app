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
import { registerUser, registerCustomer } from "./api/authApi";

const Register: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onSubmit = () => {
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
      registerCustomer(userEmail, userPassword); // via WooCommerce REST API
    }
  };

  // Register a new WP user via the Simple JWT Login plugin
  // const registerUser = async (email: string, password: string) => {
  //   try {
  //     const response = await fetch(
  //       `https://www.wpmockup.xyz/?rest_route=/simple-jwt-login/v1/users&email=${email}&password=${password}&AUTH_KEY=${jwtAuthKey}`,
  //       {
  //         method: "POST",
  //         headers: { "cache-control": "no-cache" },
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Registration response data:", data);
  //       /**
  //        * Registration response data:
  //        * {
  //        *  "id": "31",
  //        *  "message": "User was successfully created.",
  //        *  "roles": ["customer"],
  //        *  "success": true,
  //        *  "user": {
  //        *    "ID": "31",
  //        *    "display_name": "tosspot@scottmotion.com",
  //        *    "user_activation_key": "",
  //        *    "user_email": "tosspot@scottmotion.com",
  //        *    "user_level": 0,
  //        *    "user_login": "tosspot@scottmotion.com",
  //        *    "user_nicename": "tosspotscottmotion-com",
  //        *    "user_registered": "2025-10-06 01:46:52",
  //        *    "user_status": "0",
  //        *    "user_url": ""
  //        *  }
  //        * }
  //        */
  //       // Handle successful registration (e.g., navigate to login, show success message)
  //     } else {
  //       const data = await response.json();
  //       console.log("Registration response data:", data);
  //       /**
  //        * Registration response data (using existing email):
  //        * {
  //        *  "data": {
  //        *    "errorCode": 38,
  //        *    "message": "User already exists."
  //        *  },
  //        *  "success": false
  //        * }
  //        */
  //       console.error("Registration failed with status:", response.status);
  //       console.error("Error code:", data.data.errorCode);
  //       console.error("Error message:", data.data.message);
  //       // Handle registration failure (e.g., show error message)
  //     }
  //   } catch (error) {
  //     console.error("Error during registration:", error);
  //     // Handle network or other errors
  //   }
  // };

  // Register a new WooCommerce customer via the WooCommerce REST API
  // const registerCustomer = async (email: string, password: string) => {
  //   try {
  //     const response = await fetch(
  //       `https://www.wpmockup.xyz/wp-json/wc/v3/customers`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Basic " + base64Credentials, // Replace with your actual keys
  //           "cache-control": "no-cache",
  //         },
  //         body: JSON.stringify({
  //           email: email,
  //           password: password,
  //           first_name: "Test",
  //           last_name: "Testerson",
  //           username: email,
  //           billing: {
  //             first_name: "Test",
  //             last_name: "Testerson",
  //             address_1: "123 Main St",
  //             city: "Anytown",
  //             state: "CA",
  //             postcode: "12345",
  //             country: "US",
  //             email: email,
  //             phone: "555-555-5555",
  //           },
  //           shipping: {
  //             first_name: "Test",
  //             last_name: "Testerson",
  //             address_1: "123 Main St",
  //             city: "Anytown",
  //             state: "CA",
  //             postcode: "12345",
  //             country: "US",
  //           },
  //         }),
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Customer registration response data:", data);
  //       // Handle successful customer creation
  //     } else {
  //       const data = await response.json();
  //       console.error(
  //         "Customer registration failed with status:",
  //         response.status
  //       );
  //       console.error("Error message:", data.message);
  //       // Handle customer creation failure
  //     }
  //   } catch (error) {
  //     console.error("Error during customer registration:", error);
  //     // Handle network or other errors
  //   }
  // };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Register a new account.</Text>

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

export default Register;
