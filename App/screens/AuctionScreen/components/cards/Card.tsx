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
import { colors } from "../../../../theme";
import { textStyles } from "../../../../theme/fontStyles";
import { CardProps, PreviewScreenParams } from "../../../../types/types";
import ItemModal from "../modalComponent/ItemModal";

const Card: React.FC<CardProps> = ({
  name,
  description,
  price,
  link,
  image,
  previewImage,
}) => {
  const navigate = useNavigation<NavigationProp<ParamListBase>>();

  // Regular expression to remove HTML tags and entities
  const rgex = /(&.+;)|(<([^>]+)>)/gi;

  // Clean the text
  const cleanDescription = description.replace(rgex, "");
  const cleanName = name.replace(rgex, "");

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
        <Text style={textStyles.caption}>tap picture to enlarge</Text>
        <View style={styles.horizontalLine} />
        <View>
          <ItemModal title={name} description={cleanDescription} />
          <Text style={textStyles.body}>${itemPrice}</Text>
        </View>
        {/* Product Individual page link */}
        <View style={styles.submitButtonContainer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              Linking.openURL(link);
            }}
          >
            <Text style={styles.submitButtonText}>Shop</Text>
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
    ...textStyles.h3,
    textAlign: "center", // <-- the magic
    margin: 5,
  },
  cardImage: {
    backgroundColor: "white",
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
    height: 250,
    marginLeft: 30,
    marginRight: 15,
    marginBottom: 10,
  },
  horizontalLine: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: colors.light.textPrimary,
    borderBottomWidth: 1,
  },
  submitButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    justifyContent: "center",
    backgroundColor: colors.light.primary,
    width: 100,
    height: 40,
    borderRadius: 30,
  },
  submitButtonText: {
    ...textStyles.button,
    color: colors.light.textOnPrimary,
    textAlign: "center",
  },
});

export default Card;
