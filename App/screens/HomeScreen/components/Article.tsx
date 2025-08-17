import moment from "moment";
import React from "react";
import {
  Linking,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Card, Divider, Text } from "react-native-elements";
import { colors } from "../../../theme";
import { fontSize } from "../../../theme/fontStyles";
import { ArticleProps } from "../../../types";

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
          <Text style={styles.textDescriptionStyle}>
            {description || "Read More.."}
          </Text>
          <Divider style={styles.dividerStyle} />
          <View style={styles.sourceTimeStyle}>
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
    color: colors.light.textSecondary,
    fontSize: fontSize.xxs,
  },
  featuredTitleStyle: {
    marginHorizontal: 5,
    textShadowColor: colors.light.shadow,
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3,
  },
  textDescriptionStyle: {
    marginBottom: 10,
  },
  dividerStyle: {
    backgroundColor: colors.light.divider,
  },
  sourceTimeStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Article;
