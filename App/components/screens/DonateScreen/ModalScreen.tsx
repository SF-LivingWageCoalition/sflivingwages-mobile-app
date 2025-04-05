import React from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";

type Props = NativeStackScreenProps<RootStackParamList, "Preview">;

const ModalScreen: React.FC<Props> = ({ route }) => {
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
