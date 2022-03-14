import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    Linking,
    ImageBackground
} from 'react-native';

import { Checkbox } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import CampaignTitle from './components/CampaignTitle';
import jsonData from './data/campaign1Details.json';
import actionData from './data/campaignActions.json';
import { Title, Paragraph } from 'react-native-paper';


export default class CampaignDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "RAISE WAGES",
            url: "https://actionnetwork.org/petitions/raise-wages-for-economic-recovery?source=email&;",


        }
    }

    moveToMoreDetial() {
        // this.props.navigate('Campaign')
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: "#f8f8ff" }}>

                <View style={styles.container}>
                    <CampaignTitle title={this.state.title}
                        navigation={this.props.navigation}
                        url={this.state.url} />

                    <View style={styles.topbackground}>
                        <ImageBackground source={require('./../../../../assets/wageraise.jpg')} style={{ height: 400 }}>
                            <Text Text style={{
                                paddingTop: 300, fontSize: 36, fontWeight: "bold",
                                //color: "#2699FB",
                                color: "white",
                                // textAlign: 'center',
                                marginLeft: 10,
                                textShadowColor: 'black',
                                textShadowRadius: 20
                            }}>
                                Raise Wages</Text>
                        </ImageBackground>
                    </View>

                    <View style={styles.subTitle} >
                        <Title style={{ paddingLeft: 20, fontWeight: "bold", /*fontFamily: "Helvetica"*/ }}>
                            Action:
                        </Title>
                        <Paragraph style={{ paddingLeft: 20, fontSize: 16, color: "black", paddingRight: 20 }}>
                            {actionData[0].title}
                        </Paragraph>
                        <Text style={{ paddingLeft: 20, fontSize: 16, color: "#0000ff", paddingTop: 8, textDecorationLine: 'underline', paddingRight: 20 }}
                        onPress={() => Linking.openURL(actionData[0].link)}>
                            {actionData[0].link}
                        </Text>
                    </View>

                    <View style={styles.subTitle} >
                        <Title style={{ paddingLeft: 20, fontWeight: "bold", fontSize: 23, marginBottom: 10, /*fontFamily: "Helvetica"*/}}>
                            {jsonData[0].name}
                        </Title>
                    </View>

                    <View
                        style={[styles.myBox, {marginBottom: 8}]}>
                        <Paragraph style={{ fontSize: 17 }}>
                            {jsonData[0].content}</Paragraph>
                    </View>
                    <View style={styles.readMore} >
                        <Text style={{color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                            onPress={() => Linking.openURL('https://www.livingwage-sf.org/raising-wages/campaign-for-city-funding-for-mco-wage-increase-for-non-profits/')}> More details on our website</Text>
                        <Icon name="arrow-right" size={20} style={{"marginLeft": 10}}/>

                    </View>
                    
                </View>

                <View style={styles.subTitle} >
                    <Title style={{ paddingLeft: 20, fontWeight: "bold", fontSize: 23, marginBottom: 10, /*fontFamily: "Helvetica"*/ }}>
                        {jsonData[1].name}
                    </Title>
                </View>

                <View
                    style={[styles.myBox, {marginBottom: 10}]} >
                    <Paragraph style={{ fontSize: 17}}>
                        {jsonData[1].content}</Paragraph>
                </View>

                <View
                    style={[styles.myBox, {marginBottom: 30}]} >
                    <Paragraph style={{ fontSize: 17}}>
                        {jsonData[1].content2}</Paragraph>
                </View>
               

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({


    container: {
        flex: 1,
        // backgroundColor: "#f8f8ff"
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
        backgroundColor: "white"
    }

})