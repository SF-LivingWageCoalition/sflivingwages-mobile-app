import React, { Component } from 'react';
import { Image, View,TouchableWithoutFeedback  } from 'react-native';
import { bannerStyle } from '../style/styleSheet';
import { withNavigation } from 'react-navigation';

class LogoHeader extends React.Component{
		render() {

	return (
				<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}>
			<Image
				source={ require('../../../assets/sflwc_logo_finaltemp.png') }
				style={
					bannerStyle.logoHeaderImageStyle
				}
			/>
				</TouchableWithoutFeedback>
		);
}}
export default withNavigation(LogoHeader);