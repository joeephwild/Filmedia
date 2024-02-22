import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { interval } from "../utils/contants";
import { artistsArr } from "../utils";

const renderMintCard = (mint: any, index: any) => {
  const { token, score } = mint;
  const message = `${token?.name} have been minted more than ${score} times   
  the last ${interval} hours`;

  return (
    <View key={index} style={styles.slide}>
      <Image source={{ uri: token?.imageUrl }} style={styles.image} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const TrendingMintsSwiper = ({ data }: any) => {
  return (
    <View style={styles.swiper}>
      <Carousel
        data={data}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.slide}>
         
          <Text style={styles.message}>{item.chain}</Text>
        </View>
        )}
        layout={"stack"}
        layoutCardOffset={18}
        itemWidth={200}
        sliderHeight={500}
        sliderWidth={300}
        itemHeight={500}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  swiper: {
    flex:   1,
  },
  slide: {
    flex:   1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 100
  },
  image: {
    width:  100,
    height:  100,
    resizeMode: "cover",
  },
  message: {
    textAlign: "center",
    color: "#333",
    padding:   5,
  },
});

export default TrendingMintsSwiper;