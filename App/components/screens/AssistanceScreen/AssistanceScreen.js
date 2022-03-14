import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Image,
	Alert

} from 'react-native';

import { Checkbox } from 'galio-framework';



const Assistancecreen = () => {

	const [fullName, setFullName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPhone, setUserPhone] = useState('');
	const [userNotes, setUserNotes] = useState('');

	const onSubmitData = () => {
		if(fullName.length === 0 || userEmail.length === 0|| userNotes.length === 0 || userPhone === 0){
			Alert.alert("Must enter name and contact information to submit");
		}
		
		else{
			fetch('http://157.245.184.202:8080/assistance', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					full_name: fullName,
					email: userEmail,
					phone: userPhone,
					notes: userNotes
				})
			})

			Alert.alert("We recieve your complain. We will contact you soon")
	    }
		
		setFullName('');
		setUserEmail('');
		setUserPhone('');
		setUserNotes('');
	}
	
	const resetAll = () => {
		setFullName('');
		setUserEmail('');
		setUserPhone('');
		setUserNotes('');
	}
	return (
		<ScrollView>

			<View style={styles.container}>

				<View style={styles.card}>
					<View style={styles.logoContainer}>
						<Image style={styles.logo} source={require('../../../../assets/icon.png')} />
					</View>
					<Text style={{ marginLeft: 20, marginTop: 10 }}>We can assist you.</Text>
					<Text style={{ marginLeft: 20, marginBottom: 30 }}>Complete the form below.</Text>
                    
					<View style={styles.inputContainer}>
						<Text style={{marginLeft: 10}}>Full Name</Text>
						<TextInput
							style={styles.textInput}
							onChangeText={fullNameInput => setFullName(fullNameInput)}
							value={fullName}
						/>
					</View>
                    
					<View style={styles.inputContainer}>
						<Text style={{marginLeft: 10}}>E-mail</Text>
						<TextInput
							style={styles.textInput}
							keyboardType='email-address'
							onChangeText={userEmailInput => setUserEmail(userEmailInput)}
							value={userEmail}
						/>
					</View>
                    
					<View style={styles.inputContainer}>
						<Text style={{marginLeft: 10}}>Phone</Text>
						<TextInput
							style={styles.textInput}
							keyboardType='numeric'
							onChangeText={userPhoneInput => setUserPhone(userPhoneInput)}
							value={userPhone}
						/>
					</View>
					
					<Text style={{ marginBottom: 10, marginLeft: 20 }} >Brief description of your situation, type in topic using example down below</Text>
					<Text style={{ marginLeft: 20 }} >Wage theft</Text>
					<Text style={{ marginLeft: 20 }} >Unpaid overtime</Text>
					<Text style={{ marginLeft: 20 }} >No break</Text>
					<Text style={{ marginLeft: 20 }} >Discrimination</Text>
                    
					<View style={styles.inputContainer}>
						<Text style={{marginLeft: 3}}>Note</Text>
						<TextInput
							style={styles.textInput}
							onChangeText={userNotesInput => setUserNotes(userNotesInput)}
							value={userNotes}
						/>
                    </View>
					
					<View style={styles.buttonStyles}>

						<TouchableOpacity onPress={onSubmitData}>
							<View  style={styles.submitButton} >
								<Text style={styles.submitButtonText} >Submit</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity style={styles.submitButton} onPress={resetAll}>
							<Text style={styles.submitButtonText}>Clear</Text>
						</TouchableOpacity>

					</View>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	card: {
		paddingTop: 35,
		backgroundColor: 'white',
		margin: 10,
		padding: 1,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 10
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10
	},
	textInput: {
		height: 30,
		borderBottomColor: '#d31623',
		borderBottomWidth: 1,
		margin: 10
	},
	submitButton: {
		backgroundColor: 'white',
		borderColor: '#d31623',
		borderWidth: 1,
		padding: 10,
		width: 100,
		height: 40,
		marginTop: 20,
		borderRadius: 10,

	},
	buttonStyles: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		padding: 5,
		paddingBottom: 35
	},
	logo: {
		width: 200,
		height: 200,
		borderRadius: 200 / 2
	},
	logoContainer: {
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	submitButtonText: {
		color: '#d31623',
		fontWeight: "900",
		textAlign: "center"
	},

	inputContainer:{
		margin: 12
	}
});
export default Assistancecreen;