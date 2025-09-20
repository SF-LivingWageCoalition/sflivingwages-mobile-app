import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import { Button } from "react-native";
import { colors } from "../../../../theme";
import { DetailParams, MyNavigationButtonProps } from "../../../../types";

const MyNavigationButton: React.FC<MyNavigationButtonProps> = ({
  author,
  description,
  title,
}) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <Button
      title="Details"
      color={colors.light.primary}
      onPress={() => {
        navigation.navigate("SalesDetail", {
          image: author,
          bio: description,
          title: title,
        } as DetailParams);
      }}
    />
  );
};

export default MyNavigationButton;
