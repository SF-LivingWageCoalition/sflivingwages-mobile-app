import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Image,
    Button,
    Linking
} from 'react-native';
import CampaignTitle from './components/CampaignTitle';
import CampaignAction from './components/CampaignAction';
import { Checkbox } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import jsonData from './data/campaign1Details.json';

export default class CampaignFullDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    // componentDidMount(){
    //     this.setState({
    //         title: props.navigation.route.params.title,
    //         name: props.navigation.route.params.name,
    //         content: props.navigation.route.params.content
    //     })
    // }
 //  static propTypes = { url: React.PropTypes.string };
    handleClick = () => {
      Linking.canOpenURL(this.props.url).then(supported => {
        if (supported) {
          Linking.openURL(this.props.url);
        } else {
          console.log("Don't know how to open URI: " + this.props.url);
        }
      });
    };

    moveToMoreDetial(){
        this.props.navigate('Campaign')
    }
    render(){
        return (
            <ScrollView>

                <View style={styles.container}>

                <CampaignTitle title={ this.props.route.params.title} 
                        navigation={this.props.navigation} 
                        url={this.props.route.params.url} />
               
               <CampaignAction  navigation={this.props.navigation} 
              stepText={ this.props.route.params.actionTitle}  url={this.props.route.params.actionLink} />


                <View 
                    style={{
                        flexDirection: "row",
                        height: 100,
                        padding: 20,
                        margin: 10,
                       // backgroundColor: "white"
                    }}
                    >   
                {this.props.route.params.name && <Text style={{ fontSize:24,  color: "black"} }>
                 {this.props.route.params.name} </Text>} 
                </View>

                <View 
                    style={{
                        flexDirection: "row",
                        padding: 20,
                        marginLeft: 10,
                        marginRight:10,
                        //backgroundColor: "white"
                    }}
                    >
                        
                <View style={{ backgroundColor: "blue", flex: 0.3 }} />
                <View style={{ backgroundColor: "red", flex: 0.5 }} />
                
                
                { this.props.route.params.content && <Text style={styles.contentTextBody}>
                        {this.props.route.params.content}
                    
                </Text>}
                </View>
                <View style={{ backgroundColor: "#c91a1a",
                             marginLeft: 10,
                            marginRight:10,
                            height: 40 }} >
                    {/* <Text style={{margin: 10 } }
                        onPress={() => this.moveToMoreDetial}>Read More</Text> */}
                </View> 

                </View>

        
                
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
 

	container: {
		flex: 1,
	},

    contentTextBody: {
        fontFamily:"sans-serif",
        flexDirection: "row",
        textAlign: "auto",
        letterSpacing: 2,
        lineHeight: 30,
        fontSize: 18
        }
});