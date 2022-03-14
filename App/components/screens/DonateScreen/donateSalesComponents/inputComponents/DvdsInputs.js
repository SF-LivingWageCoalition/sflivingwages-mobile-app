import React, { useState } from 'react';
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

import styles from '../style/styles';
import { useNavigation } from '@react-navigation/native';

const InputDvds = (props) => {

  const [bid, setBid] = useState('');
  const [name, setName] = useState('');
  const [phoneEmail, setPhoneEmail] = useState('');

  const onSubmitData = () => {
    //Text input validations:
    //console.log( "Bid: " + bid + " Name: " + name + " Email/Phone: " + phoneEmail);
    if (name === "" && phoneEmail === "") {
      Alert.alert("Error!", "Please enter all details");
    } else {
      if (bid !== "") {
        if (name !== "") {
          if (phoneEmail !== "") {
            Alert.alert("Submitted!", "Thanks for the purchase, " + name + "!");
            // Send the data to the DB
            fetch('http://157.245.184.202:8080/dvdsbid', {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: props.dvdsData.id,
                name: name,
                bid: bid,
                phoneEmail: phoneEmail,
                title: props.dvdsData.title

              })
            })
            // Clean the fields after user hits the submit button
            setBid('');
            setName('');
            setPhoneEmail('');
          } else {
            Alert.alert("Error!", "Please enter your phone or email id");
          }
        } else {
          Alert.alert("Error!", "Please enter your name");
        }
      } else {
        Alert.alert("Error!", "Please enter an amount to bid");
      }
    }
  }
  //Reset all fields 
  const resetAll = () => {
    setBid('');
    setName('');
    setPhoneEmail('');
  }
  return (
    <>

      {/* <Text style={{ marginLeft: 15 }}> {"Price: $" + props.dvdsData.bid} </Text> */}
      {/* <Text style={{ marginLeft: 15 }}> {"Last BID: $" + props.dvdsData.lastbid} </Text> */}

      {/* <TextInput
        style={styles.textInput}
        placeholder="Bidding amount"
        keyboardType='numeric'
        onChangeText={bidInput => setBid(bidInput)}
        value={bid.toString()}
      /> */}

      <View style={{ padding: 5 }} />
      {/* <TextInput
        style={styles.textInput}
        placeholder="Name"
        onChangeText={nameInput => setName(nameInput)}
        value={name}

      />

      <View style={{ padding: 5 }} />
      <TextInput
        style={styles.textInput}
        placeholder="Phone or Email"
        onChangeText={phoneEmailInput => setPhoneEmail(phoneEmailInput)}
        value={phoneEmail}
      /> */}

      <View style={styles.buttonStyle}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress = { () => {Linking.openURL('https://www.livingwage-sf.org/cd-and-book-sales/')}}
        >
          <Text style={styles.submitButtonText}> Shop</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.resetButton}
          onPress={resetAll}
        >
          <Text style={styles.resetButtonText}> Reset </Text>
        </TouchableOpacity> */}
      </View>
    </>
  )
}
export default InputDvds;