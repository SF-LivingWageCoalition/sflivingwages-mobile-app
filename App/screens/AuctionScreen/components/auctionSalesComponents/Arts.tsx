import React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { colors } from "../../../../theme";
import { ArtsProps } from "../../../../types/types";
import Card from "../cards/Card";

const Arts: React.FC<ArtsProps> = ({ arts, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.light.primary} />
      ) : (
        <FlatList
          horizontal={false}
          data={arts}
          renderItem={({ item }) => (
            <Card
              key={item.id}
              categoryId={944}
              name={item.name}
              description={item.price_html ? item.price_html : ""}
              price={item.prices.price}
              link={item.permalink}
              image={item.images[0].thumbnail}
              previewImage={item.images[0].src}
              buttonText="Place bid"
              showDescriptionModal={false}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </>
  );
};

export default Arts;
