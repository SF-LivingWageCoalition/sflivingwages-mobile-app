import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CalendarNavProps } from "../../../../App/types";

/**
 * Calendar Navigation Bar component
 * Provides navigation options for calendar-related screens
 */
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
    backgroundColor: "white",
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
