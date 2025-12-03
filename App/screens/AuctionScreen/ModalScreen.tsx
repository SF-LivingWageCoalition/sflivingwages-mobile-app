import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import { RootStackParamList } from "../../types/types";

type Props = NativeStackScreenProps<RootStackParamList, "Preview">;

const ModalScreen: React.FC<Props> = ({ route }) => {
  const { image } = route.params;
  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageZoom
          cropWidth={width}
          cropHeight={height}
          imageWidth={width}
          imageHeight={height}
        >
          <Image
            style={{ width: width, height: height }}
            source={{ uri: image }}
          />
        </ImageZoom>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ModalScreen;
