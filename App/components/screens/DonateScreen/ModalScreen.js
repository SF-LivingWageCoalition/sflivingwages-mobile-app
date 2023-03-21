
import { View, Image, Dimensions, ScrollView } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

export default function ModalScreen({ route }) {
  const { image } = route.params
  const { width, height } = Dimensions.get('window');
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
            source={{ uri: image }} />
        </ImageZoom>
      </ScrollView>
    </View>
  );
}