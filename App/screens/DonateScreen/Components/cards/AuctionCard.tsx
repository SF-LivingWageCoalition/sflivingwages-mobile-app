import React from "react";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AuctionCardProps, PreviewScreenParams } from "../../../../types";

// Card Render
const AuctionCard: React.FC<AuctionCardProps> = ({
  name,
  description,
  price,
  link,
  image,
  previewImage,
}) => {
  // Get navigation
  const navigate = useNavigation<NavigationProp<ParamListBase>>();

  // Regular expression to remove HTML tags and entities
  const rgex = /(&.+;)|(<([^>]+)>)/gi;

  // Clean the text
  const cleanDescription = description.replace(rgex, "");
  const cleanName = name.replace(rgex, "");

  // Calculate the price
  const itemPrice = +price / 100;

  return (
    <View style={styles.container}>
      <View style={styles.cardImage}>
        <Text style={styles.cardTitle}>{cleanName}</Text>
        <TouchableOpacity
          onPress={() => {
            navigate.navigate("Preview", {
              image: previewImage,
            } as PreviewScreenParams);
          }}
        >
          <Image style={styles.imageStyle} source={{ uri: image }} />
        </TouchableOpacity>
        <Text>tap picture to enlarge</Text>
        <View style={styles.horizontalLine} />
        <View>
          <Text>{cleanDescription}</Text>
          <Text>${itemPrice}</Text>
        </View>
        {/* Product Individual page link */}
        <View style={styles.submitButtonContainer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              Linking.openURL(link);
            }}
          >
            <Text style={styles.submitButtonText}>Place bid</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    margin: 5,
  },
  cardImage: {
    backgroundColor: "white",
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
    marginLeft: 30,
    marginRight: 15,
    marginBottom: 10,
  },
  horizontalLine: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  submitButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    justifyContent: "center",
    backgroundColor: "#d31623",
    width: 100,
    height: 40,
    borderRadius: 30,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "900",
    textAlign: "center",
  },
});

export default AuctionCard;
