import React, {useEffect, useState} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Image,
	Alert,
	Linking,
	Button

} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


const Introduction = () => {
	const [about, setAbout] = useState("");

	const getAbout = async () => {
		const response = await fetch("http://157.245.184.202:8080/about", {
			method: 'GET'
		});

		const getAbout = await response.json();
		setAbout(getAbout[0].aboutinfo);
	};

	
	useEffect(() => {
		getAbout();
	}, []);
	
	return(
	<ScrollView style={{backgroundColor: '#f8f8f8'}}>
		<View style ={{margin: 30}}>
			<View style={{paddingBottom: 10}}>
        		<Text style={{/*fontFamily: "Arial",*/ fontSize: 26, fontWeight: 'bold'}}>About Us</Text>
			</View>
			<Text style={{/*fontFamily: "Helvetica",*/ fontSize: 16}}>{about}</Text>
    	</View>
		<View style={{flexDirection: 'row', marginLeft: 30}}>
			    {/* <Icon name="heart" size={20} color="#d32029" style={{marginTop: 13}}/> */}
				<TouchableOpacity onPress={()=> Linking.openURL('https://www.livingwage-sf.org/donations-and-membership/')} style={{elevation: 8,
    														backgroundColor: "#177ddc",
    														borderRadius: 10,
    														paddingVertical: 12,
    														paddingHorizontal: 10,
															// marginLeft: 12,
															elevation: 8,
															shadowColor: '#177ddc',
															shadowOpacity: 0.6,
                                                            shadowRadius: 3 ,
                                                            shadowOffset : { width: 1, height: 1},
															}}>
    					<Text style={{fontSize:20, color: "#ffffff"}}>Donate and help our cause</Text>
  				</TouchableOpacity>
		</View>
	</ScrollView>
	)
}

const styles = StyleSheet.create({
  
})


export default Introduction;