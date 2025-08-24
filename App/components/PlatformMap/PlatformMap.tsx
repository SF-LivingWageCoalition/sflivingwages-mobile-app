import React from "react";
import { Platform, Text } from "react-native";
import { AppleMaps, GoogleMaps } from "expo-maps";

type PlatformMapProps = React.ComponentProps<typeof AppleMaps.View> &
  React.ComponentProps<typeof GoogleMaps.View>;

const PlatformMap: React.FC<PlatformMapProps> = (props) => {
  if (Platform.OS === "ios") {
    return <AppleMaps.View {...props} />;
  } else if (Platform.OS === "android") {
    return <GoogleMaps.View {...props} />;
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
};

export default PlatformMap;
