import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React, { JSX, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import {
  DetailParams,
  PhotoItem,
  PhotosProps,
  PreviewScreenParams,
  TimeLeft,
} from "../../../../types";

const Photos: React.FC<PhotosProps> = ({ photos }) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [closeDate, setCloseDate] = useState<string>("");

  const calculateTimeLeft = (value?: string): TimeLeft => {
    // Set bid end day here
    let endDate = value || "";
    //Date format: 2021-06-01T12:00:00.000Z
    let difference = +new Date(endDate) - +new Date();

    let timeLeft: TimeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  const timerComponents: JSX.Element[] = [];

  const formatDate = (value: string): void => {
    const date = new Date(value).getDate(); // Current Date
    const month = new Date(value).getMonth() + 1; // Current Month
    const year = new Date(value).getFullYear(); // Current Year
    const hours = new Date(value).getHours() + 5; // Current Hours
    const min = new Date(value).getMinutes(); // Current Minutes

    setCloseDate(month + "/" + date + "/" + year + " " + hours + ":" + min);
  };

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof TimeLeft]) {
      return;
    }

    timerComponents.push(
      <Text key={interval}>
        {timeLeft[interval as keyof TimeLeft]} {interval}{" "}
      </Text>
    );
  });

  const renderItem: ListRenderItem<PhotoItem> = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={styles.cardImage}>
          <Text style={styles.itemTitle}> {item.title} </Text>
          <TouchableHighlight
            underlayColor="gray"
            onPress={() => {
              if (item.long_description != null) {
                navigation.navigate("Details", {
                  image: item.author_image,
                  bio: item.long_description,
                  title: item.title,
                } as DetailParams);
              } else {
                Alert.alert("", "No Detail", [
                  {
                    text: "Check back later",
                    onPress: () => console.log("Check back later pressed"),
                  },
                ]);
              }
            }}
            onLongPress={() => {
              navigation.navigate("Preview", {
                image: item.path,
              } as PreviewScreenParams);
            }}
          >
            <Image style={styles.imageStyle} source={{ uri: item.path }} />
          </TouchableHighlight>
          <Text style={styles.textItalic}>
            Long press to zoom or Tap to show details
          </Text>

          <View style={styles.horizontalLine} />
          <Text style={styles.marginTop}>
            {(() => {
              formatDate(item.closeDate);
              return null;
            })()}
            Close date: {closeDate}
          </Text>

          {/* Product Individual page link */}
          <View style={styles.buttonStyle}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                Linking.openURL(`${item.url}`);
              }}
            >
              <Text style={styles.submitButtonText}> Place bid </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      horizontal={false}
      data={photos}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 350,
    marginLeft: 40,
    marginRight: 15,
    marginBottom: 10,
  },
  horizontalLine: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  buttonStyle: {
    padding: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#d31623",
    padding: 10,
    width: 100,
    height: 40,
    marginTop: 5,
    borderRadius: 10,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "900",
    textAlign: "center",
  },
  itemTitle: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "bold",
  },
  textItalic: {
    textAlign: "center",
    fontStyle: "italic",
  },
  marginTop: {
    marginTop: 10,
  },
});

export default Photos;
