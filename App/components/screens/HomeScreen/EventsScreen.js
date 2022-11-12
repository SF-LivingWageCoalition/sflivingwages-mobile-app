//Import Necessary Packages
import React from 'react';
import { 
	Button, 
	View, 
	Text, 
	ScrollView, 
	StyleSheet, 
	ActivityIndicator, 
	Alert,
	RefreshControl} from 'react-native';

import HomeNavComponent from './HomeNavComponent';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';




export default class EventScreen extends React.Component {
	// static navigationOptions = {
	// 	title: 'Event',
	// };
	constructor(props) {
		super(props);
		this.state = {
			items: {},
			data: [],
		}
	}
	fetchData = async () => {
		const response = await fetch('http://157.245.184.202:8080/calendar')
		const d = await response.json()
		this.setState({
			data: d
		})
	}

	//getting data from database
	componentDidMount() {
		this.fetchData();
	}

	_onRefresh(){
		this.setState({refreshing:true})
		this.fetchData().then(()=>{
			this.setState({refreshing:false})
		})
	}
	
	render() {
		/*
			Get param, provide a fallback value
		*/

		let mark = {};
		this.state.data.forEach(day => {
			
			mark[day.start_date] = { 
				selectedColor: true,
				marked: true,
				dotColor: 'red'

			};

		});
		
		return (

			<ScrollView style={{ flex: 1 }}
			refreshControl = {
				<RefreshControl 
					refreshing = {this.state.refreshing}
					onRefresh = {this._onRefresh.bind(this)}
				/>
			}
			>
				

				{/*Page Contents*/}
				<View>
					<Text style={{backgroundColor: "white", textAlign:"center"}}>Check out our events below with red dot</Text>
					{<CalendarList style={styles.cal}
						onVisibleMonthsChange={(months) => {
							
						}}
						pastScrollRange={0}
						futureScrollRange={10}
						
						markedDates={mark}

						//original
						onDayPress={(day) => {
							console.log("-->", day.dateString)

							for (let i = 0; i < this.state.data.length; i++) {

								if (this.state.data[i].start_date === day.dateString) {
									console.log("--> this is an event", this.state.data[i].description, this.state.data[i].location)
									{

										<View>
											<Text style={styles.alertDates}>{Alert.alert(
												this.state.data[i].description, //Title

												"Where: " + this.state.data[i].location + '\n\n' +  //location
												"Time: " + this.state.data[i].duration + '\n\n' +
												"Description: " + this.state.data[i].notes, // notes- event's cost or description

												[
													{ text: 'Ok', onPress: () => console.log('Pressed') },
												]
												
											)}</Text>

										</View>
									}
									break;
								}

							}

						}}

					/>
					}

				</View>


			</ScrollView>

		)

	}

}

const styles = StyleSheet.create({
	item: {
		backgroundColor: 'white',
		flex: 1,
		borderRadius: 5,
		paddingLeft: 10,
		marginRight: 10,
		justifyContent: 'center',
		marginTop: 5,

	},
	emptyDate: {
		backgroundColor: 'green',
		flex: 1,
		borderRadius: 5,
		padding: 10,
		marginRight: 10,
		marginTop: 5,
		height: 20,
	},
	alertDates: {
		fontSize: 16,
		color: '#ed2121'
	}
});