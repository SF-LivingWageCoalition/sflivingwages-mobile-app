//Import Necessary Packages
import React from 'react';
import {
	View,
	Text,
	ActivityIndicator,
	StyleSheet,
	ScrollView,
	RefreshControl
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { withTheme } from 'react-native-elements';


export default class DonateScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			dataSource: null,
		}
	}
	fetchData = async () => {
		const response = await fetch('http://157.245.184.202:8080/donate')
		const data = await response.json()
		this.setState({
			isLoading: false,
			dataSource: data
		})

	}
	componentDidMount() {
		this.fetchData();
	}
	_onRefresh() {
		this.setState({ refreshing: true })
		this.fetchData().then(() => {
			this.setState({ refreshing: false })
		})
	}



	render() {


		if (this.state.isLoading) {
			return (
				<View style={styles.container}>
					<ActivityIndicator />
				</View>
			)
		} else {
			const data = this.state.dataSource.map((t, index) => {
				var title = (t.title);
				var body = (t.body);

				return (
					<View style={styles.item}>
						<ScrollView
							refreshControl={
								<RefreshControl
									refreshing={this.state.refreshing}
									onRefresh={this._onRefresh.bind(this)}
								/>
							}
						>

							<Text style={styles.titleAbout}>{title}</Text>
							<Text style={styles.aboutInfoText}>{body}</Text>


						</ScrollView>
					</View>
				)

			});
			return (
				<View>
					<ScrollView>
						<DonateNav
							navigate={this.props.navigation.navigate}
						/>
						{data}
					</ScrollView>
				</View>

			)


		}


	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		alignItems: 'center',
		justifyContent: 'center'
	},
	item: {
		flex: 1,
		alignSelf: 'stretch',
		margin: 10,
		alignItems: 'center',
		//justifyContent: 'center',
		backgroundColor: '#F5F5F5'

	},
	titleAbout: {
		fontSize: 24,
		color: '#c91a1a',
		padding: 10,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		paddingBottom: 20,
		paddingTop: 20,
	},
	aboutInfoText: {
		fontSize: 16,
		color: '#100c08',
		padding: 15,
		paddingHorizontal: 30,
	}

})