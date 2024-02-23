import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import AllSongs from "../../components/expolore/AllSongs";
import AllAlbums from "../../components/expolore/AllAlbums";
import AllArtist from "../../components/expolore/AllArtist";
import { Link, router } from "expo-router";
import { Profiles } from "@lens-protocol/react-native-lens-ui-kit";
import TrendingMintsSwiper from "../../components/TrendingMintsSwipper";

export default function TabOneScreen() {
  // // const m: any = [];
  // const mintsDataRef = useRef<any[]>([]);
  // // console.log("data : ", data);

  // useEffect(() => {}, []);

  // const currentTime = dayjs();
  // const getData = async () => {
  //   console.log("hii");
  //   const data = await trendingMints(currentTime);
  //   console.log("data : ", data);
  //   mintsDataRef.current = data;
  //   data.length > 0 &&
  //     data.map((data: any, i: Number) => {
  //       const { token, score } = data;
  //       const message = `${token?.name} have been minted more than ${score} times
  //   the last ${interval} hours`;
  //       console.log(message);
  //     });
  // };

  // getData();

  // console.log("mitns Data : ", mintsDataRef.current);
  return (
    <SafeAreaView className="min-h-screen flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: 100,
          flex: 1,
          minHeight: "100%",
        }}
      >
        {/** header view */}


        <AllSongs />
        <TrendingMintsSwiper />
        <AllAlbums />
        <AllArtist />
      </ScrollView>
    </SafeAreaView>
  );
}
