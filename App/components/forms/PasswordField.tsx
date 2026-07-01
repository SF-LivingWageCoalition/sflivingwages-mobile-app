import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { translate } from "../../translation";
import { formStyles } from "../../theme/formStyles";

interface PasswordFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  editable?: boolean;
  label?: string;
  hint?: string;
  autoComplete?: "password" | "new-password";
  returnKeyType?: "next" | "done";
  onSubmitEditing?: () => void;
  inputRef?: React.RefObject<TextInput | null>;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  value,
  onChangeText,
  error,
  editable = true,
  label,
  hint,
  autoComplete = "password",
  returnKeyType = "done",
  onSubmitEditing,
  inputRef,
  containerStyle,
  inputStyle,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[formStyles.inputContainer, containerStyle]}>
      <Text style={formStyles.inputName}>
        {label ?? translate("inputs.password")}
        <Text style={formStyles.requiredField}>*</Text>
      </Text>
      <View style={formStyles.passwordInputContainer}>
        <TextInput
          ref={inputRef}
          style={[
            formStyles.textInput,
            formStyles.textInputWithToggle,
            inputStyle,
          ]}
          keyboardType="default"
          autoComplete={autoComplete}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          style={formStyles.passwordToggle}
          accessibilityRole="button"
          accessibilityLabel={showPassword ? "Hide password" : "Show password"}
        >
          <FontAwesome5
            name={showPassword ? "eye-slash" : "eye"}
            color="gray"
            size={20}
          />
        </TouchableOpacity>
      </View>
      {error ? <Text style={formStyles.inputError}>{error}</Text> : null}
      {hint ? <Text style={formStyles.passwordHint}>{hint}</Text> : null}
    </View>
  );
};

export default PasswordField;
