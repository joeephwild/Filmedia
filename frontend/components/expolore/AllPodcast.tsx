import { View, Text } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RangeComponents from "../RangeComponents";
import SongsCard from "../cards/SongsCard";
import { ScrollView } from "react-native-gesture-handler";
import AlbumCard from "../cards/AlbumCard";
import PodcastCard from "../cards/PodcastCard";

const AllPodcast = () => {
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
    {
      name: "Song 5",
      image: "https://example.com/song5_image.jpg",
      title: "Jazz Fusion",
      artist: "Artist E",
    },
  ];

  return (
    <View className="">
      <View className="flex-row items-center justify-between w-full">
        <Text className="text-[20px] font-bold text-[#fff]">
          Podcasts made for you
        </Text>
        <View className="flex-row items-center space-x-1">
          <Text className="text-[12px] font-bold text-[#fff]">More</Text>
          <FontAwesome name="chevron-right" color="#fff" />
        </View>
      </View>

      <RangeComponents />

      <View
        style={{ flexDirection: "column", flexWrap: "wrap", marginTop: 19 }}
      >
        {songs.map((item, index) => (
          <View style={{ width: "100%", paddingBottom: 8 }}>
            <PodcastCard key={index} {...item} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default AllPodcast;
