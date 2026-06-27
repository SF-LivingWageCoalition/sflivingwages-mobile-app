import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";

/**
 * Shared styles for auth form fields. Based on the standalone auth screen
 * styling (absolute-positioned password toggle, primary bottom border) so the
 * modal and screens render a consistent look.
 */
export const formStyles = StyleSheet.create({
  inputContainer: {},
  inputName: {
    ...textStyles.label,
  },
  requiredField: {
    ...textStyles.bodyBold,
    color: colors.light.primary,
  },
  textInput: {
    borderBottomColor: colors.light.primary,
    borderBottomWidth: 1,
    flex: 1,
    color: colors.light.textPrimary,
    ...textStyles.body,
  },
  textInputWithToggle: {
    paddingRight: 48, // leave room for the visibility toggle
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordToggle: {
    padding: 10,
    position: "absolute",
    right: 0,
    height: "100%",
    justifyContent: "center",
  },
  passwordHint: {
    ...textStyles.caption,
    color: colors.light.textSecondary,
    marginTop: 10,
  },
  inputError: {
    ...textStyles.caption,
    color: colors.light.error,
    marginTop: 10,
  },
  generalError: {
    ...textStyles.caption,
    color: colors.light.error,
    textAlign: "center",
    marginTop: 10,
  },
});
