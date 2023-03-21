import React, { useState} from 'react'
import {
  Text, 
  FlatList,
} from 'react-native';


import AuctionCard from '../Card/AuctionCard';

const Arts = ({ arts }) => {
  const [refreshing, setRefreshing ]   = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [closeDate, setCloseDate] = useState('');

 
  const calculateTimeLeft = (value) => {
    // Set bid end day here
    let year = new Date().getFullYear();
    //let endDate = arts.closeDate;
    let endDate = value
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
   
  const formatDate = (value) =>{
    var date = new Date(value).getDate(); //Current Date
    var month = new Date(value).getMonth() + 1; //Current Month
    var year = new Date(value).getFullYear(); //Current Year
    var hours = new Date(value).getHours() + 5 ; //Current Hours
    var min = new Date(value).getMinutes(); //Current Minutes
    var sec = new Date(value).getSeconds(); //Current Seconds
    setCloseDate(
       month + '/' + date + '/' + year 
      + ' ' + hours + ':' + min
    );
  }
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(arts.closeDate));

  
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

  const onRefresh = () =>{
     
  }

  return (
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
  )
}



export default Arts;