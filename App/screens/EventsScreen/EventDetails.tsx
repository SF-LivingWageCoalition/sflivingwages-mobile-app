import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme";
import { fontSize, fontWeight } from "../../theme/fontStyles";
import { EventDetailsProps } from "../../types";

const EventDetails: React.FC<EventDetailsProps> = ({ route }) => {
  const { event } = route.params;

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

  // Strip HTML tags
  function stripHtmlRegex(htmlString: string): string {
    return htmlString.replace(/<[^>]*>/g, "");
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.dateLocWrapper}>
          {" "}
          <Text>
            {startMonth} {startDay} {startTime} - {endTime}
          </Text>
          <Text>{event.venue.venue}</Text>
          <Text>{event.venue.address}</Text>
          <Text>
            {event.venue.city}, {event.venue.state}
          </Text>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text>{stripHtmlRegex(event.description)}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  eventTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    textAlign: "center",
    marginBottom: 10,
  },
  dateLocWrapper: {
    alignItems: "center",
    marginBottom: 10,
  },
  descriptionWrapper: {},
});

export default EventDetails;
