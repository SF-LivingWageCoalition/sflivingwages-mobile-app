import React from "react";
import { Dimensions, Linking, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Paragraph, Title } from "react-native-paper";
import { EventListItemProps } from "../../../types";
import { colors } from "../../../theme";
import { fontSize, fontWeight } from "../../../theme/fontStyles";

const { width } = Dimensions.get("window");

/**
 * Event List Item component
 * Displays an individual event with date, description, time, and registration button
 */
const EventListItem: React.FC<EventListItemProps> = ({ event, index }) => {
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // Parse the date from the event
  const newDate = new Date(event.date);
  const month = monthNames[newDate.getMonth()];
  const day = newDate.getDate() + 1;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: index % 2 === 0 ? colors.light.background : colors.light.surfaceVariant },
      ]}
    >
      <View style={{ marginTop: 13, width: 90 }}>
        <Text style={styles.dayText}>{day}</Text>
        <Text style={styles.monthText}>{month}</Text>
      </View>
      <View style={styles.eventInfo}>
        <Title style={styles.descriptionText}>{event.description}</Title>
        <Paragraph style={styles.timeText}>{event.time}</Paragraph>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            Linking.openURL(event.location);
          }}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 6,
    width: width,
    flex: 1,
  },
  dayText: {
    textAlign: "center",
    fontWeight: fontWeight.bold,
    color: colors.light.textSecondary,
    fontSize: fontSize.xl,
  },
  monthText: {
    fontSize: fontSize.sm,
    marginBottom: 6,
    fontWeight: fontWeight.bold,
    color: colors.light.textSecondary,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginBottom: 6,
  },
  timeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    marginBottom: 6,
  },
  eventInfo: {
    flexDirection: "column",
    alignContent: "center",
    flexShrink: 1,
    width: width / 1.2,
    padding: 3,
    marginTop: 8,
    marginLeft: 10,
  },
  registerText: {
    color: colors.light.textOnPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  registerButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light.primary,
    width: 100,
    height: 40,
    borderRadius: 10,
  },
});

export default EventListItem;
