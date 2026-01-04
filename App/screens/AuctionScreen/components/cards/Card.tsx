import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MainButton from "../../../../components/MainButton";
import { colors } from "../../../../theme";
import { textStyles } from "../../../../theme/fontStyles";
import { CardProps, PreviewScreenParams } from "../../../../types/types";
import ItemModal from "../modalComponent/ItemModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";

const Card: React.FC<CardProps> = ({
  name,
  description,
  price,
  link,
  image,
  previewImage,
  buttonText = "Shop",
  showDescriptionModal = true,
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
            navigate.navigate("PreviewImage", {
              image: previewImage,
            } as PreviewScreenParams);
          }}
        >
          <Image
            style={styles.imageStyle}
            source={{ uri: image }}
            cachePolicy="memory-disk"
            priority="high"
          />
          <View style={styles.tapIconContainer}>
            <MaterialCommunityIcons
              name="gesture-double-tap"
              size={40}
              color={colors.light.primaryLight}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <View style={{ marginVertical: 10 }}>
            {showDescriptionModal ? (
              <ItemModal title={name} description={cleanDescription} />
            ) : (
              <Text style={[textStyles.body, { marginHorizontal: 16 }]}>
                {cleanDescription}
              </Text>
            )}
            <Text style={[textStyles.body, { marginHorizontal: 16 }]}>
              ${itemPrice}
            </Text>
          </View>
          {/* Product Individual page link */}
          <View style={styles.buttonContainer}>
            <MainButton
              variant="outlined"
              title={buttonText}
              size="small"
              icon={
                <FontAwesome5
                  name={"donate"}
                  color={colors.light.secondary}
                  size={20}
                />
              }
              onPress={() => {
                Linking.openURL(link);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tapIconContainer: {
    backgroundColor: colors.light.primaryContainer,
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 25,
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  cardTitle: {
    ...textStyles.h5,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  cardImage: {
    backgroundColor: colors.light.background,
    flex: 1,
    marginBottom: 16,
  },
  imageStyle: {
    width: "100%",
    height: 300,
  },

  buttonContainer: {
    marginHorizontal: 16,
    marginTop: 10,
  },
});

export default Card;
