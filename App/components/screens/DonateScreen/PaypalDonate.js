import React, { useState ,useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Button, ScrollView } from "react-native";
import WebView from 'react-native-webview';

//import ProductDisplay from './ProductDisplay';
import { loadStripe } from "@stripe/stripe-js";

//import "./App.css";

// Make sure to call `loadStripe` outside of a component’s render to avoid

// recreating the `Stripe` object on every render.

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const ProductDisplay = ({ handleClick }) => (
    <View>


    {/* <div className="product">

      <img

        src="https://i.imgur.com/EHyR2nP.png"

        alt="The cover of Stubborn Attachments"

      />

      <div className="description">

        <h3>Stubborn Attachments</h3>

        <h5>$20.00</h5>

      </div>

    </div> */}

    <Button title="payments"  onClick={handleClick}>

      Checkout

    </Button>

  </View>
);

const Message = ({ message }) => (

//   <section>

//     <p>{message}</p>

//   </section>
    <View>
        <Text>message</Text>
    </View>

);

export default function PaymentDonate() {

    const [message, setMessage] = useState("");
    
    //const url = 'http://157.245.184.202:8080/create-payment-intent'
     
    useEffect(() => {
  
      // Check to see if this is a redirect back from Checkout
  
      //const query = new URLSearchParams(window.location.search);
        // const query = fetch('localhost:3001/create-payment-intent', {
        //     method: 'post',
        //       headers: { 'Content-Type': 'application/json' },
        //       body: JSON.stringify({items: [{ id: "xl-tshirt" }]})
        // })
        // .then(res => {

        //     return res.json();
    
        // })
        //    .then(data => {
    
        //     setClientSecret(data.clientSecret);
    
        // });
    
    }, []);
   
  
    const handleClick = async (event) => {
  
      const stripe = await stripePromise;
  
      const response = await fetch("http://localhost:3001/create-checkout-session", {
  
        method: "POST",
  
      });
  
      const session = await response.json();
  
      // When the customer clicks on the button, redirect them to Checkout.
  
      const result = await stripe.redirectToCheckout({
  
        sessionId: session.id,
  
      });
  
      if (result.error) {
  
        // If `redirectToCheckout` fails due to a browser or network
  
        // error, display the localized error message to your customer
  
        // using `result.error.message`.
  
      }
  
    };
  
    return message ? (
  
      <Message message={message} />
  
    ) : (
  
      <ProductDisplay handleClick={handleClick} />
  
    );
  
  }
  
