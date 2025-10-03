import React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { colors } from "../../../../theme";
import { LPsProps } from "../../../../types/types";
import Card from "../cards/Card";

const LPs: React.FC<LPsProps> = ({ lps, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.light.primary} />
      ) : (
        <FlatList
          horizontal={false}
          data={lps}
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

export default LPs;
