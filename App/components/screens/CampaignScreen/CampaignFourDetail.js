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

export default class CampaignFourDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "PROTECT PUBLIC SECTOR EMPLOYMENT \nAND UNION JOBS",
            url: "https://actionnetwork.org/letters/pass-the-protecting-the-right-to-organize-pro-act?source=direct_link&"
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
                        <ImageBackground source={require('./../../../../assets/public.jpg')} style={{ height: 400, width: width }}>
                            <Text Text style={{
                                paddingTop: 250, fontSize: 36, fontWeight: "bold",
                                //color: "#2699FB",
                                color: "white",
                                //textAlign: 'center',
                                marginLeft: 10,
                                textShadowColor: 'black',
                                textShadowRadius: 20,
                            }}>
                                PROTECT PUBLIC SECTOR EMPLOYMENT AND UNION JOBS</Text>
                        </ImageBackground>
                    </View>

                    <View style={[styles.subTitle, { marginBottom: 16 }]} >
                        <Paragraph style={{ paddingLeft: 20, fontSize: 17 }}>
                            As a result of union organizing, public sector employment has raised the bar on wages, benefits, and enforcement of anti-discrimination laws to create an integrated workforce. During the 2008 economic recession, the budget crises in state and local governments allowed employers to lay off public sector employees, and slash wages, benefits, and pensions, which disproportionately impacted African American and Latino workers. During the current economic recovery period, those workers are not being recalled for political reasons and to reduce wage competition in the private sector.
                        </Paragraph></View>

                    <View style={[styles.subTitle, { marginBottom: -15 }]} >
                        <Title style={{ paddingLeft: 20, fontSize: 23, color: "black", /*fontFamily: "Helvetica"*/ }}>
                            a. Campaign to Stop the Use of Welfare-to-Work Programs to Displace Public Sector Jobs{'\n'}
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
                            Counties are using welfare-to-work program participants to do the work of laid off public sector employees. Not only does this prevent the recall of laid off employees, but it also eliminates permanent civil service positions and opportunities for long-term employment for welfare-to-work participants.</Paragraph>
                    </View>
                    <View style={[styles.readMore, { marginBottom: 10 }]} >
                        <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                            onPress={() => Linking.openURL('https://www.livingwage-sf.org/transform-welfare-to-work/campaign-for-a-community-jobs-program/')}> More details on our website</Text>
                        <Icon name="arrow-right" size={20} style={{ "marginLeft": 10 }} />
                    </View>

                </View>

                <View style={[styles.subTitle, { marginBottom: -15 }]} >
                    <Title style={{ paddingLeft: 20, fontSize: 23, color: "black", /*fontFamily: "Helvetica" */}}>
                        b. Campaign to Save the U.S. Postal Service{'\n'}
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
                        As a result of the current COVID-19 crisis, the USPS is in danger of bankruptcy. With the stall of the economy, reduction in mail volume and growing attacks made by the Trump Administration, the Postal Service could soon be wiped out financially.</Paragraph>

                </View>
                <View style={[styles.readMore, { marginBottom: 10 }]} >
                    <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                        onPress={() => Linking.openURL('https://www.livingwage-sf.org/protect-public-sector-jobs/campaign-to-save-the-u-s-postal-service/')}> More details on our website</Text>
                    <Icon name="arrow-right" size={20} style={{ "marginLeft": 10 }} />
                </View>


                <View style={[styles.subTitle, { marginBottom: -15 }]} >
                    <Title style={{ paddingLeft: 20, fontSize: 23, color: "black", /*fontFamily: "Helvetica"*/ }}>
                        c. Fight for $15 and the Right to a Union Without Retaliation{'\n'}
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
                        Fast food workers have inspired a movement around the globe by demanding $15 per hour from McDonalds, Burger King, Wendy’s, KFC, and other fast food restaurants.</Paragraph>

                </View>
                <View style={[styles.readMore, { marginBottom: 10 }]} >
                    <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                        onPress={() => Linking.openURL('https://www.livingwage-sf.org/protect-public-sector-jobs/fight-for-15-and-the-right-to-a-union-without-retaliation/')}> More details on our website</Text>
                    <Icon name="arrow-right" size={20} style={{ "marginLeft": 10 }} />
                </View>

                <View style={[styles.subTitle, { marginBottom: -15 }]} >
                    <Title style={{ paddingLeft: 20, fontSize: 23, color: "black", /*fontFamily: "Helvetica"*/ }}>
                        d. Put pressure on Senators to pass the PRO Act{'\n'}
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
                        The Protecting the Right to Organize will help enact old labor laws in which workers will be given more power in the workforce. Support the PRO Act by pressuring Senators to pass it.
                    </Paragraph>

                </View>
                <View style={[styles.readMore, {marginBottom: 30}]} >
                    <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                        onPress={() => Linking.openURL('https://www.livingwage-sf.org/put-pressure-on-senators-to-pass-the-pro-act/')}> More details on our website</Text>
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
        marginTop: 60
    },


})