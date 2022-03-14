//Import Necessary Packages
import React from 'react';
import { View, Text, ScrollView, Image, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Card, CardItem, ListItem, Button } from 'react-native-elements';
import HomeNavComponent from './HomeNavComponent';
import { WebView } from "react-native-webview";
import { Divider } from 'react-native-elements';
import { Card, Title, Paragraph } from 'react-native-paper';
// import { Title } from 'native-base';

export default class MediaScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
        }
    }

    componentDidMount() {
        fetch('https://www.livingwage-sf.org/wp-json/wp/v2/media', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    dataSource: json
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    

    render() {

        // const data = this.state.dataSource.map((t, index) => {

        //     var updatedTitle = (t.title.rendered).replace('&#8211; ', '');
        //     var updatedDate = (t.date).split('T')[0];
        //     if (!t.guid.rendered.endsWith(".pdf")) {
        //         return (


        //             <>
        //                 <Card
        //                     title={updatedTitle} style={styles.featuredTitleStyle}
        //                 >
        //                     <Image source={{uri: t.guid.rendered}} style={styles.imageStyle}/>
        //                     <Text key={index} onPress={() => Linking.openURL(t.link)} style={styles.textStyle}>

        //                         <Text style={styles.noteStyle}>
        //                             Date Published:
        //                             {
        //                                 " " + updatedDate
        //                             }


        //                         </Text>

        //                     </Text>

        //                 </Card>
        //             </>
        //         )
        //     }
        // });
        // console.log("dataSource ", this.state.dataSource);

        return (
            <ScrollView style={{ flex: 1 }}>

                {/*Page Contents*/}


                {

                    <View>
                        
                        <Divider style={{ backgroundColor: 'black' }} />

                        <View style={
                            {flexDirection: 'row',

                            justifyContent: 'flex-end',
                            padding: 10,
                            backgroundColor: "#000000",
                            height: 60,
                            alignItems: 'center',
                            
                            }

                        }>
                            
                            <Text style={{color: "#f8f8ff", 
                                          fontSize: 20, 
                                          textAlign: "center",
                                          fontWeight:"bold",
                                          textDecorationLine: 'underline',
                                          /*fontFamily: "Helvetica"*/}}
                                  onPress={()=> {Linking.openURL('https://www.livingwage-sf.org/')}}>Access to our website
                            </Text>
                            <Icon name="arrow-right" size={20} style={{ "marginLeft": 10 }} color='#f8f8ff' />
                        </View>

                        {/* <Text style={styles.textStyle}>TV Shows</Text> */}
                        {/* <Card>
                            <Card.Title>HELLO WORLD</Card.Title>
                            <Card.Divider />
                            <Card.Image source={require('../../../../assets/livingwage-icon.png')}>
                                <Text style={{ marginBottom: 10 }}>
                                    The idea with React Native Elements is more about component structure than actual design.
                                </Text>
                                <Button
                                    icon={<Icon name='code' color='#ffffff' />}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='VIEW NOW' />
                            </Card.Image>
                        </Card> */}
                        <Card style={styles.cardStyle}>
                            <Card.Title title="TV Shows" />
                            <WebView
                                style={styles.youTubeStyle}
                                source={{ uri: "http://www.youtube.com/embed?max-results=1&showinfo=0&rel=0&listType=user_uploads&list=sflivingwage" }}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                            />
                            <Card.Content>
                                {/* <View style={{flexDirection: "row"}}>
                                <Image
                                    style={styles.logo}
                                    source={require('../../../../assets/livingwage-icon.png')}

                                />
                                <Title style={{marginTop: 5}}>Reclaiming Cinco de Mayo 2021</Title>
                                </View> */}
                            </Card.Content>
                            <Card.Actions>
                                <View style={{flex: 1, height: 30}}>
                                    <Text style={styles.actionText} 
                                            onPress={()=> Linking.openURL('https://www.youtube.com/playlist?list=PLcuBfm3dxksyN__WaZR1pN1hoUcivSMPU')}>See out full list of TV Shows</Text>
                                </View>
                            </Card.Actions>
                        </Card>

                        {/* <WebView
                            style={styles.youTubeStyle}
                            source={{ uri: "https://www.youtube.com/embed?max-results=1&controls=0&showinfo=0&rel=0&listType=playlist&list=PLcuBfm3dxksyN__WaZR1pN1hoUcivSMPU" }}
                            // onClick
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                        /> */}
                        {/* <Divider style={{ backgroundColor: 'blue' }} /> */}
                        {/* <Text style={styles.textStyle}>Vintage Videos</Text>
                        <WebView
                            style={styles.youTubeStyle}
                            source={{ uri: "https://www.youtube.com/embed?max-results=1&controls=0&showinfo=0&rel=0&listType=playlist&list=PLcuBfm3dxkszAbt58VCPehuEoi3VjzH2g" }}

                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                        /> */}
                        <Card style={styles.cardStyle}>
                            <Card.Title title="Vintage Videos" />
                            <WebView
                                style={styles.youTubeStyle}
                                source={{ uri: "https://www.youtube.com/embed?max-results=1&controls=0&showinfo=0&rel=0&listType=playlist&list=PLcuBfm3dxkszAbt58VCPehuEoi3VjzH2g"}}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                            />
                            {/* <Card.Content>
                                <View style={{flexDirection: "row"}}>
                                <Image
                                    style={[styles.logo, {marginTop: 10}]}
                                    source={require('../../../../assets/livingwage-icon.png')}

                                />
                                <Title style={{marginTop: 5, width: '80%'}}>Center For Independent Living No On N</Title>
                                </View>
                            </Card.Content> */}
                            <Card.Actions>
                                <View style={{flex: 1, height: 30, }}>
                                    <Text style={styles.actionText} 
                                            onPress={()=> Linking.openURL('https://www.youtube.com/playlist?list=PLcuBfm3dxkszAbt58VCPehuEoi3VjzH2g')}>See our full list of Vintage Videos</Text>
                                </View>
                            </Card.Actions>
                        </Card>

                        {/* <Text style={styles.textStyle}>Documentaries</Text>
                        <WebView
                            style={styles.youTubeStyle}

                            source={{ uri: "https://www.youtube.com/embed?max-results=1&controls=0&showinfo=0&rel=0&listType=playlist&list=PLcuBfm3dxksz54i7-7QN1XaJbT23m6Pg3" }}

                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                        /> */}
                        {/* <Divider style={{ backgroundColor: 'blue' }} /> */}
                        <Card style={styles.cardStyle}>
                            <Card.Title title="Documentaries" />
                            <WebView
                                style={styles.youTubeStyle}
                                source={ {uri: "https://www.youtube.com/embed?max-results=1&controls=0&showinfo=0&rel=0&listType=playlist&list=PLcuBfm3dxksz54i7-7QN1XaJbT23m6Pg3" }}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                            />
                            {/* <Card.Content>
                                <View style={{flexDirection: "row"}}>
                                <Image
                                    style={[styles.logo, {marginTop: 10}]}
                                    source={require('../../../../assets/livingwage-icon.png')}

                                />
                                <Title style={{marginTop: 5, width: '80%'}}>Interview with TPS holder Claudia Lainez</Title>
                                </View>
                            </Card.Content> */}
                            <Card.Actions>
                                <View style={{flex: 1, height: 30, }}>
                                    <Text style={styles.actionText} 
                                            onPress={()=> Linking.openURL('https://www.youtube.com/playlist?list=PLcuBfm3dxksz54i7-7QN1XaJbT23m6Pg3')}>See our full list of Documentaries</Text>
                                </View>
                            </Card.Actions>
                        </Card>
                        <View style={
                            styles.contactStyle

                        }>

                            <TouchableOpacity
                                onPress={() => Linking.openURL("https://www.facebook.com/san.francisco.living.wage/")}>
                                {/* <Image
                                        style={styles.iconStyle}
                                        source={require('../../../../assets/fb-icon.png')}

                                    /> */}
                                <Icon name="facebook-square" size={50} color="#f8f8ff" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => Linking.openURL("https://twitter.com/sflivingwage?lang=en/")}>
                                {/* <Image
                                        style={styles.iconStyle}
                                        source={require('../../../../assets/twitter-icon.png')}

                                    /> */}
                                <Icon name="twitter-square" size={53} color="#f8f8ff" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => Linking.openURL("https://www.instagram.com/sflivingwage/?hl=en")}>
                                {/* <Image
                                        style={styles.iconStyle}
                                        source={require('../../../../assets/ig-icon.png')}

                                    /> */}
                                <Icon name="instagram" size={53} color="#f8f8ff" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => Linking.openURL("https://www.youtube.com/user/sflivingwage")}>
                                {/* <Image
                                    style={styles.iconStyle}
                                    source={require('../../../../assets/livingwage-icon.png')}

                                /> */}
                                <Icon name="youtube" size={53} color="#f8f8ff" />
                            </TouchableOpacity>
                        </View>
                        

                    </View>
                }


                {/* {data} */}


            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {

        fontWeight: 'bold',
        fontSize: 15,
        padding: 3,
        alignSelf: 'center'
    },
    imageStyle: {
        width: '100%',
        // Without height undefined it won't work
        height: undefined,
        // figure out your image aspect ratio
        aspectRatio: 135 / 76,
    },
    featuredTitleStyle: {
        marginHorizontal: 5,
        textShadowColor: '#00000f',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 3
    },
    noteStyle: {
        margin: 5,
        fontStyle: 'italic',
        color: '#b2bec3',
        fontSize: 10
    },
    youTubeStyle: {
        height: 300, margin: 10
    },
    iconStyle: {
        width: 50, height: 50
    },
    contactStyle: {
        flexDirection: 'row',

        justifyContent: 'space-between',
        // margin: 5,
        padding: 10,
        backgroundColor: "#000000"
    },
    logo: {
		width: 40,
		height: 40,
		borderRadius: 40 / 2,
        marginRight: 10
	},
    cardStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,  
        elevation: 8,
        // width: '98%',
        // alignSelf: 'center',
        // marginTop: 10

    },

    actionText: {
        textDecorationLine: 'underline', 
        alignItems: 'center', 
        alignSelf: "flex-end", 
        //fontFamily: "Arial", 
        fontWeight: "700", 
        fontSize: 18,
        color: '#4169e1'
    }


});
