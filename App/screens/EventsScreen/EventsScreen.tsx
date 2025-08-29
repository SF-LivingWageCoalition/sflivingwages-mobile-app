import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
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
  const [events, setEvents] = useState<EventsListData>({
    events: [],
    total_pages: 0,
    next_rest_url: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch first page of events
  const fetchEvents = async (): Promise<void> => {
    try {
      const per_page = 10;
      const fetchParams = `?per_page=${per_page}&page=1`;
      const response = await fetch(
        /**
         * Using The Events Calendar REST API
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
         * Alternatively using the WP REST API: https://www.livingwage-sf.org/wp-json/wp/v2/tribe_events
         */
        "https://www.livingwage-sf.org/wp-json/tribe/events/v1/events/" +
          fetchParams,
        {
          method: "GET",
          headers: { "cache-control": "no-cache" },
        }
      );

      if (response.ok && response.status !== 401) {
        const data = await response.json();
        setEvents({
          events: data.events,
          total_pages: data.total_pages,
          next_rest_url: data.next_rest_url,
        });
        // setCurrentPage(1);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  // Fetch more events for pagination
  const fetchMoreEvents = async (): Promise<void> => {
    if (events.next_rest_url) {
      setLoadingMore(true);
      try {
        const response = await fetch(events.next_rest_url, {
          method: "GET",
          headers: { "cache-control": "no-cache" },
        });

        if (response.ok && response.status !== 401) {
          const data = await response.json();
          setEvents({
            events: [...events.events, ...data.events],
            total_pages: data.total_pages,
            next_rest_url: data.next_rest_url,
          });
          // setCurrentPage(currentPage + 1);
          // setLoading(false);
          setLoadingMore(false);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        // setLoading(false);
        setLoadingMore(false);
      }
    }
  };

  // Fetch events data when component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Trigger fetch on pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents().then(() => {
      setRefreshing(false);
    });
  };

  const renderItem: ListRenderItem<EventItem> = ({ item, index }) => (
    <EventsListItem event={item} index={index} />
  );

  const keyExtractor = (item: EventItem): string => item.id.toString();

  const listFooterComponent = () =>
    loadingMore ? (
      <View style={styles.loadMoreSpinner}>
        <ActivityIndicator size="large" color={colors.light.primary} />
      </View>
    ) : !events.next_rest_url ? (
      <View style={styles.emptyListFooter}>
        <Text style={styles.noMoreEventsText}>No more events to show</Text>
      </View>
    ) : (
      <View style={styles.emptyListFooter}></View>
    );

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
          onEndReached={() => (events.next_rest_url ? fetchMoreEvents() : null)}
          onEndReachedThreshold={0.1}
          ListFooterComponent={listFooterComponent}
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
  loadMoreSpinner: {
    height: height / 10,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyListFooter: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: height / 10,
  },
  noMoreEventsText: {
    textAlign: "center",
    color: colors.light.textSecondary,
    fontStyle: "italic",
  },
});

export default Events;
