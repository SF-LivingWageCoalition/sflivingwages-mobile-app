import {
    View,
    StyleSheet,
    TouchableHighlight,
    Image,
    Text,
    TouchableOpacity
} from "react-native";

// Card Render
const Card = ({ categoryId, name, short, price, image }) => {
    // remove html tags and html entities
    const rgex = /(&.+;)|(<([^>]+)>)/ig
    const cleanDescription = short.replace(rgex, "")
    const cleanName = name.replace(rgex, "")
    const itemPrice = +price / 100

    return (
        <View style={styles.container}>
            <View
                style={styles.cardImage}
            >
                <Text style={styles.cardTitle}>{cleanName}</Text>
                <TouchableHighlight
                    underlayColor={'gray'}
                >
                    <Image
                        style={styles.imageStyle}
                        source={{ uri: image }}
                    />
                </TouchableHighlight>
                {/* <Text>Long pressd to zoom or Tap to show details</Text> */}
                <View style={styles.horizontalLine} />
                <View>
                    <Text>{cleanDescription} </Text>
                    <Text>${itemPrice}</Text>
                </View>

                {/*Product Individual page link*/}
                {
                    categoryId === 944 ?
                        <View style={styles.submitButtonContainer}>
                            <TouchableOpacity
                                style={styles.submitButton}
                            // onPress={() => { Linking.openURL(`${item.url}`) }}
                            >
                                <Text style={styles.submitButtonText}> Place bid </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.submitButtonContainer}>
                            <TouchableOpacity
                                style={styles.submitButton}
                            // onPress={() => { Linking.openURL(`${item.url}`) }}
                            >
                                <Text style={styles.submitButtonText}> Shop </Text>
                            </TouchableOpacity>
                        </View>

                }

                {/* <Text style={{ marginLeft: 15 }}> {item.contact} </Text> */}
            </View>
        </View>

    )

}

export default Card;

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    cardTitle: {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 18,
        margin: 5
    },
    cardImage: {
        backgroundColor: 'white',
        margin: 10,
        padding: 20,
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    imageStyle: {
        width: 250,
        height: 250,
        marginLeft: 15,
        marginRight: 15,
        marginLeft: 40,
        marginBottom: 10,
    },
    horizontalLine: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },

    submitButtonContainer :{ 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    submitButton: {
        justifyContent: 'center',

        backgroundColor: '#d31623',
        width: 100,  
        height: 40,
        borderRadius: 10
     },
   
    submitButtonText:{
        color: 'white',
        fontWeight: "900",
        textAlign: "center"
      },

})