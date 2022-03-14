import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import { Left } from 'native-base';
import { Title, Paragraph } from 'react-native-paper';

var {width} = Dimensions.get("window");

const EventListItem = (props) => {

    var monthNames = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];

   var newDate = new Date(props.event.start_date);
   console.log("newDate, ", newDate);
   var month = monthNames[newDate.getMonth()];
   var day = newDate.getDate() + 1;
   console.log("date,", day);
   
   return (
        <View style={[styles.container, { backgroundColor: props.index % 2 == 0 ? "white" : "#F5F5F5"}]}>
            <View style={{marginTop:13, width:90,}}>
            <Text style={{textAlign: "center", fontWeight: 'bold', color: 'grey', fontSize: 28/*, fontFamily: "Futura"*/}}>{day} </Text>
                <Text style={{fontSize: 16, marginBottom: 6, fontWeight: 'bold', color: 'grey', textAlign: "center",/*fontFamily: "Futura"*/}}>{month}</Text>
            </View>
            <View style={styles.eventInfo}> 
                <Title style={{fontSize: 18, fontWeight: 'bold', marginBottom: 6, /*fontFamily: "Helvetica"*/}} >{props.event.description}</Title>
                <Paragraph style={{fontSize: 14, fontWeight: 'bold', marginBottom: 6, /*fontFamily: "Arial"*/}}>{props.event.duration}</Paragraph>
                <Text style={{fontSize: 15, fontWeight: '300', marginBottom: 13, /*fontFamily: "Arial"*/}}>{props.event.location}</Text>
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
        width: width/1.2,
        padding: 3,
        marginTop: 8,
        marginLeft: 10
    }


    
})


export default EventListItem;