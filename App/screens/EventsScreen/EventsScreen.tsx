import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../../theme";
import { EventItem, EventsListData } from "../../types";
import EventsListItem from "./components/EventsListItem";

const { height } = Dimensions.get("window");

/**
 * Events Screen component
 * Displays a list of events fetched from the API
 */
const Events: React.FC = () => {
  const [events, setEvents] = useState<EventsListData>({ events: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Trigger fetch on pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    // setLoading(true);
    fetchEvents().then(() => {
      setRefreshing(false);
      // setLoading(false);
    });
  };

  const fetchEvents = async (): Promise<void> => {
    try {
      const response = await fetch(
        /**
         * ex: /events/ defaults to
         * https://www.livingwage-sf.org/wp-json/tribe/events/v1/events/?page=1&per_page=5&start_date=2025-08-15 00:00:00&end_date=2027-08-16 23:59:59&status=publish
         *
         * Default Parameters:
         * page=1
         * per_page=5
         * start_date=2025-08-15 00:00:00 (today)
         * end_date=2027-08-16 23:59:59 (today + 2 years)
         * status=publish
         *
         * alternative using  the WP REST API: https://www.livingwage-sf.org/wp-json/wp/v2/tribe_events
         */
        "https://www.livingwage-sf.org/wp-json/tribe/events/v1/events/?per_page=10",
        {
          method: "GET",
          headers: { "cache-control": "no-cache" },
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

  // Fetch events data when component mounts
  useEffect(() => {
    // const fetchEvents = async (): Promise<void> => {
    //   try {
    //     const response = await fetch(
    //       /**
    //        * ex: /events/ defaults to
    //        * https://www.livingwage-sf.org/wp-json/tribe/events/v1/events/?page=1&per_page=5&start_date=2025-08-15 00:00:00&end_date=2027-08-16 23:59:59&status=publish
    //        *
    //        * Default Parameters:
    //        * page=1
    //        * per_page=5
    //        * start_date=2025-08-15 00:00:00 (today)
    //        * end_date=2027-08-16 23:59:59 (today + 2 years)
    //        * status=publish
    //        *
    //        * alternative using  the WP REST API: https://www.livingwage-sf.org/wp-json/wp/v2/tribe_events
    //        */
    //       "https://www.livingwage-sf.org/wp-json/tribe/events/v1/events/",
    //       {
    //         method: "GET",
    //         headers: { "cache-control": "no-cache" },
    //       }
    //     );

    //     if (response.ok && response.status !== 401) {
    //       const data = await response.json();
    //       setEvents(data);
    //       setLoading(false);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching events:", error);
    //     setLoading(false);
    //   }
    // };

    fetchEvents();
  }, []);

  const renderItem: ListRenderItem<EventItem> = ({ item, index }) => (
    <EventsListItem event={item} index={index} />
  );

  const keyExtractor = (item: EventItem): string => item.id.toString();

  return (
    <View style={styles.container}>
      {loading || refreshing ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color={colors.light.primary} />
        </View>
      ) : (
        <FlatList
          data={events.events}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onRefresh={() => onRefresh()}
          refreshing={refreshing}
        />
      )}
    </View>
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
