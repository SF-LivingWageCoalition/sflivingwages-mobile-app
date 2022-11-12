import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
// import { Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
//import styles from '../DonateScreen/donateSalesComponents/style/styles';
import EventListItem from './EventListItem';

var { height, width } = Dimensions.get('window');


const Events = (props) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const getEvents = async () => {
        const response = await fetch('http://157.245.184.202:8080/calendar', {
            method: "GET"
        });

        const getEvents = await response.json();

        //get idea from https://stackoverflow.com/questions/7513040/how-to-sort-objects-by-date-ascending-order/21244139
        getEvents.sort((a, b) => {
            let date_1 = new Date(a.start_date);
            let date_2 = new Date(b.start_date);

            if (date_1 < date_2) {
                return -1;
            } else if (date_1 == date_2) {
                return 0;
            } else {
                return 1;
            }
        });

        setEvents(getEvents);
        setLoading(false);
    }

    useEffect(() => {
        getEvents();
    }, [])

    // console.log("this ",events[0].description);
    return (

        <SafeAreaView style={{ flex: 1 }}>
            {/* <FlatList
                data={events}
                renderItem={({ item, index }) => <EventListItem event={item} index={index} />}
                keyExtractor={(item) => item.id}
            /> */}

            <View style={{ flexDirection: 'row', margin: 20 }}>
                <Text style={{ fontSize: 30, marginRight: 10 }}>Events 2022</Text>
                {/* <Right> */}
                    <View style={{ marginRight: 35 }}>
                        <Icon name='calendar' size={30} color="#dc143c"
                            onPress={() => props.navigation.navigate("Calendar")} />
                    </View>
                    <Text size={10} style={{ color: '#dc143c' }}>Check Calendar</Text>
                {/* </Right> */}
            </View>

            {loading ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            ) : (
                <FlatList
                    data={events}
                    renderItem={({ item, index }) => <EventListItem event={item} index={index} />}
                    keyExtractor={(item) => item.id}
                />
            )
            }
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: "center"
    }
})

export default Events;