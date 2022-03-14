import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Image,
    Dimensions,
    Linking

} from 'react-native';

import { Checkbox } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import CampaignTitle from './components/CampaignTitle';
import customData from './data/campaign2Details.json';
import { Title, Paragraph } from 'react-native-paper';

var { width } = Dimensions.get("window");

export default class CampaignTwoDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "End the Injustice of Mass Incarceration",
            url: "https://www.livingwage-sf.org/know-your-rights",

            filename: this.props.filename,
            post1: customData[0].name,
            content1: customData[0].content,
            post2: customData[1].name,
            content2: customData[1].content,

        }
        //print(filename)
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: "#f8f8ff" }}>

                <View style={styles.container}>
                    <CampaignTitle title={this.state.title}
                        navigation={this.props.navigation}
                        url={this.state.url} />
                    <View style={styles.topbackground}>
                        <ImageBackground source={require('./../../../../assets/april_14_rally_at_city_hall6.jpg')} style={{ height: 400, width: width }}>
                            <Text Text style={{
                                paddingTop: 300, fontSize: 36, fontWeight: "bold",
                                //color: "#2699FB",
                                color: "white",
                                // textAlign: 'center',
                                marginLeft: 10,
                                textShadowColor: 'black',
                                textShadowRadius: 20
                            }}>
                                End the Injustice of Mass Incarceration</Text>
                        </ImageBackground>
                    </View>

                    <View style={[styles.subTitle, {marginBottom: 16}]} >
                        <Paragraph style={{ paddingLeft: 20, fontSize: 17 }}>
                            A broken criminal justice system is turning to mass incarceration as a source of cheap prison labor. The formerly incarcerated
                            or convicted then face lifetime job discrimination that leaves them unemployed or in the dirtiest, most dangerous,
                            and lowest paying jobs.
                        </Paragraph></View>


                    <View style={styles.subTitle} >
                        <Title style={{ paddingLeft: 20, fontSize: 23, color: "black", marginBottom: -15, /*fontFamily: "Helvetica"*/ }}>
                            {this.state.post1}{'\n'}
                        </Title>
                    </View>

                    <View style={[styles.myBox, { marginBottom: 8 }]}>
                        <Paragraph style={{ fontSize: 17 }}>
                            {this.state.content1}</Paragraph>
                    </View>
                    <View style={styles.readMore} >
                        <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                            onPress={() => Linking.openURL('https://www.livingwage-sf.org/mass-incarceration/prison-privatization/')}> More details on our website</Text>
                        <Icon name="arrow-right" size={20} style={{ "marginLeft": 10 }} />
                    </View>

                </View>

                <View style={styles.subTitle} >
                    <Title style={{ paddingLeft: 20, fontSize: 23, color: "black", marginBottom: -12, /*fontFamily: "Helvetica"*/}}>
                        {this.state.post2}{'\n'}
                    </Title>
                </View>

                <View style={[styles.myBox, { marginBottom: 8 }]}>


                    <Paragraph style={{
                        fontSize: 17
                    }}>
                        {this.state.content2}</Paragraph>

                </View>
                <View style={[styles.readMore, {marginBottom: 30}]} >
                    <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                        onPress={() => Linking.openURL('https://www.livingwage-sf.org/mass-incarceration/discrimination-against-formerly-incarcerated-people/')}> More details on our website</Text>
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
});
