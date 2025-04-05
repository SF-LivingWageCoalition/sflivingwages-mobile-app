import moment from "moment";
import React from "react";
import {
  Linking,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Card, Divider, Text } from "react-native-elements";
import { ArticleProps } from "../../../../App/types";

const Article: React.FC<ArticleProps> = ({ article }) => {
  const { title, description, publishedAt, source, urlToImage, url } = article;

  // Format the time using moment
  const time = moment(publishedAt || moment.now()).fromNow();

  const defaultImg =
    "https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg";

  return (
    <TouchableWithoutFeedback
      // useForeground prop is not available on TouchableWithoutFeedback
      onPress={() => Linking.openURL(url)}
    >
      <Card
        featuredTitle={title}
        featuredTitleStyle={styles.featuredTitleStyle}
        image={{
          uri: urlToImage || defaultImg,
        }}
      >
        <View>
          <Text style={{ marginBottom: 10 }}>
            {description || "Read More.."}
          </Text>
          <Divider style={{ backgroundColor: "#dfe6e9" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.noteStyle}>{source.name.toUpperCase()}</Text>
            <Text style={styles.noteStyle}>{time}</Text>
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  noteStyle: {
    margin: 5,
    fontStyle: "italic",
    color: "#b2bec3",
    fontSize: 10,
  },
  featuredTitleStyle: {
    marginHorizontal: 5,
    textShadowColor: "#00000f",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3,
  },
});

export default Article;
