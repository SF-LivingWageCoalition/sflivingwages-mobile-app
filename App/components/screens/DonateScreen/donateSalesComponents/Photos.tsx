import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Linking,
  ListRenderItem,
} from "react-native";

import styles from "./style/styles";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import {
  PhotoItem,
  PhotosProps,
  TimeLeft,
  DetailsScreenParams,
  PreviewScreenParams,
} from "../../../../../App/types";

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

  useEffect(() => {
    // Empty useEffect, keeping for future implementation
  }, []);

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
      <View style={{ flex: 1 }}>
        <View style={styles.cardImage}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              marginBottom: 15,
              fontWeight: "bold",
            }}
          >
            {" "}
            {item.title}{" "}
          </Text>
          <TouchableHighlight
            underlayColor="gray"
            onPress={() => {
              if (item.long_description != null) {
                navigation.navigate("Details", {
                  image: item.author_image,
                  bio: item.long_description,
                  title: item.title,
                } as DetailsScreenParams);
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
          <Text style={{ textAlign: "center", fontStyle: "italic" }}>
            Long press to zoom or Tap to show details
          </Text>

          <View style={styles.horizontalLine} />
          <Text style={{ marginTop: 10 }}>
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
          {/* Product Individual page link */}
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

export default Photos;
