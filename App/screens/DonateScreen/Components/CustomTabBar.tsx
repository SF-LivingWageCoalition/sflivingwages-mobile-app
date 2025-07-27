import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
                  color: isFocused ? "#CD1621" : "#000",
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
