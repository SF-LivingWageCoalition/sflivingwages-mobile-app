import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    Image,
    ImageBackground,
    Linking
} from 'react-native';

import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button} from 'native-base';
import { Headline, Caption } from 'react-native-paper';

export default function CampaignScreen({ navigation }) {

    

    return (
        <ScrollView>

            <View style={styles.container}>
                <View style={styles.topbackground}>
                    <ImageBackground source={require('./../../../../assets/sfBackground.jpeg')} style={{ height: 400 }}>
                        <View style ={{paddingTop: 290}} >
                         <Text style={{
                            fontSize: 36, fontWeight: "bold",
                            color: "#fffaf0",
                            marginLeft: 10
                         }}>
                            Our Campaigns </Text>
                        </View>
                        <Text style={{ fontSize: 20, color: "#fffaf0", marginLeft: 13}}>
                            {'\n'}Stand up for your rights</Text>
                    </ImageBackground>
                </View>
                <List style={{ backgroundColor: 'white' }}>
                    <ListItem thumbnail >
                        <Left>
                            <Thumbnail square source={require('./../../../../assets/wageraise.jpg')} style={{ width: 80, height: 80 }} />
                        </Left>
                        <Body>
                            {/* <Text style={styles.textSytle}>RAISE WAGES</Text> */}
                            <Text style={{ fontSize: 16, fontWeight: "bold" }} numberOfLines={2}>RAISE WAGES</Text>
                            <Text note numberOfLines={3} style={{ fontWeight: '300' }}>The Budget and Appropriations Committee of the Board of Supervisors, led by chair Supervisor Sandra Fewer with members Supervisors Shamann Walton, Hillary Ronen, Norman Yee
                                and Rafael Mandelman, approved in their proposed spending plan $2.1 million
                                for the 3.31 percent cost-of-living adjustment to
                                the Minimum Compensation Ordinance retroactive to July 1 as a one-time,
                                one-year “Non-profit Worker Emergency Support</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => navigation.navigate('CampaignDetail')}>
                                <Text>View</Text>
                            </Button>
                        </Right>
                    </ListItem>
                    <ListItem thumbnail >
                        <Left>
                            <Thumbnail square source={require('./../../../../assets/april_14_rally_at_city_hall6.jpg')} style={{ width: 80, height: 80 }} />
                        </Left>
                        <Body>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>END THE INJUSTICE OF MASS INCARCERATION</Text>
                            <Text note numberOfLines={3} style={{ fontWeight: '300' }}>A broken criminal justice system is turning to mass incarceration as a source of cheap prison labor. The formerly incarcerated
                                or convicted then face lifetime job discrimination that leaves them unemployed or in the dirtiest, most dangerous,
                                and lowest paying jobs.</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => navigation.navigate('CampaignTwoDetail')}>
                                <Text>View</Text>
                            </Button>
                        </Right>
                    </ListItem>
                    <ListItem thumbnail >
                        <Left>
                            <Thumbnail square source={require('./../../../../assets/immigrant.jpg')} style={{ width: 80, height: 80 }} />
                        </Left>
                        <Body>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>IMMIGRATION REFORM</Text>
                            <Text note numberOfLines={3} style={{ fontWeight: '300' }}>The Dignity Campaign creates a vision of progressive immigration reform.
                                We are part of a national network of immigrant rights organizations that
                                are building a grassroots movement that is demanding immigration reform
                                that provides full legalization, family reunification, an end to employer
                                sanctions and other workplace enforcement, an end to the militarization of
                                the border,
                                and an end to guest worker programs.</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => navigation.navigate('CampaignThreeDetail')}>
                                <Text>View</Text>
                            </Button>
                        </Right>
                    </ListItem>
                    <ListItem thumbnail >
                        <Left>
                            <Thumbnail square source={require('./../../../../assets/public.jpg')} style={{ width: 80, height: 80 }} />
                        </Left>
                        <Body>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>PROTECT PUBLIC SECTOR EMPLOYMENT AND UNION JOBS</Text>
                            <Text note numberOfLines={3} style={{ fontWeight: '300' }}>As a result of union organizing, public sector employment has raised the bar on wages, benefits, and enforcement of anti-discrimination laws to create an integrated workforce. 
                            During the 2008 economic recession, the budget crises in state and local governments allowed employers to lay off public sector employees, and slash wages, benefits, and pensions, 
                            which disproportionately impacted African American and Latino workers. During the current economic recovery period, 
                            those workers are not being recalled for political reasons and to reduce wage competition in the private sector.</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => navigation.navigate('CampaignFourDetail')}>
                                <Text>View</Text>
                            </Button>
                        </Right>
                    </ListItem>
                    <ListItem thumbnail >
                        <Left>
                            <Thumbnail square source={require('./../../../../assets/fairtrade.jpg')} style={{ width: 80, height: 80 }} />
                        </Left>
                        <Body>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>FAIR TRADE</Text>
                            <Text note numberOfLines={3} style={{ fontWeight: '300' }}>Bad trade agreements that do not have worker protections and rely on moving manufacturing and production to low-wage areas of the world are resulting in a vicious spiral to the bottom, 
                            without a safety net for those displaced from their livelihoods nor job training programs to provide skills for new jobs.</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => navigation.navigate('CampaignFiveDetail')}>
                                <Text>View</Text>
                            </Button>
                        </Right>
                    </ListItem>
                    <ListItem thumbnail >
                        <Left>
                            <Thumbnail square source={require('./../../../../assets/welfare.jpg')} style={{ width: 80, height: 80 }} />
                        </Left>
                        <Body>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>TRANSFORM A BROKEN WELFARE-TO-WORK-SYSTEM</Text>
                            <Text note numberOfLines={3} style={{ fontWeight: '300' }}>a. Campaign for a Community Jobs Program. 
                            We are working to get the City and County of San Francisco to pass model legislation that will transform welfare-to-work 
                            programs into genuine job training that provides a path to living wage jobs.</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => navigation.navigate('CampaignSixDetail')}>
                                <Text>View</Text>
                            </Button>
                        </Right>
                    </ListItem>
                </List>
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    topbackground: {
        height: 400,
        borderColor: '#95989a',
        borderWidth: 1,
        backgroundColor: "white"
    }
});
