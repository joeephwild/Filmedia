import { View, Text, Image } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RangeComponents from "../../components/RangeComponents";
import SongsCard from "../../components/cards/SongsCard";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const StickyHeader = () => {
  return (
    <SafeAreaView className="bg-black mt-2 flex-row items-center px-4 justify-between">
      <View className="flex-row items-center space-x-9">
        <FontAwesome name="music" size={30} color="blue" />
        <Text className="text-[26px] font-bold text-[#fff]">Playlist</Text>
      </View>

      <View className="flex-row items-center space-x-3">
        <FontAwesome name="download" size={24} color="white" />
        <FontAwesome name="user" size={24} color="white" />
      </View>
    </SafeAreaView>
  );
};

const TopSongs = () => {
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
    <View className="flex-1 min-h-screen">
      <View>
      <StickyHeader />
      </View>
      
      <ScrollView
        style={{
          flex: 1,
          minHeight: "100%",
        }}
        contentContainerStyle={{
          flex: 1,
        }}
        StickyHeaderComponent={() => {
          return <StickyHeader />;
        }}
      >
        <View className="flex-row items-center justify-between w-full">
          <Text className="text-[20px] font-bold text-[#fff]">
            Songs made for you
          </Text>
          <View className="flex-row items-center space-x-1">
            <Text className="text-[12px] font-bold text-[#fff]">More</Text>
            <FontAwesome name="chevron-right" color="#fff" />
          </View>
        </View>

        <RangeComponents />
        <View className="flex-col space-y-6 mt-4 w-full overflow-hidden">
          {!songs
            ? null
            : songs?.map((val, i) => <SongsCard key={i} {...val} />)}
        </View>
      </ScrollView>
    </View>
  );
};

export default TopSongs;
