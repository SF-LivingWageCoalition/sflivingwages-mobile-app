import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Image,
    Linking,
    ImageBackground,
    Dimensions
} from 'react-native';

import CampaignTitle from './components/CampaignTitle';
import { Checkbox } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Title, Paragraph } from 'react-native-paper';
import jsonData from './data/campaign3Details.json';

var { width } = Dimensions.get("window");

export default class CampaignThreeDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "REFORM A BROKEN \n IMMIGRATION SYSTEM",
            url: "https://www.livingwage-sf.org/pledge-of-resistance/",
        }
    }

    moveToMoreDetial(){
       // this.props.navigate('Campaign')
    }
    render(){
        return (
            <ScrollView style={{ backgroundColor: "#f8f8ff" }}>

                <View style={styles.container}>
                    <CampaignTitle title={ this.state.title} 
                                navigation={this.props.navigation} 
                                url={this.state.url} />
               
               <View style={styles.topbackground}>
                        <ImageBackground source={require('./../../../../assets/immigrant.jpg')} style={{ height: 400, width: width }}>
                            <Text Text style={{
                                paddingTop: 300, fontSize: 36, fontWeight: "bold",
                                //color: "#2699FB",
                                color: "white",
                                // textAlign: 'center',
                                marginLeft: 10,
                                textShadowColor: 'black',
                                textShadowRadius: 20
                            }}>
                                IMMIGRATION REFORM</Text>
                        </ImageBackground>
                </View>

                <View style={[styles.subTitle, {marginBottom: 16}]} >
                        <Paragraph style={{ paddingLeft: 20, fontSize: 17 }}>
                        A broken immigration system is pushing undocumented workers into the shadows, leaving workers vulnerable to violations of their workplace rights, 
                        forcing them to accept lower pay, and creating guest worker programs in which the employers can have workers deported for speaking out for better conditions.
                        </Paragraph>
                </View>


                <View style={[styles.subTitle, {marginBottom: -15}]} >
                    <Title style={{paddingLeft:20, fontSize:23, color:"black", /*fontFamily: "Helvetica" */}}> 
                    a. Dignity Campaign{'\n'}
                    </Title>
                </View>

                <View 
                    style={[styles.myBox, { marginBottom: 8 }]}
                    >
                <Paragraph style={{
                        flexDirection: "row",
                        fontSize: 17
                        }}
                        >
                The Dignity Campaign creates a vision of progressive immigration reform. 
                We are part of a national network of immigrant rights organizations that 
                are building a grassroots movement that is demanding immigration reform 
                that provides full legalization, family reunification, an end to employer 
                sanctions and other workplace enforcement, an end to the militarization of 
                the border, 
                and an end to guest worker programs. </Paragraph>
                </View>
                <View style={[styles.readMore, {marginBottom: 10}]} >
                    <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                        onPress={() => Linking.openURL('https://www.livingwage-sf.org/immigration-reform/dignity-campaign/')}> More details on our website</Text>
                    <Icon name="arrow-right" size={20} style={{ "marginLeft": 10 }} />
                </View>

                </View>

                <View style={[styles.subTitle, {marginBottom: -13 }]} >
                    <Title style={{paddingLeft:20, fontSize:23, color:"black", /*fontFamily: "Helvetica"*/ }}>
                    b. Stopping the Cancellation of Temporary Protected Status{'\n'}
                    </Title>
                </View>

                <View 
                    style={[styles.myBox, { marginBottom: 8 }]}
                    >
                

                <Paragraph style={{
                        flexDirection: "row",
                        fontSize: 17
                        }}>
                    Temporary Protected Status (TPS) is a program enacted by the U.S.
                     Congress in the 1990s to enable immigrants from countries that are 
                     experiencing armed conflict or a natural disaster the right to work 
                     and live in the United States. In 2018, the Trump administration moved
                      to cancel TPS for more than 400,000 migrants in the United States. 
                      The San Francisco Living Wage Coalition, along with many other organizations, 
                      formed the NorCal TPS Coalition to help protect TPS holders.</Paragraph>
                
                </View>
                <View style={[styles.readMore, {marginBottom: 10}]} >
                    <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                        onPress={() => Linking.openURL('https://www.livingwage-sf.org/immigration-reform/stopping-the-cancellation-of-temporary-protected-status/')}> More details on our website</Text>
                    <Icon name="arrow-right" size={20} style={{ "marginLeft": 10 }} />
                </View>
                
                <View style={[styles.subTitle, {marginBottom: -13 }]} >
                    <Title style={{paddingLeft:20, fontSize:23, color:"black", /*fontFamily: "Helvetica"*/ }}>
                    c. Stop the Raids and Deportations{'\n'}
                    </Title>
                </View>

                <View 
                    style={[styles.myBox, { marginBottom: 8 }]}
                    >
                

                <Paragraph style={{
                        flexDirection: "row",
                        fontSize: 17
                        }}>
                    Sign the Pledge of Resistance to take immediate action in the event 
                    that ICE targets any one of us or an employer threatens a worker with 
                    firing based on immigration status.</Paragraph>
                
                </View>
                <View style={[styles.readMore, {marginBottom: 30}]} >
                    <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                        onPress={() => Linking.openURL('https://www.livingwage-sf.org/pledge-of-resistance/')}> More details on our website</Text>
                    <Icon name="arrow-right" size={20} style={{ "marginLeft": 10 }} />
                </View>
                
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
 

	container: {
		flex: 1,
	},

    subTitle: {
        borderTopLeftRadius: 10, borderTopRightRadius: 10,
        // borderTopWidth:1,borderLeftWidth:1, borderRightWidth:1,  
        marginLeft: 10, marginTop: 30, marginRight: 10, flex: 0.3
    },


    myBox: {
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 10,
        marginRight: 10,
        // borderLeftWidth:1,
        // borderRightWidth:1,
        //backgroundColor: "white"
    },
    readMore: {
        // backgroundColor: "#c91a1a", 
        marginLeft: 27,
        marginRight: 10,
        marginBottom: 10,
        height: 40,
        flexDirection: 'row'
    },

    topbackground: {
        height: 400,
        borderColor: '#95989a',
        borderWidth: 1,
        backgroundColor: "white",
        marginTop: 30
    },

})