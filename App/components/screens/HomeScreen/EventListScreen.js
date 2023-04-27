import React, { useState, useEffect } from 'react';
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
    const [events, setEvents] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!events) return

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
                    keyExtractor={(item) => item.month}
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