import React from "react";
import {
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Paragraph, Title } from "react-native-paper";
import { colors } from "../../../theme";
import { fontSize, fontWeight } from "../../../theme/fontStyles";
import { EventListItemProps } from "../../../types";

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
  const startDate = new Date(event.start_date);
  const startMonth = monthNames[startDate.getMonth()];
  const startDay = startDate.getDate();
  const startTime = startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endDate = new Date(event.end_date);
  const endTime = endDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });


  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            index % 2 === 0
              ? colors.light.background
              : colors.light.surfaceVariant,
        },
      ]}
    >
      <View style={{ marginTop: 13, width: 90 }}>
        <Text style={styles.dayText}>{startDay}</Text>
        <Text style={styles.monthText}>{startMonth}</Text>
      </View>
      <View style={styles.eventInfo}>
        <Title style={styles.descriptionText}>{event.title}</Title>
        <Paragraph style={styles.timeText}>{startTime} - {endTime}</Paragraph>
        {/* <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            Linking.openURL(event.location);
          }}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.eventMoreButton}><Paragraph>{'>'}</Paragraph></View>
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
    // marginRight: 10,
  },
  eventMoreButton: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 8,
    marginRight: 8,
  },
  eventMoreArrow: {

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
