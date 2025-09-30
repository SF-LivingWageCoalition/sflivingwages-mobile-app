import React, { useState } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { colors } from "../../../theme";
import { textStyles } from "../../../theme/fontStyles";
import { CampaignTitleProps } from "../../../types";

const CampaignTitle: React.FC<CampaignTitleProps> = (props) => {
  const { title, url, navigation } = props;
  const [isPress, setIsPress] = useState<boolean>(false);

  const touchProps = {
    activeOpacity: 0.7,
    underlayColor: colors.light.surfaceVariant,
    style: isPress ? styles.btnPress : styles.btnNormal,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => {
      setIsPress(true);
      if (navigation) {
        navigation.goBack();
      }
    },
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight {...touchProps}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableHighlight>

      <Text style={styles.titleText}>{title}</Text>

      {url && (
        <Text
          style={styles.linkText}
          onPress={() => {
            Linking.openURL(url);
          }}
        >
          ✏️ Edit
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 36,
    padding: 4,
    margin: 10,
    alignContent: "center",
  },
  backButtonText: {
    ...textStyles.button,
    height: 30,
    color: colors.light.primaryDark,
    paddingTop: 6,
    paddingLeft: 4,
    textAlign: "center",
  },
  titleText: {
    ...textStyles.h2,
    width: 300,
    height: 100,
    color: colors.light.primaryDark,
    paddingLeft: 20,
    textAlign: "center",
  },
  linkText: {
    paddingTop: 6,
    paddingLeft: 20,
    height: 30,
  },
  btnNormal: {
    opacity: 1,
  },
  btnPress: {
    opacity: 0.7,
  },
});

export default CampaignTitle;
