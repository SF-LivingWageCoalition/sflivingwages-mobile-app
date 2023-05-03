import React, { useState } from 'react'
import {
  FlatList,
  ActivityIndicator
} from 'react-native';


import AuctionCard from '../Card/AuctionCard';

const Arts = ({ arts, isLoading }) => {
  
  return (
    <>
      {
        isLoading ? <ActivityIndicator size="large" color="red" />
          :
          <FlatList
            horizontal={false}
            data={arts}
            renderItem={({ item }) => <AuctionCard
              key={item.id}
              categoryId={944}
              name={item.name}
              description={item.price_html}
              price={item.prices.price}
              link={item.permalink}
              image={item.images[0].thumbnail}
              previwImage={item.images[0].src}
            />
            }
          />
      }

    </>
  )
}



export default Arts;