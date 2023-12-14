import { View, Text } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RangeComponents from "./RangeComponents";
import SongsCard from "./cards/SongsCard";
import { ScrollView } from "react-native-gesture-handler";
import NFTCard from "./NFTCard";

const NFTs = () => {
  const songs = [
    {
      name: "Song 1",
      image: "https://example.com/song1_image.jpg",
      title: "First Melody",
      artist: "Artist A",
    },
    {
      name: "Song 2",
      image: "https://example.com/song2_image.jpg",
      title: "Groovy Beats",
      artist: "Artist B",
    },
    {
      name: "Song 3",
      image: "https://example.com/song3_image.jpg",
      title: "Serenade in D",
      artist: "Artist C",
    },
    {
      name: "Song 4",
      image: "https://example.com/song4_image.jpg",
      title: "Epic Symphony",
      artist: "Artist D",
    },
    {
      name: "Song 5",
      image: "https://example.com/song5_image.jpg",
      title: "Jazz Fusion",
      artist: "Artist E",
    },
  ];

  return (
    <View className="w-full mx-4 pt-6">
      <View className="flex-row items-center justify-between w-full">
        <Text className="text-[20px] font-bold text-[#fff]">Your NFT's</Text>
      </View>
      <ScrollView
        horizontal
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <View className="flex-col space-y-6 mt-4 w-full overflow-hidden">
          {songs.slice(0, 3).map((item, index) => (
            <NFTCard key={index} {...item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default NFTs;
