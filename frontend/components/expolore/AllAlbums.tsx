import { View, Text } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RangeComponents from "../RangeComponents";
import SongsCard from "../cards/SongsCard";
import { ScrollView } from "react-native-gesture-handler";
import AlbumCard from "../cards/AlbumCard";

const AllAlbums = () => {
  const songs = [
    {
      name: "Song 1",
      image: "https://images.pexels.com/photos/15868650/pexels-photo-15868650/free-photo-of-an-alternatively-dressed-woman-with-tattoos.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      title: "First Melody",
      artist: "Artist A",
    },
    {
      name: "Song 2",
      image: "https://images.pexels.com/photos/19774960/pexels-photo-19774960/free-photo-of-model-in-headscarf.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      title: "Groovy Beats",
      artist: "Artist B",
    },
    {
      name: "Song 3",
      image: "https://images.pexels.com/photos/17591304/pexels-photo-17591304/free-photo-of-narrow-alley-along-historic-townhouses.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      title: "Serenade in D",
      artist: "Artist C",
    },
    {
      name: "Song 4",
      image: "https://images.pexels.com/photos/13734186/pexels-photo-13734186.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      title: "Epic Symphony",
      artist: "Artist D",
    },
    {
      name: "Song 5",
      image: "https://images.pexels.com/photos/19841288/pexels-photo-19841288/free-photo-of-woman-in-black-elegant-clothes-lying-on-desert.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      title: "Jazz Fusion",
      artist: "Artist E",
    },
    {
      name: "Song 5",
      image: "https://images.pexels.com/photos/15571645/pexels-photo-15571645/free-photo-of-the-colour-show.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      title: "Jazz Fusion",
      artist: "Artist E",
    },
  ];

  return (
    <View className="">
      <View className="flex-row items-center justify-between w-full">
        <Text className="text-[20px] font-bold text-[#fff]">
          Albums made for you
        </Text>
        <View className="flex-row items-center space-x-1">
          <Text className="text-[12px] font-bold text-[#fff]">More</Text>
          <FontAwesome name="chevron-right" color="#fff" />
        </View>
      </View>

      <RangeComponents />

      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 19 }}>
        {songs.map((item, index) => (
          <View style={{ width: "50%" }}>
            <AlbumCard key={index} {...item} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default AllAlbums;
