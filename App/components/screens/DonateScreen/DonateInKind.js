//Import Necessary Packges
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import DropDownItem from 'react-native-drop-down-item';
const IC_ARR_DOWN = require('./icons/ic_arr_down.png');
const IC_ARR_UP = require('./icons/ic_arr_up.png');

//type Props = {};
export default class DonateInKind extends React.Component {
  state = {
    contents: [
      {
        title: 'Goods',
        body: 'Donate to The Community Thrift Store and benefit the Living Wage Coalition. Donation Code 56. \n \n623 Valencia St., between 17th and 18th Streets San Francisco, CA 94110',
      },
      {
        title: 'Computers',
        body: 'We are in need of laptops/desktops operating Mac OS 10.4 or later. \n \nDonations of equipment are tax-deductible.',
      },
      {
        title: 'Vehicles',
        body: 'Donating a car, truck, motorcycles, boat, plane, RV, trailer, and even real estate can earn you tax benefits. If you are interested in making a donation, please call Car Donation Services. \n\nToll-free number 888-686-4483. CDS handles towing and all paperwork. Be sure to mention that your donation is for the San Francisco Living Wage Coalition. Then let us know your name and the item that you will be donating so that we get proper credit.',
      },
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ alignSelf: 'stretch' }}>
       
          {
            this.state.contents
              ? this.state.contents.map((param, i) => {
                return (
                  <DropDownItem
                    key={i}
                    style={styles.dropDownItem}
                    contentVisible={false}
                    invisibleImage={IC_ARR_DOWN}
                    visibleImage={IC_ARR_UP}
                    header={
                      <View style={styles.header}>
                        <Text style={{
                          fontSize: 20,
                          color: '#0088dc',
                        }}>{param.title}</Text>
                      </View>
                    }
                  >
                    <Text style={[
                      styles.txt,
                      {
                        fontSize: 16,
                        color: '#100c08',
                        paddingHorizontal: 12,
                      },
                    ]}>
                      {param.body}
                    </Text>
                  </DropDownItem>
                );
              })
              : null
          }
          <View style={{ height: 96 }}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingTop: 0,
  },
  header: {
    width: '100%',
    paddingVertical: 0,
    paddingHorizontal: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  // headerTxt: {
  //   fontSize: 12,
  //   color: 'rgb(74,74,74)',
  //   marginRight: 60,
  //   flexWrap: 'wrap',
  // },
  txt: {
    fontSize: 14,
  },
  dropDownItem: {
    marginTop: 30,
  },
});