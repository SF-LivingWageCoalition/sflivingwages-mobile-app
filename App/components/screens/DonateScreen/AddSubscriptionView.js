import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PaymentFormView from './paymentFormView';
/**
 * The class renders a view with PaymentFormView
 */
export default class AddSubscriptionView extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} ref={ref => (this.scrollViewRef = ref)}>

                    <View style={styles.textWrapper}>
                        <Text style={styles.infoText}>
                            Subscribe to our campaign!
                        </Text>
                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.infoText}>
                           By Hitting Subscribe, We charge $10/Month as a donation for our campaign
                        </Text>
                    </View>
                    <View style={styles.cardFormWrapper}>
                        <PaymentFormView {...this.props}/>
                    </View>
                </ScrollView>
                {/* Scrolls to the payment form */}
                <KeyboardSpacer
                    onToggle={() => { setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }),0)} }
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textWrapper: {
        margin: 10
    },
    infoText: {
        fontSize: 14,
        textAlign: 'center'
    },
    cardFormWrapper: {
        padding: 10,
        margin: 10
    }
});