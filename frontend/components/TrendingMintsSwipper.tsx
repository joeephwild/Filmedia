import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { interval, limit, tokenType } from "../utils/contants";
import { useQuery } from "@airstack/airstack-react";
import dayjs, { Dayjs } from "dayjs";
import formatFunction from "./trendingMInts/format";
import scoringFunction from "./trendingMInts/scoring";
import filterFunction from "./trendingMInts/filter";
import { TrendingQuery } from "../utils/Query";

const RenderMintCard = ({ item }: any) => {
  const { token, score, projectDetails } = item;
  console.log(projectDetails?.collectionName);
  const message = `${token?.name} have been minted more than ${score} times   
  the last ${interval} hours`;

  return (
    <View style={styles.slide}>
      <Image source={{ uri: token?.imageUrl }} style={styles.image} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const TrendingMintsSwiper = ({ data }: any) => {
  const [mints, setMintsData] = useState<any[]>([]);

  const {
    data: queryData,
    error,
    loading,
  } = useQuery(TrendingQuery, {
    startTime: dayjs().subtract(interval, "h").format("YYYY-MM-DDTHH:mm:ss[Z]"),
    endTime: dayjs().format("YYYY-MM-DDTHH:mm:ss[Z]"),
    chain: "ethereum",
    limit,
    tokenType,
  });

  useEffect(() => {
    if (!loading && !error) {
      const mintsData =
        formatFunction(queryData)?.map((mint: any) => ({
          ...mint,
          chain: "ethereum",
        })) ?? [];
      // console.log(mintsData, "mintin")
      const scoredData = scoringFunction(mintsData);
      const filteredData = filterFunction(scoredData, 9); // only mints with more than  9 score are returned
      setMintsData(filteredData);
    }
  }, [loading, error, queryData]);
  console.log(mints);
  return (
    <View style={styles.swiper}>
      <Carousel
        data={mints}
        renderItem={({ item }) => <RenderMintCard item={item} />}
        layout={"default"}
        layoutCardOffset={18}
        itemWidth={400}
        sliderWidth={600}
        slideStyle={{ display: "flex", justifyContent: "center" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  swiper: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    // height: 100,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  message: {
    textAlign: "center",
    color: "#333",
    padding: 5,
  },
});

export default TrendingMintsSwiper;
