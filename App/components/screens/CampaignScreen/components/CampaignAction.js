import React , {useState}from 'react';
import { Button, View, Text, ScrollView, StyleSheet,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default CampaignCard = (props) => {
    const [stepText, setStepText] = useState(props.stepText)
    const [url, setUrl] = useState(props.url)
    const [navigation, setNavigation] = useState(props.navigation)
    return(
        <View>
        <View 
        style={{
            padding: 20,
            marginLeft: 10,
            marginRight:10,
            //backgroundColor: "white"
        }}>
       {stepText &&  <Text style={{ fontFamily:"sans-serif", fontSize:24, width:260, height: 30, 
        color: "black", paddingLeft:20, fontWeight: "bold", textAlign: 'center'} }>  Action Steps:  
        </Text>}</View>
        
        <View 
        style={{ flexDirection: "row",paddingLeft:20,  }}>
         {stepText && <Text style={{ color:"#c91a1a"}}>1 </Text>} 
         {stepText && <Text >{stepText}</Text>}
        </View>
        <View 
        style={{paddingLeft:20,  }}>
        {url && <Text style={{ color:"blue"}}  onPress={ ()=>{ 
            Linking.openURL(url)}}>Click here</Text>}
        </View>
        </View>
    )
}