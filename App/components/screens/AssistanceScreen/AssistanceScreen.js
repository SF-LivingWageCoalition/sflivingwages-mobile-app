import React, { useRef, useCallback, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Image,
	Linking,
	Button,
	Alert
} from 'react-native'
import Recaptcha from 'react-native-recaptcha-that-works';
import qs from "querystring";
import { SafeAreaView } from 'react-native-safe-area-context';

const sendEmail = async (to, subject, body, options = {}) => {
	const { cc, bcc } = options;
	let url = `mailto:${to}`;
	// Create email link query
	const query = qs.stringify({
		subject: subject,
		body: body,
		cc: cc,
		bcc: bcc
	});
	if (query.length) {
		url += `?${query}`;
	}
	// check if we can use this link
	const canOpen = await Linking.canOpenURL(url);
	if (!canOpen) {
		throw new Error('Provided URL can not be handled');
	}


	return Linking.openURL(url);
}

const Assistancecreen = () => {



	const [fullName, setFullName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPhone, setUserPhone] = useState('');
	const [userNotes, setUserNotes] = useState('');

	const [valid, setIsValid] = useState(false);

	const [isEmpty, setEmpty] = useState(false)

	const onSubmitData = () => {

		if ((fullName.length === 0 || userEmail.length === 0 || userNotes.length === 0 || userPhone === 0)) {
			setEmpty(true)
		}

		if (valid && (fullName.length > 0 || userEmail.length > 0 || userNotes.length > 0 || userPhone > 0)) {
			setEmpty(false)
			const strBodyFormat = `
							My Name ${fullName}
							My Email ${userEmail}
							My Phone ${userPhone}
							My situation ${userNotes}
					`
			sendEmail(
				'<sanfranciscolivingwagecoalition@assist.com>', // San Francisco Living Wage Coalition Email.
				'Assist',
				strBodyFormat,
			)
				.then(() => {
					resetAll()
				});

		}
	}

	const resetAll = () => {
		setFullName('');
		setUserEmail('');
		setUserPhone('');
		setUserNotes('');
	}

	const recaptcha = useRef(null);

	const send = useCallback(() => {
		recaptcha.current.open();
	}, []);

	const close = useCallback(() => {
		recaptcha.current.close();
	}, [])

	const onVerify = (token) => {

		const secretKey = '<secret_key>' // server

		// verify token on server 
		fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`)
			.then(resp => resp.json())
			.then((data) => {
				// If it's not a success..
				if (!data.success) {
					// ERROR
					setIsValid(false)
				} else {
					console.log(data);
					setEmpty(false)
					setIsValid(true);
				}
			});
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
						<Text style={{ marginLeft: 10 }}>Full Name <Text style={styles.requiredField}>*</Text></Text>
						<TextInput
							style={styles.textInput}
							onChangeText={fullNameInput => setFullName(fullNameInput)}
							value={fullName}
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text style={{ marginLeft: 10 }}>E-mail <Text style={styles.requiredField}>*</Text></Text>
						<TextInput
							style={styles.textInput}
							keyboardType='email-address'
							onChangeText={userEmailInput => setUserEmail(userEmailInput)}
							value={userEmail}
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text style={{ marginLeft: 10 }}>Phone <Text style={styles.requiredField}>*</Text></Text>
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
						<Text style={{ marginLeft: 3 }}>Note <Text style={styles.requiredField}>*</Text></Text>
						<TextInput
							style={styles.textInput}
							onChangeText={userNotesInput => setUserNotes(userNotesInput)}
							value={userNotes}
						/>
					</View>
					{isEmpty ?
						<Text style={styles.recaptchaMessage}>Fields marked with an * are required </Text>
						: null
					}
					<SafeAreaView>
						<View style={styles.buttonStylesRecaptcha}>
							<Recaptcha
								headerComponent={<Button title='close' onPress={close} />}
								lang={'en'}
								ref={recaptcha}
								siteKey='<site_key>' // site key
								baseUrl='<http://my-test-domail.me>' // San Francisco Living Wage Coalition domain
								onVerify={onVerify}
								size={'normal'}
								theme={'light'}
							/>
							<Button title="Recaptcha" onPress={send} />
						</View>
					</SafeAreaView>
					{isEmpty ?
						<Text style={styles.recaptchaMessage}>Please compleate the recaptcha before submit</Text>
						: null
					}
					<View style={styles.buttonStyles}>
						<TouchableOpacity onPress={onSubmitData}>
							<View style={styles.submitButton} >
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
		margin: 10,
	},
	requiredField :{
		color: '#d31623',
		fontSize : 16,
		fontWeight: '900'
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
		paddingBottom: 20
	},
	buttonStylesRecaptcha: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		padding: 5,
	},
	recaptchaMessage: {
		fontSize: 15,
		fontWeight: '600',
		textAlign: 'center',
		color: '#D31623',
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

	inputContainer: {
		margin: 12
	}
});
export default Assistancecreen;