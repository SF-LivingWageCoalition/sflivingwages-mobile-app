import React from 'react';
import { View, StyleSheet, Text, Dimensions, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Title, Paragraph } from 'react-native-paper';

const { width } = Dimensions.get("window");

const EventListItem = ({ event, index }) => {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const newDate = new Date(event.date);
    const month = monthNames[newDate.getMonth()];
    const day = newDate.getDate() + 1;

    return (
        <View style={[styles.container, { backgroundColor: index % 2 == 0 ? "white" : "#F5F5F5" }]}>
            <View style={{ marginTop: 13, width: 90, }}>
                <Text style={{ textAlign: "center", fontWeight: 'bold', color: 'grey', fontSize: 28/*, fontFamily: "Futura"*/ }}>{day} </Text>
                <Text style={{ fontSize: 16, marginBottom: 6, fontWeight: 'bold', color: 'grey', textAlign: "center",/*fontFamily: "Futura"*/ }}>{month}</Text>
            </View>
            <View style={styles.eventInfo}>
                <Title style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 6, /*fontFamily: "Helvetica"*/ }} >{event.description}</Title>
                <Paragraph style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 6, /*fontFamily: "Arial"*/ }}>{event.time}</Paragraph>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => {
                        Linking.openURL(event.location)
                    }}
                >
                    <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 6,
        width: width,
        // borderBottomWidth: 0.5,
        flex: 1
    },

    eventInfo: {
        flexDirection: 'column',
        alignContent: "center",
        flexShrink: 1,
        width: width / 1.2,
        padding: 3,
        marginTop: 8,
        marginLeft: 10
    },
    registerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    registerButton: {
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#d31623',
        // borderColor : '#d31623',
        width: 100,
        height: 40,
        borderRadius: 10
    }
})


export default EventListItem;