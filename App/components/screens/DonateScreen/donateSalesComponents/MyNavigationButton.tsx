import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import { Button } from "react-native";
import {
  MyNavigationButtonProps,
  DetailParams,
} from "../../../../../App/types";

const MyNavigationButton: React.FC<MyNavigationButtonProps> = ({
  author,
  description,
  title,
}) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <Button
      title="Details"
      color="#c91a1a"
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
