import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import Button from "../../../../components/Button";
import { colors } from "../../../../theme";
import { textStyles } from "../../../../theme/fontStyles";
import {
  DetailParams,
  PhotosProps,
  PreviewScreenParams,
  ProductItem,
} from "../../../../types/types";

const Photos: React.FC<PhotosProps> = ({ photos }) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const renderItem: ListRenderItem<ProductItem> = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={styles.cardImage}>
          <Text style={styles.itemTitle}> {item.name} </Text>
          <TouchableHighlight
            underlayColor="gray"
            onPress={() => {
              if (item.description != null) {
                navigation.navigate("Details", {
                  image: item.images[0]?.src,
                  bio: item.description,
                  title: item.name,
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
                image: item.images[0]?.src,
              } as PreviewScreenParams);
            }}
          >
            <Image
              style={styles.imageStyle}
              source={{ uri: item.images[0]?.src }}
            />
          </TouchableHighlight>
          <Text style={styles.textItalic}>
            Long press to zoom or Tap to show details
          </Text>

          <View style={styles.horizontalLine} />

          {/* Product Individual page link */}
          <View style={styles.buttonStyle}>
            <Button
              variant="primary"
              title="Place bid"
              onPress={() => {
                Linking.openURL(`${item.permalink}`);
              }}
            />
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
    backgroundColor: colors.light.background,
    margin: 10,
    padding: 20,
    flex: 1,
    shadowColor: colors.light.shadow,
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
    borderBottomColor: colors.light.textPrimary,
    borderBottomWidth: 1,
  },
  buttonStyle: {
    padding: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  itemTitle: {
    ...textStyles.h3,
    textAlign: "center",
    marginBottom: 15,
  },
  textItalic: {
    ...textStyles.caption,
    textAlign: "center",
    fontStyle: "italic",
  },
  marginTop: {
    ...textStyles.body,
    marginTop: 10,
  },
});

export default Photos;
