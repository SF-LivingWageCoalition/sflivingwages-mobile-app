import React from "react";
import {
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { translate } from "../../translation";
import { formStyles } from "./formStyles";

interface EmailFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  editable?: boolean;
  label?: string;
  returnKeyType?: "next" | "done";
  onSubmitEditing?: () => void;
  inputRef?: React.RefObject<TextInput | null>;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

const EmailField: React.FC<EmailFieldProps> = ({
  value,
  onChangeText,
  error,
  editable = true,
  label,
  returnKeyType = "next",
  onSubmitEditing,
  inputRef,
  containerStyle,
  inputStyle,
}) => {
  return (
    <View style={[formStyles.inputContainer, containerStyle]}>
      <Text style={formStyles.inputName}>
        {label ?? translate("inputs.emailAddress")}
        <Text style={formStyles.requiredField}>*</Text>
      </Text>
      <TextInput
        ref={inputRef}
        style={[formStyles.textInput, inputStyle]}
        keyboardType="email-address"
        autoComplete="email"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChangeText}
        value={value}
        editable={editable}
      />
      {error ? <Text style={formStyles.inputError}>{error}</Text> : null}
    </View>
  );
};

export default EmailField;
