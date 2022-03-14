import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    Image,
    ImageBackground,
    ActivityIndicator,
    Linking,
    Dimensions
} from 'react-native';

import { Card } from 'react-native-elements';

import { Text } from 'native-base';

var bodyPageHeight = Dimensions.get('window').height;
// var boadyPageWidth = Dimensions.get('window').width;

export default function PressCoverage() {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    let tempNews = [];

    const getData = async () => {
        const response = await (await fetch('https://www.livingwage-sf.org/wp-json/wp/v2/posts?per_page=3&categories=81')).json();

        // console.log("response coverage, ", response);

        for (let i = 0; i < response.length; i++) {
            //console.log("response[i], ",  i, response[i]);
            let temp = new Map();
            let updatedTitle = (response[i].title.rendered).replace(/&#8216;|&#8217;|&#8211;/g, '');
            let updatedDate = (response[i].date).split('T')[0];
            let content = (response[i].excerpt.rendered)
                .replace(/<p>/, '')
                .replace(/<a.*>/, ' ...\n\nRead More')
                .replace(/&#8217;|&#8220;|&#8221;|&#038;/g, '');

            if (updatedTitle == "") {
                updatedTitle = "Untitled"
            }

            temp.set("title", updatedTitle);
            temp.set("date", updatedDate);
            temp.set('content', content);
            temp.set('src', response[i].link);
            tempNews.push(temp);

        }

        setNews(tempNews);
        setLoading(false);
    }

    useEffect(() => {
        getData();

    }, []);



    return (
        <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={styles.textStyle}>PressCoverage</Text>
            {loading ? (<View style={styles.loading}>
                            <ActivityIndicator size="large" color="red" />
                        </View>) : 
                       (
                 <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {news.map((item, i) => (
                        // <Text>{item.get('title')}</Text>
                        <TouchableHighlight key={i}>
                            <Card
                                title={item.get('title')}
                            >
                                <Text onPress={() => Linking.openURL(item.get('src'))} /*style={{ fontFamily: 'HelveticaNeue' }}*/>
                                    {item.get('content')}
                                </Text>

                                <Text key={i}>
                                    <Text style={styles.noteStyle}>
                                        Date Published:
                                        {
                                            " " + item.get('date')
                                        }
                                    </Text>
                                </Text>
                            </Card>
                        </TouchableHighlight>
                    ))}
                </View>
            )}
        </ScrollView>


    )
}


const styles = StyleSheet.create({
    textStyle: {
       // fontFamily: 'Optima-Bold',
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10,
        alignSelf: 'center'
    },

    noteStyle: {
        margin: 5,
        fontStyle: 'italic',
        color: '#b2bec3',
        fontSize: 10
    },

    loading: {
        height: bodyPageHeight/1.5,
        alignItems: 'center',
        justifyContent: 'center'
    }

});