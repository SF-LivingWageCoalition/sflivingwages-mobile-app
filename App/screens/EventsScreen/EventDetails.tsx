import { decode } from "html-entities";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { fontSize, fontWeight } from "../../theme/fontStyles";
import { EventDetailsProps } from "../../types/types";

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
    return htmlString.replace(/(<([^>]+)>)/gi, "");
  }

  // Fix newline characters
  function fixNewlineRegex(htmlString: string): string {
    return htmlString.replace(/(\r\n|\n|\r)/gm, "\n\n");
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.dateLocWrapper}>
          <Text style={styles.dateText}>
            {startMonth} {startDay} {startTime} - {endTime}
          </Text>
          {event.venue.venue ? (
            <View style={styles.venueWrapper}>
              <Text style={styles.venueText}>{event.venue.venue}</Text>
              <Text style={styles.venueText}>{event.venue.address}</Text>
              <Text style={styles.venueText}>
                {event.venue.city}, {event.venue.state}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionText}>
            {decode(stripHtmlRegex(fixNewlineRegex(event.description)))}
          </Text>
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
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    textAlign: "center",
    marginBottom: 12,
  },
  dateLocWrapper: {
    alignItems: "center",
    marginBottom: 24,
  },
  dateText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginBottom: 12,
  },
  venueWrapper: {},
  venueText: {
    fontSize: fontSize.sm,
    textAlign: "center",
  },
  descriptionWrapper: {
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: fontSize.md,
  },
});

export default EventDetails;
