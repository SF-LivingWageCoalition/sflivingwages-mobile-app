import React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { BooksProps } from "../../../../types";
import Card from "../Card/Card";

const Books: React.FC<BooksProps> = ({ books, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          horizontal={false}
          data={books}
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

export default Books;
