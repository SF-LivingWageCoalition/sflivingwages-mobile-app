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
import jsonData from './data/campaign5Details.json';
import actionData from './data/campaignActions.json';
import { Title, Paragraph } from 'react-native-paper';

var { width } = Dimensions.get("window");

export default class CampaignFiveDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "ENACT FAIR TRADE POLICIES",
            url: "https://www.youtube.com/watch?v=nMFee0CqkdI"
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
                        <ImageBackground source={require('./../../../../assets/fairtrade.jpg')} style={{ height: 400, width: width }}>
                            <Text Text style={{
                                paddingTop: 300, fontSize: 36, fontWeight: "bold", 
                                //color: "#2699FB",
                                color: "white",
                                //textAlign: 'center',
                                marginLeft: 10,
                                textShadowColor: 'black',
                                textShadowRadius: 20,
                            }}>
                                FAIR TRADE</Text>
                        </ImageBackground>
                    </View>

                    <View style={[styles.subTitle, { marginBottom: 16 }]} >
                        <Paragraph style={{ paddingLeft: 20, fontSize: 17 }}>
                            Bad trade agreements that do not have worker protections and rely on moving manufacturing and production to low-wage areas of the world are resulting in a vicious spiral to the bottom, without a safety net for those displaced from their livelihoods nor job training programs to provide skills for new jobs.
                        </Paragraph></View>

                    <View style={[styles.subTitle, { marginBottom: 10 }]} >
                        <Title style={{ paddingLeft: 20, fontSize: 23, color: "black", /*fontFamily: "Helvetica"*/}}>
                            a. Rethink trade
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
                            We need to create GOOD trade policies – to fight FOR trade that raises wages and lessens economic inequality, counters the planetary climate crisis, and curbs corporate power in this era of globalization.
                        </Paragraph>
                    </View>

                    <View style={[styles.readMore, { marginBottom: 10 }]} >
                        <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                            onPress={() => Linking.openURL('https://www.livingwage-sf.org/fair-trade/rethink-trade/')}> More details on our website</Text>
                        <Icon name="arrow-right" size={20} style={{ "marginLeft": 10 }} />
                    </View>



                    <View style={[styles.subTitle, { marginBottom: -15 }]} >
                        <Title style={{ paddingLeft: 20, fontSize: 23, color: "black", /*fontFamily: "Helvetica"*/ }}>
                            b. Campaign to Guarantee Protections for the Right to Organize a Union{'\n'}
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
                            Read about Susana Prieto Terrazas, a labor attorney and activist who was released from jail.
                        </Paragraph>

                    </View>
                    <View style={[styles.readMore, { marginBottom: 10 }]} >
                        <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                            onPress={() => Linking.openURL('https://www.livingwage-sf.org/crusading-labor-lawyer-freed-from-jail-on-conditions-to-chill-organizing/')}> More details on our website</Text>
                        <Icon name="arrow-right" size={20} style={{ "marginLeft": 10 }} />
                    </View>


                    <View style={[styles.subTitle, { marginBottom: -15 }]} >
                        <Title style={{ paddingLeft: 20, fontSize: 23, color: "black", /*fontFamily: "Helvetica"*/ }}>
                            c. Exposing the Effects of the North American Free Trade Agreement (NAFTA) and the Central American Free Trade Agreement (CAFTA-DR){'\n'}
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
                            After NAFTA was negotiated between the United States, Canada and Mexico and passed by Congress, almost immediately more than half-a-million factory jobs paying between $15 and $18 per hour were lost in the United States as companies shut down plants to move production and assembly across the border into Mexico where the minimum wage is $5 per day. In Mexico, more than 2 million people lost their livelihoods, were displaced off their lands and forced to move to the border areas to find work in the maquiladoras or by crossing into the United States. Mexican farmers with small plots of land and using handtools or ploughing animals could not compete with the U.S. corn agribusinesses, heavily mechanized and subsidized by the federal government, which dumped cheap corn on the Mexican market.
                        </Paragraph>

                    </View>
                    <View style={[styles.readMore, { marginBottom: 10 }]} >
                        <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                            onPress={() => Linking.openURL('https://www.livingwage-sf.org/fair-trade/cross-border-solidarity/')}> More details on our website</Text>
                        <Icon name="arrow-right" size={20} style={{ "marginLeft": 10 }} />
                    </View>

                    <View style={[styles.subTitle, { marginBottom: -15 }]} >
                        <Title style={{ paddingLeft: 20, fontSize: 23, color: "black", /*fontFamily: "Helvetica"*/ }}>
                            d. Promote Cross Border Solidarity with Maquiladora Workers{'\n'}
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
                            Ciudad Juarez, across the border from El Paso Texas, is the location of many huge maquiladoras. A growing movement of maquiladoras workers is protesting their working conditions.
                        </Paragraph>

                    </View>
                    <View style={[styles.readMore, { marginBottom: -8 }]} >
                        <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                            onPress={() => Linking.openURL('https://www.livingwage-sf.org/fair-trade/factory-workers-in-ciudad-juarez-protest-working-conditions-at-four-plants/')}> More details on our website</Text>
                        <Icon name="arrow-right" size={20} style={{ "marginLeft": 10 }} />
                    </View>

                    <View style={[styles.subTitle, { marginBottom: 16 }]} >
                        <Paragraph style={{ paddingLeft: 20, fontSize: 17 }}>
                            People displaced from other parts of Mexico would arrive on the outskirts of Ciudad Juarez and find a plot of sand. They would rope together wooden pallets and tack on black roofing paper to make walls and stretch a vinyl tarp across for a roof. After they made some money in the maquiladoras, they would start making a cinder block wall. In this way, the neighborhood of Anapra began to develop. Many people come from close-knit villages where their people lived for thousands of years. In Anapra,they are strangers to each other. The grass-roots organization Las Hormigas Comunidad en Desarrollo (the Ants, a community in development) built a community center to organize programs and workshops to develop a sense of community in Anapra. Building a collective identity and relations between people is a necessary step to winning social change.
                        </Paragraph>

                    </View>
                    <View style={[styles.readMore, { marginBottom: 10 }]} >
                        <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                            onPress={() => Linking.openURL('https://www.livingwage-sf.org/fair-trade/las-hormigas/')}> More details on our website</Text>
                        <Icon name="arrow-right" size={20} style={{ "marginLeft": 10 }} />
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