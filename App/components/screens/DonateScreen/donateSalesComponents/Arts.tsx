import React from 'react';
import {
  FlatList,
  ActivityIndicator,
} from 'react-native';

import AuctionCard from '../Card/AuctionCard';

interface ArtsProps {
  arts: Array<{
    id: number;
    name: string;
    price_html: string;
    prices: {
      price: number;
    };
    permalink: string;
    images: Array<{
      thumbnail: string;
      src: string;
    }>;
  }>;
  isLoading: boolean;
}

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
              description={item.price_html}
              price={item.prices.price}
              link={item.permalink}
              image={item.images[0].thumbnail}
              previwImage={item.images[0].src}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </>
  );
};

export default Arts;
