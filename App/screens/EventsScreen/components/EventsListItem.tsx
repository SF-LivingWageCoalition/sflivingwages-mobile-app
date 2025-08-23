import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Paragraph, Title } from "react-native-paper";
import { colors } from "../../../theme";
import { fontSize, fontWeight } from "../../../theme/fontStyles";
import { EventsListItemProps } from "../../../types";

const { width } = Dimensions.get("window");

/**
 * Event List Item component
 * Displays an individual event with date, description, time, and registration button
 */
const EventsListItem: React.FC<EventsListItemProps> = ({ event, index }) => {
  const navigation = useNavigation<NavigationProp<any>>();
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
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor:
            index % 2 === 0
              ? colors.light.background
              : colors.light.surfaceVariant,
        },
      ]}
      onPress={() => {
        // Navigate to Event Details screen with event data
        navigation.navigate("EventDetails", { event: event });
      }}
    >
      <View style={styles.dateWrapper}>
        <Text style={styles.dayText}>{startDay}</Text>
        <Text style={styles.monthText}>{startMonth}</Text>
      </View>
      <View style={styles.eventInfo}>
        <Title style={styles.descriptionText}>{event.title}</Title>
        <Paragraph style={styles.timeText}>
          {startTime} - {endTime}
        </Paragraph>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 6,
    width: width,
    flex: 1,
  },
  dateWrapper: {
    display: "flex",
    flexDirection: "column",
    marginTop: 13,
    width: 90,
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
    marginRight: 10,
  },
  eventMoreButton: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 8,
    marginRight: 8,
  },
  eventMoreArrow: {},
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

export default EventsListItem;
