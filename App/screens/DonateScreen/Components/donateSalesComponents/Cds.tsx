import React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { CdsProps } from "../../../../types";
import Card from "../Card/Card";

const Cds: React.FC<CdsProps> = ({ cds, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          horizontal={false}
          data={cds}
          renderItem={({ item }) => (
            <Card
              key={item.id}
              name={item.name}
              description={item.description ? item.description : ""}
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

export default Cds;
