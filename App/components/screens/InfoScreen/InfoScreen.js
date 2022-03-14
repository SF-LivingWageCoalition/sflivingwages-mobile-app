//Import Necessary Packges
import React from 'react';
import {
	Button, View, Text, ActivityIndicator, StyleSheet, ScrollView,
	LayoutAnimation, Platform, UIManager, TouchableOpacity, Linking
} from 'react-native';
//import { createStackNavigator, createAppContainer } from 'react-navigation';

import DropDownItem from 'react-native-drop-down-item';
//import { withTheme } from 'react-native-elements';

const IC_ARR_DOWN = require('../../screens/DonateScreen/icons/ic_arr_down.png');
const IC_ARR_UP = require('../../screens/DonateScreen/icons/ic_arr_up.png');

export default class InfoScreen extends React.Component {
	/*=====Change the navigation styling for this page=========*/
	// static navigationOptions = {
	//   title: 'Info',
	//   headerBackTitle: ''
	// };
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			dataSource: null,
			dataSourceMaquiladoraWorkers: null,
			expanded: false
		}
	}

	fetchData = async () => Promise.all([
		fetch('http://157.245.184.202:8080/ourcampaigns'),
		fetch('https://www.livingwage-sf.org/wp-json/wp/v2/posts?include=6248,5212,6825')],)
		.then(([dataSource,dataSourceMaquiladoraWorkers]) =>
			Promise.all([
				dataSource.json(), dataSourceMaquiladoraWorkers.json()
			]))
		.then(([dataSource,dataSourceMaquiladoraWorkers]) => this.setState({
			dataSource: dataSource,
			dataSourceMaquiladoraWorkers: dataSourceMaquiladoraWorkers,
			isLoading: false,
		}))

		.catch(error => {
			console.error(error);
		});

	componentDidMount() {

		this.fetchData();
	}


	render() {
		if (this.state.isLoading) {
			return (
				<View style={styles.container}>
					<ActivityIndicator />
				</View>
			)
		} else {

			let data = this.state.dataSource.map((t, index) => {
				console.log(t)
				return (
					<DropDownItem
						key={index}
						style={styles.dropDownItem}
						contentVisible={false}
						invisibleImage={IC_ARR_DOWN}
						visibleImage={IC_ARR_UP}
						header={
							<View style={styles.header}>
								<Text style={{
									fontSize: 16,
									color: '#0088dc',
									paddingTop: 10,
									textTransform: 'uppercase',
								}}>{t.title}</Text>
							</View>
						}
					>
						<Text style={styles.txt}>
							{t.body}
						</Text>

					</DropDownItem>
				);
			})

			let dataMaquiladora = this.state.dataSourceMaquiladoraWorkers.map((t, index) => {


				var updatedTitle = (t.title.rendered);
				var updatedExcerpt = (t.excerpt.rendered)
					.replace(/<p>/, '')
					.replace(/Read more:.*/, '\n\nRead more')
					.replace(/<\/p>/, '')
			.replace(/<a.*>/,'\n\nRead More');
				console.log(t)
				return (
					<DropDownItem
						key={index}
						style={styles.dropDownItem}
						contentVisible={false}
						invisibleImage={IC_ARR_DOWN}
						visibleImage={IC_ARR_UP}
						header={
							<View style={styles.header}>
								<Text style={{
									fontSize: 16,
									color: '#0088dc',
									paddingTop: 10,
									textTransform: 'uppercase',
								}}>{updatedTitle}</Text>
							</View>
						}
					>
						<Text style={styles.txt} onPress={() => Linking.openURL(t.link)}>
							{updatedExcerpt}
						</Text>

					</DropDownItem>
				);
			})


			return (
				<View style={styles.item}>
					<Text style={styles.titleCam}>Our Campaigns</Text>

					<ScrollView>
						{data}
						{dataMaquiladora}
					</ScrollView>
				</View>

			)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		alignItems: 'center',
		justifyContent: 'center'
	},
	item: {
		flex: 1,
		alignSelf: 'stretch',
		margin: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F5F5F5',

	},
	titleCam: {
		fontSize: 24,
		color: '#c91a1a',
		padding: 10,
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},

	header: {
		width: '100%',
		paddingVertical: 0,
		paddingHorizontal: 30,
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F5F5F5',
	},
	txt: {
		fontSize: 16,
		color: '#100c08',
		paddingHorizontal: 10,
	},
	dropDownItem: {
		marginTop: 20,
	},
})