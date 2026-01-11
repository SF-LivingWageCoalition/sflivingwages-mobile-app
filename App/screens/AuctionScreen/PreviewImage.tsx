import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import { RootStackParamList } from "../../types/types";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../theme";
import { Image } from "expo-image";

type Props = NativeStackScreenProps<RootStackParamList, "PreviewImage">;

const PreviewImage: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();

  const { image } = route.params;
  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", top: 40, left: 20, zIndex: 1 }}>
        <Entypo
          name="chevron-left"
          size={40}
          color="white"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ImageZoom
        cropWidth={width}
        cropHeight={height}
        imageWidth={width}
        imageHeight={height}
      >
        <Image
          style={{ width: width, height: height }}
          source={{ uri: image }}
          contentFit="contain"
          cachePolicy={"memory-disk"}
          priority="high"
        />
      </ImageZoom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: colors.light.onBackground,
  },
});

export default PreviewImage;
