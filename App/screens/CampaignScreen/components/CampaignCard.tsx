import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../theme";
import { fontSize } from "../../../theme/fontStyles";
import { CampaignCardProps } from "../../../types";

const CampaignCard: React.FC<CampaignCardProps> = (props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  // Use props.navigate if provided, otherwise use the navigation hook
  const navigateToScreen = (screen: string, params?: any) => {
    if (props.navigate) {
      props.navigate(screen, params);
    } else if (navigation) {
      navigation.navigate(screen, params);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text
          style={styles.homeNavText}
          onPress={() => navigateToScreen("CampaignDetailpage")}
        >
          Raise Wage
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeNavText: {
    fontSize: fontSize.md,
    color: colors.light.primaryDark,
    textAlign: "center",
    padding: 10,
  },
});

export default CampaignCard;
