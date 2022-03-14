import 'react-native-gesture-handler';

import React, { Component, useContext , useEffect, useState} from 'react';
import { Button,Image, View, Text  } from 'react-native';
import {
  createMaterialTopTabNavigator
} from '@react-navigation/material-top-tabs';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Arts from './donateSalesComponents/Arts';
import Books from './donateSalesComponents/Books';
import Cds from './donateSalesComponents/Cds';
import Dvds from './donateSalesComponents/Dvds';
import Photos from './donateSalesComponents/Photos';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createMaterialTopTabNavigator();


export default class AuctionNav extends React.Component {
    // const [arts, setArt] = useState(fetchArt );
    // const [books, setBook] = useState(fetchBook);
    constructor(props) {
        super(props);
        this.state = {
          arts: [],
          books: [],
          photos: [],
          cds: [],
          dvds: [],
          modalVisible: false,
          bid: ''
        };
      }

    componentDidMount(){
        this.fetchArt()
        this.fetchBook()
        this.fetchCds()
        this.fetchDvds()
        this.fetchPhoto()
    }
    fetchArt = async () => {
        Promise.all(
          [
          fetch('http://157.245.184.202:8080/arts') ])
        .then(([ resArt])=> Promise.all([ resArt.json(), ]))
        .then(([dataArt]) => this.setState({ arts: dataArt }))
      }
    fetchBook = async () => {
        Promise.all(
          [fetch('http://157.245.184.202:8080/pictures')])
         .then(([ resBooks])=> Promise.all([ resBooks.json(), ]))
         .then(([dataBooks]) => this.setState({ 
          books: dataBooks }))
    
    }  

    fetchPhoto = async () => {
    Promise.all(
        [fetch('http://157.245.184.202:8080/photos')])
    .then(([ resPhotos])=> Promise.all([ resPhotos.json(), ]))
    .then(([dataPhotos]) => this.setState({ photos: dataPhotos }))
    }
    fetchCds = async () => {
    Promise.all(
        [fetch('http://157.245.184.202:8080/cds')])
    .then(([ resCds])=> Promise.all([ resCds.json(), ]))
    .then(([dataCds]) => this.setState({ cds: dataCds }))
    }
    fetchDvds = async () => {
    Promise.all(
        [fetch('http://157.245.184.202:8080/dvds')])
    .then(([ resDvds])=> Promise.all([ resDvds.json(), ]))
    .then(([dataDvds]) => this.setState({ dvds: dataDvds }))
    }

   render(){
        return (

            <Tab.Navigator
            initialRouteName="Arts"
            tabBarOptions={{
                activeTintColor: '#870c18',
                inactiveTintColor: '#ffffff',
                style: {
                backgroundColor: '#d31623',
                },
                labelStyle: {
                textAlign: 'center',
                },
                indicatorStyle: {
                borderBottomColor: '#87B56A',
                borderBottomWidth: 2,
                },
            }}>
            <Tab.Screen
                name="Arts"
                children={()=><Arts arts={this.state.arts}/>}
                options={{
                tabBarLabel: 'Art',
              
                }}  />

            <Tab.Screen
                name="Photos"
                children={()=><Photos photos={this.state.photos}/>}
                options={{
                tabBarLabel: 'Photo',
              
            }} />
            <Tab.Screen
                name="Books"
                children={()=><Books books={this.state.books}/>}
                options={{
                tabBarLabel: 'Book',
              
            }} />
            <Tab.Screen
                name="Cds"
                children={()=><Cds cds={this.state.cds}/>}
                options={{
                tabBarLabel: 'Cd',
              
                }}  />
            <Tab.Screen
                name="Dvds"
                children={()=><Dvds dvds={this.state.dvds}/>}
                options={{
                tabBarLabel: 'DVD',
              
            }} />
           
            
            </Tab.Navigator>
        );
    }
}