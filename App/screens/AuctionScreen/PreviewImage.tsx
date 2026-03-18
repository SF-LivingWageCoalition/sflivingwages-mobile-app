import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import React from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import { colors } from "../../theme";
import { RootStackParamList } from "../../types/types";

type Props = NativeStackScreenProps<RootStackParamList, "PreviewImage">;

const PreviewImage: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();

  const { image } = route.params;
  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", top: 40, left: 20, zIndex: 1 }}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={10}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <FontAwesome5 name="chevron-left" size={24} color="white" />
        </Pressable>
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
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PreviewImage;
