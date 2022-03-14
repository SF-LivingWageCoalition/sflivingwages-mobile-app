import React , {useState}from 'react';
import { Button, View, Text, ScrollView, StyleSheet, TouchableHighlight ,Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export default CampaignCard = (props) => {
    const [title, setTitle] = useState(props.title)
    const [url, setUrl] = useState(props.url)
    const [navigation, setNavigation] = useState(props.navigation)

    const [ isPress, setIsPress ] = useState(false)
    const touchProps = {
        activeOpacity: 1,
        underlayColor: 'none',                              
        style: isPress ? styles.btnPress : styles.btnNormal, 
        onHideUnderlay: () => setIsPress(false),
        onShowUnderlay: () => setIsPress(true),
        onPress: () => {
            setIsPress(true)
            navigation.goBack()
        } ,       
    }
    return(
            <View 
                    style={{
                        flexDirection: "row",
                        height: 36,
                        padding: 4,
                        margin: 10,
                        //backgroundColor: "#F1F9FF", 
                        alignContent: 'center'
                    }}
                    >   
                 <TouchableHighlight {...touchProps}  >
                <Text style={{ fontSize:24,  height: 30, 
                color: "#2699FB", paddingTop:6,paddingLeft:4,textAlign: "center"} }>
                     
                    <Icon name="chevron-left" size={20} color={isPress ? "gray" : "#c91a1a" }  
                     />           
                    </Text>
                    </TouchableHighlight>
                <Text style={{ fontSize:24, width:300, height: 100, 
                color: "#c91a1a", paddingLeft:20, textAlign: 'center'} }> {title}</Text>
                    <Text style={{ paddingTop:6, paddingLeft:20,height: 30} }
                    onPress={ ()=>{ 
                        Linking.openURL(url)}}>
                        { url && <Icon name="pencil" size={20} color="#c91a1a" />}</Text> 
                </View>
    )
}

const styles = StyleSheet.create({
    btnNormal: {
       //textShadowColor : "black"

      },
      btnPress: {
        //color : "black"
       //opacity:0.5
      }
})