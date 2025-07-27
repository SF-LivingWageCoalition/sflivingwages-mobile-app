import React, { useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { CampaignActionProps } from "../../../types";

const CampaignAction: React.FC<CampaignActionProps> = (props) => {
  const [stepText, setStepText] = useState<string | undefined>(props.stepText);
  const [url, setUrl] = useState<string | undefined>(props.url);

  return (
    <View>
      <View style={styles.headerContainer}>
        {stepText && <Text style={styles.headerText}>Action Steps:</Text>}
      </View>

      <View style={styles.stepContainer}>
        {stepText && <Text style={styles.stepNumber}>1 </Text>}
        {stepText && <Text>{stepText}</Text>}
      </View>

      <View style={styles.linkContainer}>
        {url && (
          <Text
            style={styles.linkText}
            onPress={() => {
              Linking.openURL(url);
            }}
          >
            Click here
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  headerText: {
    fontFamily: "sans-serif",
    fontSize: 24,
    width: 260,
    height: 30,
    color: "black",
    paddingLeft: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  stepContainer: {
    flexDirection: "row",
    paddingLeft: 20,
  },
  stepNumber: {
    color: "#c91a1a",
  },
  linkContainer: {
    paddingLeft: 20,
  },
  linkText: {
    color: "blue",
  },
});

export default CampaignAction;
