import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../../theme";
import { EventItem, EventsListData } from "../../types";
import EventsListItem from "./components/EvenstListItem";

const { height } = Dimensions.get("window");

/**
 * Events Screen component
 * Displays a list of events fetched from the API
 */
const Events: React.FC = () => {
  const [events, setEvents] = useState<EventsListData>({ events: [] });
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch events data when component mounts
  useEffect(() => {
    const fetchEvents = async (): Promise<void> => {
      try {
        const response = await fetch(
          // ex: /events/ defaults to https://www.livingwage-sf.org/wp-json/tribe/events/v1/events/?page=1&per_page=5&start_date=2025-08-15 00:00:00&end_date=2027-08-16 23:59:59&status=publish
          "https://www.livingwage-sf.org/wp-json/tribe/events/v1/events/",
          {
            method: "GET",
            // headers: { "cache-control": "no-cache" },
          }
        );

        if (response.ok && response.status !== 401) {
          const data = await response.json();
          setEvents(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const renderItem: ListRenderItem<EventItem> = ({ item, index }) => (
    <EventsListItem event={item} index={index} />
  );

  const keyExtractor = (item: EventItem): string => item.id.toString();

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color={colors.light.primary} />
        </View>
      ) : (
        <FlatList
          data={events.events}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Events;
