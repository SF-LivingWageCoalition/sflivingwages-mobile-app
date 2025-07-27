import React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { ArtsProps } from "../../../types";
import AuctionCard from "../Card/AuctionCard";

const Arts: React.FC<ArtsProps> = ({ arts, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          horizontal={false}
          data={arts}
          renderItem={({ item }) => (
            <AuctionCard
              key={item.id}
              categoryId={944}
              name={item.name}
              description={item.price_html ? item.price_html : ""}
              price={item.prices.price}
              link={item.permalink}
              image={item.images[0].thumbnail}
              previewImage={item.images[0].src}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </>
  );
};

export default Arts;
