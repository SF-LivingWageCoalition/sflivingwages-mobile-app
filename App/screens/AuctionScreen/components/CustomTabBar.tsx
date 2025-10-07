import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../theme";
import { fontFamily, textStyles } from "../../../theme/fontStyles";

export const CustomTabBar: React.FC<MaterialTopTabBarProps> = (props) => {
  return (
    <View style={styles.container}>
      {props.state.routes.map((route, index) => {
        const isFocused = props.state.index === index;

        return (
          <Pressable
            key={route.key}
            onPress={() => props.navigation.navigate(route.name)}
          >
            <Text
              style={[
                styles.label,
                {
                  color: isFocused
                    ? colors.light.primary
                    : colors.light.textPrimary,
                  fontFamily: isFocused
                    ? fontFamily.bodyBold
                    : fontFamily.body,
                },
              ]}
            >
              {route.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    ...textStyles.label,
    margin: 10,
    textTransform: "uppercase",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});
