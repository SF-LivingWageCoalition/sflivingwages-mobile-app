import React from 'react';
import { Button, View, Text, ScrollView, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';


export default CampaignCard = (props) => {


    return  (
    
    <ScrollView style={{ flex: 1}}>
		<View style={styles.homeNav}>
			<Text 
			style={styles.homeNavText}
			onPress={() => props.navigate('CampaignDetailpage')}
			>
		    Raise Wage
			</Text>
			{/* <Text
			style={styles.homeNavText}
			onPress={() => props.navigate('Kind')}
			>
			In-Kind
			</Text> */}
			{/* <Text
			style={styles.homeNavText}
			onPress={() => props.navigate('Sales')}
			>
			Sales
			</Text> */}
		</View>
	</ScrollView>
         )
    // <Button title="Raise Wage" color="#c91a1a" onPress={() => {
    //   this.props.navigation.navigate('CampaignDetailpage',
    //     {
    //       title: this.props.title
    //     })
    // }}
    // />;

}

const styles = StyleSheet.create({
    campaignNav: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#870c18',
		height: 40,
		alignItems: 'center'
	},
	campaignText: {
	flex: 1,
	fontSize: 28,
	fontWeight: 'bold',
	color: '#fff',
	textAlign: 'center',
	},

	
});