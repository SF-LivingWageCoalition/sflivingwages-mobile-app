import React, { useState, useEffect } from 'react';

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
import ImageZoom from 'react-native-image-pan-zoom';

import styles from './style/styles';
import InputDvds from './inputComponents/DvdsInputs';
import MyNavigationButton from './MyNavigationButton';
import { useNavigation } from '@react-navigation/native';
import Card from '../Card/Card';

const Dvds = ({ dvds }) => {
  const navigation = useNavigation();
  const calculateTimeLeft = (value) => {
    // Set bid end day here
    let year = new Date().getFullYear();
    let endDate = value // books[0].closeDate;
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });
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
  return (
    // <FlatList
    //   horizontal={false}
    //   data={dvds}
    //   keyExtractor={(item, index) => index.toString()}
    //   renderItem={({ item }) => {
    //     return (
    //       <View style={{ flex: 1 }}>
    //         <View style={styles.cardImage}>
    //           <Text style={{ fontSize: 24, marginLeft: 15 }}> {item.title} </Text>
    //           <TouchableHighlight 
    //                 underlayColor = 'gray'
    //                 onPress={ () => { 
    //                   if (item.long_description != null ) {
    //                   navigation.navigate(  'Details', {
    //                     image: item.author_image,
    //                     bio: item.long_description,
    //                     title: item.title}) 
    //                   } else {
    //                     Alert.alert(
    //                       "",
    //                       "No Detail",
    //                       [{  text: "Check back later",
    //                         onPress: () => console.log("Check back later pressed")}]
    //                     );
    //                   }
    //                 }
    //               }

    //               onLongPress = {() => {navigation.navigate('Preview', {image: item.path})}}>

    //               <Image style={styles.imageStyle}
    //                 source={{ uri: item.path }} />


    //           </TouchableHighlight>
    //           <Text>Long pressd to zoom or Tap to show details</Text>
    //           {/* <Text>
    //             {timerComponents.length ? timerComponents : "Bid is closed!"}
    //             {timerComponents.length ? item.openforbid = "left" : item.openforbid = null }
    //         </Text> */}
    //           <View style={styles.horizontalLine} />

    //           <Text style={{ marginLeft: 15 }}> {item.details} </Text>

    //           {/*Product Individual page link*/}
    //           <View style={styles.buttonStyle}>
    //           <TouchableOpacity
    //             style={styles.submitButton} 
    //             onPress = { () => {Linking.openURL(`${item.url}`)}}>
    //               <Text style={styles.submitButtonText}> Shop </Text>
    //           </TouchableOpacity>
    //           </View>
    //           {/*Product Individual page link*/}

    //           {/* item.openforbid  &&
    //           <InputDvds dvdsData={item} /> */}

    //           <Text style={{ marginLeft: 15 }}> {item.contact} </Text>

    //           {/* { (item.long_description && item.author_image) &&
    //           <MyNavigationButton author={item.author_image} description={item.long_description}
    //             title={item.title}
    //           />} */}
    //         </View>
    //       </View>
    //     )
    //   }}
    // />
    <FlatList
      horizontal={false}
      data={dvds}
      renderItem={({ item }) => <Card
        key={item.id}
        categoryId={192}
        name={item.name}
        short={item.short_description}
        price={item.prices.price}
        image={item.images[0].thumbnail}

      />}
    />
  )
}

export default Dvds;