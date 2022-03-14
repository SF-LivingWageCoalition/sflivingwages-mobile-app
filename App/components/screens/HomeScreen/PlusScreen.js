//Import Necessary Packages
import React from 'react';
import { Button, View, Text, ScrollView } from 'react-native';

import HomeNavComponent from './HomeNavComponent';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default class PlusScreen extends React.Component {
    // static navigationOptions = {
    // 	title: 'Event',
    // };

    render() {
        /*
            Get param, provide a fallback value
        */
        return(
            <ScrollView style={{flex: 1}}>
                {/*Home Navigation Bar*/}
                <HomeNavComponent
                    navigate={this.props.navigation.navigate}

                />


                    <Text>
                        eventsssss
                    </Text>

                    <CalendarList onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                                  pastScrollRange={24} futureScrollRange={24} />




            </ScrollView>
        );
    }
}