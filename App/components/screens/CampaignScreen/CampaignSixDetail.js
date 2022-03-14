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
import jsonData from './data/campaign4Details.json';
import { Title, Paragraph } from 'react-native-paper';

var { width } = Dimensions.get("window");


export default class CampaignSixDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "PROTECT PUBLIC SECTOR EMPLOYMENT \nAND UNION JOBS",
            url: "https://www.livingwage-sf.org/contact-politicians-directly/"
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
                        <ImageBackground source={require('./../../../../assets/welfare.jpg')} style={{ height: 400, width: width }}>
                            <Text Text style={{
                                paddingTop: 250, fontSize: 36, fontWeight: "bold",
                                //color: "#2699FB",
                                color: "white",
                                //textAlign: 'center',
                                marginLeft: 10,
                                textShadowColor: 'black',
                                textShadowRadius: 20,
                            }}>
                                TRANSFORM A BROKEN WELFARE-TO-WORK-SYSTEM</Text>
                        </ImageBackground>
                    </View>

                    <View style={[styles.subTitle, { marginBottom: -15 }]} >
                        <Title style={{ paddingLeft: 20, fontSize: 23, color: "black", /*fontFamily: "Helvetica"*/ }}>
                            a. Campaign for a Community Jobs Program{'\n'}
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
                            We are working to get the City and County of San Francisco to pass model legislation that will transform welfare-to-work programs into genuine job training that provides a path to living wage jobs.
                        </Paragraph>
                    </View>
                    <View style={[styles.readMore, { marginBottom: 10 }]} >
                        <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                            onPress={() => Linking.openURL('https://www.livingwage-sf.org/transform-welfare-to-work/campaign-for-a-community-jobs-program/')}> More details on our website</Text>
                        <Icon name="arrow-right" size={20} style={{ "marginLeft": 10 }} />
                    </View>

                </View>

                <View style={[styles.subTitle, { marginBottom: -15 }]} >
                    <Title style={{ paddingLeft: 20, fontSize: 23, color: "black", /*fontFamily: "Helvetica"*/ }}>
                        b. Organizing a Union of Welfare-to-Work Program Participants{'\n'}
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
                        To pass this model legislation, we are organizing welfare-to-work program participants to have a voice in how the legislation is drafted and these programs are designed. This will be the foundation for organizing their own union to provide them with the political power to
                        negotiate better working conditions and more opportunities for permanent jobs.
                    </Paragraph>

                </View>
                <View style={[styles.readMore, { marginBottom: 10 }]} >
                    <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                        onPress={() => Linking.openURL('https://www.livingwage-sf.org/transform-welfare-to-work/organizing-welfare-to-work-collective-bargaining/')}> More details on our website</Text>
                    <Icon name="arrow-right" size={20} style={{ "marginLeft": 10 }} />
                </View>


                <View style={[styles.subTitle, { marginBottom: -15 }]} >
                    <Title style={{ paddingLeft: 20, fontSize: 23, color: "black",/*fontFamily: "Helvetica"*/ }}>
                        c. Building a National Network of Welfare-to-Work Program Participants{'\n'}
                    </Title>
                </View>

                <View
                    style={[styles.myBox, { marginBottom: 30 }]}
                >
                    <Paragraph style={{
                        flexDirection: "row",
                        fontSize: 17
                    }}
                    >
                        We are sharing strategies on building a national movement to change welfare as we know it, from dead end programs to real job training and career opportunities.
                    </Paragraph>

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
        marginTop: 60
    },


})