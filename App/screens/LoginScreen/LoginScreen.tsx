// See `App/api/auth/README.md` for examples and error handling patterns.
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import LoginForm from "../../components/auth/LoginForm";
import { colors } from "../../theme";
import { LoginScreenProps } from "../../types/types";

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <LoginForm onSuccess={() => navigation.goBack()} />
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

export default LoginScreen;
