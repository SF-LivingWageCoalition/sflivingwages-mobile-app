import React,{useState,useEffect} from 'react';
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

  import InputPhotos from './inputComponents/PhotoInputs';

  import styles from './style/styles';
  import MyNavigationButton from './MyNavigationButton';
  import { useNavigation } from '@react-navigation/native';

const Photos = ({photos}) => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState('');
  const [closeDate, setCloseDate] = useState('');
  const calculateTimeLeft = (value) => {
    // Set bid end day here
    let year = new Date().getFullYear();
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
     
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
    useEffect(() => {
    
    });
    const timerComponents = [];
  
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
      return(
        
        <FlatList
        horizontal={false}
        data={photos}
        keyExtractor={(item, index) => index.toString()}

        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1 }}>
              <View style={styles.cardImage}>
              <Text style={{textAlign: "center", fontSize:18,marginBottom: 15, fontWeight: 'bold' }}> {item.title} </Text>
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

                  onLongPress = {() => {navigation.navigate('Preview', {image: item.path})}}>

                  <Image
                    style={styles.imageStyle}
                    source={{ uri: item.path }}
                  />
                
                </TouchableHighlight>
                <Text style={{ textAlign: "center", fontStyle: 'italic'}}>Long press to zoom or Tap to show details</Text>
              
                <View style={styles.horizontalLine} />
                {/*<Text>Current date: {currentDate} </Text>*/}
               <Text style= {{marginTop:10}}>
       
                { formatDate(item.closeDate) }  
                 Close date:  {closeDate}

            </Text>
                {/*<Text style={{ marginLeft: 15 }}> {item.details} </Text>*/}

                {/* item.openforbid  &&
               <InputPhotos photoData={item}/>*/}
 
                {/*<Text style={{ marginLeft: 15 }}> {item.contact} </Text>*/}
                
                {/* { (item.long_description && item.author_image) &&
                <MyNavigationButton author={item.author_image} description={item.long_description}
                title={item.title}
              /> } */}

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

export default Photos;