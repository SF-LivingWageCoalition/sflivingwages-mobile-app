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
    next_rest_url: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  /**
   * Fetch first page of events
   */
  const fetchEvents = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://www.livingwage-sf.org/wp-json/tribe/events/v1/events/?per_page=10&page=1",
        {
          method: "GET",
          headers: { "cache-control": "no-cache" },
        }
      );

      if (response.ok && response.status !== 401) {
        const data = await response.json();
        setEvents({
          events: data.events,
          next_rest_url: data.next_rest_url,
        });
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
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
          setEvents((prevEvents) => ({
            events: [...prevEvents.events, ...data.events],
            next_rest_url: data.next_rest_url,
          }));
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  // Fetch events when screen mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Refresh handler
  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents().then(() => setRefreshing(false));
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
          onRefresh={onRefresh}
          refreshing={refreshing}
          onEndReached={() =>
            events.next_rest_url ? fetchMoreEvents() : null
          }
          onEndReachedThreshold={0.5}
          ListFooterComponent={listFooterComponent}
          ListEmptyComponent={
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>
                No active events available at the moment.
              </Text>
            </View>
          }
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
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyListFooter: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
  noMoreEventsText: {
    textAlign: "center",
    color: colors.light.textSecondary,
    fontStyle: "italic",
  },

  // ⭐ ADDED STYLES FOR EMPTY STATE
  emptyStateContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 18,
    color: "#555",
  },
});

export default Events;
