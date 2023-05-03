import React from 'react';

import {
  FlatList,
  ActivityIndicator
} from 'react-native';

import Card from '../Card/Card';

const Dvds = ({ dvds, isLoading }) => {

  return (
    <>
      {
        isLoading ? <ActivityIndicator size="large" color="red" /> :
          <FlatList
            horizontal={false}
            data={dvds}
            renderItem={({ item }) => <Card
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.prices.price}
              link={item.permalink}
              image={item.images[0].thumbnail}
              previwImage={item.images[0].src}

            />}
          />
      }
    </>
  )
}

export default Dvds;