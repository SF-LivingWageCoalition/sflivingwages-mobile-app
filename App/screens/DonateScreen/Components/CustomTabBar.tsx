import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../theme";

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
                  color: isFocused ? colors.light.primary : colors.light.textPrimary,
                  fontWeight: isFocused ? "bold" : "normal",
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
    margin: 10,
    textTransform: "uppercase",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});
