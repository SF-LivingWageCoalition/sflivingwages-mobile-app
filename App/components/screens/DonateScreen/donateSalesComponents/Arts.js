import { Button } from 'native-base';
import React, { Component, useContext , useEffect, useState} from 'react'
import MyBackButton from './MyNavigationButton';
import {
  Platform,
  StyleSheet,
  Text, View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TouchableHighlight,
  Alert,
  Dimensions,
  TextInput,
  Linking
} from 'react-native';

import InputArts from './inputComponents/ArtInputs';
import styles from './style/styles'
import MyNavigationButton from './MyNavigationButton';
import { useNavigation } from '@react-navigation/native';
import { set } from 'date-fns';
import Moment from 'moment';

const Arts = ({ arts }) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing ]   = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [closeDate, setCloseDate] = useState('');

  useEffect(() => {
    
  });
  
  const calculateTimeLeft = (value) => {
    // Set bid end day here
    let year = new Date().getFullYear();
    //let endDate = arts.closeDate;
    let endDate = value
    //Date format: 2021-06-01T12:00:00.000Z
    let difference = +new Date(endDate) - +new Date();
    
    
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }
   
  const formatDate = (value) =>{
    var date = new Date(value).getDate(); //Current Date
    var month = new Date(value).getMonth() + 1; //Current Month
    var year = new Date(value).getFullYear(); //Current Year
    var hours = new Date(value).getHours() + 5 ; //Current Hours
    var min = new Date(value).getMinutes(); //Current Minutes
    var sec = new Date(value).getSeconds(); //Current Seconds
    setCloseDate(
       month + '/' + date + '/' + year 
      + ' ' + hours + ':' + min
    );
  }
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(arts.closeDate));

  
  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
     <Text>
         {timeLeft[interval]} {interval}{" "}
     </Text>
    );
  });

  const onRefresh = () =>{
     
  }

  return (
   
    <FlatList
      horizontal={false}
      data={arts}
      extraData={refreshing}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh()}
        />
        
      }
      renderItem={({ item }) => {
        return (
          
          <View style={{ flex: 1 }}>
            <View style={styles.cardImage}>
              <Text style={{ textAlign: "center", fontSize: 18,  marginBottom: 15, fontWeight: 'bold' }}> {item.title} </Text>
               
              <TouchableHighlight
                  underlayColor = 'gray'
                  onPress={ () => { 
                      if (item.long_description != null ) {
                      navigation.navigate(  'Details', {
                        image: item.author_image,
                        bio: item.long_description,
                        title: item.title}) 
                      } else {
                        Alert.alert(
                          "",
                          "No Detail",
                          [{  text: "Check back later",
                            onPress: () => console.log("Check back later pressed")}]
                        );
                      }
                    }
                  }

                  onLongPress = {() => {navigation.navigate('Preview', {image: item.path})}}
              >
              
                  <Image
                    style={styles.imageStyle}
                    source={{ uri: item.path }}
                  />
               
              </TouchableHighlight>
              <Text style={{ textAlign: "center", fontStyle: 'italic'}} >Long press to zoom or Tap to show details</Text>
             
              <View
                style={styles.horizontalLine}
              />
              
          
               <Text style= {{marginTop:10}}>
                 { formatDate(item.closeDate) }  
                 Close date:  {closeDate}
            </Text>

              {/*<Text style={{ marginLeft: 15 }}> {item.details} </Text>*/}

             {/* item.openforbid  &&
              <InputArts artsData={item} /> */}
            
              <Text style={{ }}> {item.contact} </Text>
              
              {/*Product Individual page link*/}
              <View style={styles.buttonStyle}>
              <TouchableOpacity
                style={styles.submitButton} 
                onPress = { () => {Linking.openURL(`${item.url}`)}}>
                  <Text style={styles.submitButtonText}> Place bid </Text>
              </TouchableOpacity>
              </View>
              {/*Product Individual page link*/}
             
                
            </View>
          </View>
        )
      }}
    />
  )
}



export default Arts;