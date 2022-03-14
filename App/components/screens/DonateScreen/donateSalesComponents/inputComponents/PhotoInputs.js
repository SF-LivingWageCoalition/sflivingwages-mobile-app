
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
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

import styles from '../style/styles';

const InputPhotos = (props) => {

  const [bid, setBid] = useState('');
  const [name, setName] = useState('');
  const [phoneEmail, setPhoneEmail] = useState('');

  const onSubmitData = () => {
    //Text input validations:
    //console.log( "Bid: " + bid + " Name: " + name + " Email/Phone: " + phoneEmail);
    if (bid === "" && name === "" && phoneEmail === "") {
      Alert.alert("Error!", "Please enter all details");
    } else {
      if (bid !== "") {
        if (name !== "") {
          if (phoneEmail !== "") {
            Alert.alert("Submitted!", "Thanks for your bid, " + name + "!");
            // Send the data to the DB
            fetch('http://157.245.184.202:8080/photosbid', {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: props.photoData.id,
                name: name,
                bid: bid,
                phoneEmail: phoneEmail,
                title: props.photoData.title
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

      <Text style={{ marginLeft: 15 }}> {"Minimum BID: $" + props.photoData.lastbid} </Text>
      <Text style={{ marginLeft: 15 }}> {"Last BID: $" + props.photoData.bid} </Text>

      <TextInput
        style={styles.textInput}
        placeholder="Bidding amount"
        keyboardType='numeric'
        onChangeText={bidInput => setBid(bidInput)}
        value={bid.toString()}
      />

      <View style={{ padding: 5 }} />
      <TextInput
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
      />

      <View style={styles.buttonStyle}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={onSubmitData}
        >
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetAll}
        >
          <Text style={styles.resetButtonText}> Reset </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
export default InputPhotos;