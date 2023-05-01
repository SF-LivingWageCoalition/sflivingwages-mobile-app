import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    SafeAreaView
} from 'react-native';
import EventListItem from './EventListItem';

const { height } = Dimensions.get('window');


const Events = () => {
    const ref = useRef()
    const [events, setEvents] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://www.livingwage-sf.org/wp-json/wp/v2/pages/18493",
            {
                method: "GET",
                headers: { 'cache-control': 'no-cache' }
            }
        )
            .then(res => {
                if (res.ok && res.status !== 401) {
                    return res.json()
                }
            })
            .then(res => {

                const regex = /({([{^}]*)})|(&.+;)|(<([^>]+)>)/ig
                const clean = res.content.rendered.replace(regex, '')

                const events = JSON.parse(clean)


                setEvents(events)
                setLoading(false);
            })
    })

    const eventsCalls = () => {
        console.log("------------ call every 10 minute");
        fetch("https://www.livingwage-sf.org/wp-json/wp/v2/pages/18493",
            {
                method: "GET",
                headers: { 'cache-control': 'no-cache' }
            }
        )
            .then(res => {
                if (res.ok && res.status !== 401) {
                    return res.json()
                }
            })
            .then(res => {

                const regex = /({([{^}]*)})|(&.+;)|(<([^>]+)>)/ig
                const clean = res.content.rendered.replace(regex, '')

                const events = JSON.parse(clean)


                setEvents(events)
            })
    }

    useEffect(() => {
        ref.current = eventsCalls;
    })


    useEffect(() => {
        const call = () => {
            ref.current()
        }
        console.log("test ONE.......");
        // let id = setInterval(call, 5000); test
        let id = setInterval(call, 10 * 60 * 1000);
        return () => clearInterval(id)
    }, [])





    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            ) : (
                <FlatList
                    data={events.events}
                    renderItem={({ item, index }) => <EventListItem event={item} index={index} />}
                    keyExtractor={(item) => item.date}
                />
            )}

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