import React, { useState } from 'react';
import {Button, Text, View, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import styles from './style/styles';
export default function WebView() {
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://expo.io');
    setResult(result);
  };
  return (
    <View style={{flex: 1}}>
      <Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />
      <Text>{result && JSON.stringify(result)}</Text>
    </View>
  );
}

