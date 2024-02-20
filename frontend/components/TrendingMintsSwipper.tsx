import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { interval } from '../utils/contants';

const TrendingMintsSwiper = ({ data }:any) => {
  const renderMintCard = (mint:any, index:any) => {
    const { token, score } = mint;
    const message = `${token?.name} have been minted more than ${score} times 
    the last ${interval} hours`;

      return (
        // @ts-ignore
      <Card key={index}>
        <Card.Title>{token?.name}</Card.Title>
        <Card.Divider />
        <Text style={styles.message}>{message}</Text>
      </Card>
    );
  };

  return (
    <Swiper
      style={styles.swiper}
      showsButtons={true}
      buttonWrapperStyle={styles.buttonWrapper}
      nextButton={<Text style={styles.buttonText}>Next</Text>}
      prevButton={<Text style={styles.buttonText}>Prev</Text>}
    >
      {data.map((mint:any, index:any) => (
        <View key={index} style={styles.slide}>
          {renderMintCard(mint, index)}
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  swiper: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#007aff',
    padding: 10,
  },
  message: {
    textAlign: 'center',
    color: '#333',
    padding: 5,
  },
});

export default TrendingMintsSwiper;