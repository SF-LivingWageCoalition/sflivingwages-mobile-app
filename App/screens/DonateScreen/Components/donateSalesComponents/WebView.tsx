import * as WebBrowser from "expo-web-browser";
import React, { JSX, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { WebBrowserResult } from "../../../../types";

export default function WebView(): JSX.Element {
  const [result, setResult] = useState<WebBrowserResult | null>(null);

  const _handlePressButtonAsync = async (): Promise<void> => {
    const result = await WebBrowser.openBrowserAsync("https://expo.io");
    setResult(result);
  };

  return (
    <View style={styles.container}>
      <Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />
      <Text>{result && JSON.stringify(result)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
