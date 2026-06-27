// See `App/api/auth/README.md` for examples and error handling patterns.
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import { colors } from "../../theme";
import { ForgotPasswordScreenProps } from "../../types/types";

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <ForgotPasswordForm onSent={() => navigation.goBack()} />
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

export default ForgotPasswordScreen;
