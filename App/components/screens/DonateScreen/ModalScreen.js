
import React , {useState}from 'react';
import { Button, View, Text , Image, TouchableOpacity, Dimensions,ScrollView } from 'react-native';
import styles from './donateSalesComponents/style/styles';
import ImageZoom from 'react-native-image-pan-zoom';

export default function ModalScreen({ route, navigation }) {
    //const [imageURL, setImageUR] = useState(navigation.route.params.image)
    const { image }  = route.params
    const { width, height } = Dimensions.get('window');
    return (
      <View style={{ flex: 1 }}>
          <ScrollView>
        {/* <Text style={{ fontSize: 30 }}>This is a modal!</Text> */}
        {/* <Button onPress={() => navigation.goBack()} title="Dismiss" /> */}
  
        <ImageZoom
          cropWidth={width}
          cropHeight={height}
          imageWidth={width}
          imageHeight={height}> 
          <Image
            style={{ width: width, height: height}}
            source={{ uri: image }} ></Image>
          </ImageZoom>

      
          </ScrollView>
      </View>
    );
  }