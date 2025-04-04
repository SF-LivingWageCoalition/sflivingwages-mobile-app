import React, { useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { AddSubscriptionViewProps, CardData } from "../../../../App/types";
import PaymentFormView from "./paymentFormView";

/**
 * Renders a view with PaymentFormView
 */
const AddSubscriptionView: React.FC<AddSubscriptionViewProps> = ({
  onSubmit,
  submitted,
  error,
}) => {
  const scrollViewRef = useRef<ScrollView | null>(null);

  // Create a handler function that's guaranteed to be non-undefined
  const handleSubmit = (cardData: CardData) => {
    if (onSubmit) {
      onSubmit(cardData);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} ref={scrollViewRef}>
        <View style={styles.textWrapper}>
          <Text style={styles.infoText}>Subscribe to our campaign!</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.infoText}>
            By Hitting Subscribe, We charge $10/Month as a donation for our
            campaign
          </Text>
        </View>
        <View style={styles.cardFormWrapper}>
          <PaymentFormView
            onSubmit={handleSubmit}
            submitted={submitted}
            error={error}
          />
        </View>
      </ScrollView>
      {/* Scrolls to the payment form */}
      <KeyboardSpacer
        onToggle={() => {
          setTimeout(() => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollToEnd({ animated: true });
            }
          }, 0);
        }}
      />
    </View>
  );
};

export default AddSubscriptionView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textWrapper: {
    margin: 10,
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
  },
  cardFormWrapper: {
    padding: 10,
    margin: 10,
  },
});
