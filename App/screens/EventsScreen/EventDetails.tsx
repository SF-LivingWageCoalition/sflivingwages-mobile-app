import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme";
import { fontSize, fontWeight } from "../../theme/fontStyles";

const EventDetails: React.FC = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text>Event Details Screen</Text>
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
});

export default EventDetails;
