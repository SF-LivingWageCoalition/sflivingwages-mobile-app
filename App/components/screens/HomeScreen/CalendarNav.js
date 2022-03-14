import React, {Component} from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

//For Calendar Navigation Bar
export default CalendarNav = (props) => {
	return(
		<View style={styles.homeNav}>
			<Text
			style={styles.homeNavText}
			onPress={() => props.navigate('TodayDate')}
			>
				Today Date
			</Text>

			<Text
			style={styles.homeNavText}
			onPress={() => props.navigate('plus')}
			>
				+
			</Text>


		</View>


	);
};

//need to add this into the styleSheet.js later
const styles = StyleSheet.create({
	homeNav: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'white',
		height: 20,
		alignItems: 'center'
	},
	homeNavText: {
	flex: 1,
	fontSize: 18,
	textAlign: 'center',
	}
});