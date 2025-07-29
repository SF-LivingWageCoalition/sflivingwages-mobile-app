import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CalendarNavProps } from "../../../types";
import { colors } from "../../../theme";

const CalendarNav: React.FC<CalendarNavProps> = ({ navigate }) => {
  return (
    <View style={styles.homeNav}>
      <Text style={styles.homeNavText} onPress={() => navigate("TodayDate")}>
        Today Date
      </Text>
      <Text style={styles.homeNavText} onPress={() => navigate("plus")}>
        +
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeNav: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.light.background,
    height: 20,
    alignItems: "center",
  },
  homeNavText: {
    flex: 1,
    fontSize: 18,
    textAlign: "center",
  },
});

export default CalendarNav;
