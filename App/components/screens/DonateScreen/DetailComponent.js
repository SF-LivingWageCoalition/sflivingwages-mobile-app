
import React from 'react';
import styles from './donateSalesComponents/style/styles';
import {
    Platform,
    StyleSheet,
    Text, View,
    ScrollView,
    ActivityIndicator,
    Image,

    TouchableOpacity,
    RefreshControl,
    TouchableHighlight,
    Alert,
    Dimensions,
    TextInput
} from 'react-native';

//import ImageZoom from 'react-native-image-pan-zoom';
import MyBackButton from './donateSalesComponents/MyBackButton';

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            hasDetail: false,
            dataSource: [],
            title: "",
        }
    }
    // fetchData = async () => {
    //     const response = await fetch('http://157.245.184.202:8080/salesdetail')
    //     const data = await response.json()
    //     this.setState({
    //         isLoading: false,
    //         dataSource: data[1]
    //     })
    //     // console.log("---" + this.state.title);
    //     data.map(data => {

    //         if (this.state.title === data.title) {

    //             this.setState({
    //                 //isLoading: false,
    //                 hasDetail: true,
    //                 dataSource: data
    //             })
    //         }

    //     })

    // }
    componentDidMount() {

        // this.fetchData();
    }
    _onRefresh() {
        // this.setState({ refreshing: true })
        //this.fetchData().then(() => {
        this.setState({ refreshing: false })
        //})
    }

    render() {
        const { image, bio, title } = this.props.route.params;
        const resImage = JSON.stringify(image);
        const resBio = JSON.stringify(bio)
        const resTitle = JSON.stringify(title)
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            )
        } else if (resImage == "" && resBio == "" && resTitle == "") {
            <Text>No Additional detail</Text>
        } else {
            return (
                <View style={styles.cardImage}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                    >

                        <Text style={styles.titleHeader} > {JSON.parse(resTitle)}</Text>
                        {resImage  && <Text>Author picture:</Text>}
                        <Image style={{ height: 250, width: 250 }} source={{ uri: JSON.parse(resImage) }} />
                        <Text>{JSON.parse(resBio)}</Text>
                        
                        {/* <MyBackButton /> */}
                    </ScrollView>


                </View>
            )
        }
    }
}
