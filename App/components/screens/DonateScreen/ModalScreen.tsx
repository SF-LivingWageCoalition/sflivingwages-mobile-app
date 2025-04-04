import React from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import { ModalScreenProps } from "../../../../App/types";

const ModalScreen: React.FC<ModalScreenProps> = ({ route }) => {
  // Extract image from route params
  const { image } = route.params;

  const { width, height } = Dimensions.get("window");

  return (
    <View style={{ flex: 1 }}>
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

export default ModalScreen;
