import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import RegisterForm from "../../components/auth/RegisterForm";
import { colors } from "../../theme";
import { RegisterScreenProps } from "../../types/types";

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <RegisterForm onRegistered={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.light.background,
  },
});

export default RegisterScreen;
