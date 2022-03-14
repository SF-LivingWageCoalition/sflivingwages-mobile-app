import React from 'react';
import { Platform, StyleSheet } from 'react-native';
// import LogoHeader from '../stacks/LogoHeader';
//copy and paste to import the styles to your 
//import styles from '../style/styleSheet'


export const styles = StyleSheet.create({
/*
	container style does not contain Platform.select so both ios and android will have the same styling
	container already has its own {braces} so for styling, you only need a single set of brace to hold it.
	Ex: <View style = {styles.container} />
*/
	container: { 
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'center' 
	}, 
}); 

export const bannerStyle = StyleSheet.create({ 
/*
	logoHeaderImageStyle style both ios and android will have flex:1, but ios and android will have platform specific height:
	logoHeaderImageStyle already has its own {braces} so for styling, you only need a single set of brace to hold it.
	Ex: <View style = {bannerStyle.logoHeaderImageStyle} />
*/
	logoHeaderImageStyle: { 
		/* non-platform specific styling */
		flex:1, 
		...Platform.select({ 
			/* ios styling */
			ios: { 
				height: 55, 
				width: 180, 
				resizeMode: 'contain', 
				marginBottom: 10, 
				alignItems: 'center', 
				justifyContent: 'center' 
			}, 
			/* android styling */
			android: { 
				height: 55, 
				width: 180, 
				resizeMode: 'contain', 
				marginBottom: 5, 
				alignItems: 'center', 
				justifyContent: 'center' 
			}, 
		}), 
	}, 
/*
	bannerHeaderStyle style on both ios and android will have the same background color, but the height of the banner will be different for both android and ios
	bannerHeaderStyle already has its own {braces} so for styling, you only need a single set of brace to hold it.
	Ex: <View style = {bannerStyle.bannerHeaderStyle} />
*/
	bannerHeaderStyle: {
		/* non-platform specific styling*/
		backgroundColor: '#d31623',
		...Platform.select({
			/* ios styling */
			ios: {
				height: 55,
			},
			/* android styling */
			android: {
				height: 70,
			},
		}),	
	},
});