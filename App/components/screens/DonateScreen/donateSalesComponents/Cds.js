import React, { useState, useEffect } from 'react';

import {
  Text,
  FlatList,
 
} from 'react-native';

import Card from '../Card/Card';

const Cds = ({ cds }) => {
  const calculateTimeLeft = (value) => {
    // Set bid end day here
    let year = new Date().getFullYear();
    let endDate = value // books[0].closeDate;
    //Date format: 2021-06-01T12:00:00.000Z
    let difference = +new Date(endDate) - +new Date();


    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });
  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <Text>
        {timeLeft[interval]} {interval}{" "}
      </Text>
    );
  });
  
  return (
    <FlatList
      horizontal={false}
      data={cds}
      renderItem={({ item }) => <Card
        key={item.id}
        name={item.name}
        description={item.description}
        price={item.prices.price}
        link={item.permalink}
        image={item.images[0].thumbnail}
        previwImage={item.images[0].src}
      />
      }
    />
  );
}


export default Cds;