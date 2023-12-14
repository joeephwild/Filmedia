import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RangeComponents from "../RangeComponents";
import SongsCard from "../cards/SongsCard";
import { ScrollView } from "react-native-gesture-handler";
import AlbumCard from "../cards/AlbumCard";
import ArtistCard from "../cards/ArtistCard";
import { _getAllArtist } from "../../constants/_helperFunctions";
import { artistsArr } from "../../utils";

const AllArtist = () => {
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
  const [artists, setArtist] = useState([]);

  useEffect(() => {
    const getAllArtist = async () => {
      const artistsall = await _getAllArtist();
      console.log(artistsall, "sssssssss");
      setArtist(artistsall);
    };
    // getAllArtist();
  }, []);

  // const artistsArr = [
  //   {
  //     tokenId: 1,
  //   },
  //   {
  //     tokenId: 2,
  //   },
  //   {
  //     tokenId: 3,
  //   },
  // ];

  return (
    <View className="">
      <View className="flex-row items-center justify-between w-full">
        <Text className="text-[20px] font-bold text-[#fff]">Artists</Text>
        <View className="flex-row items-center space-x-1">
          <Text className="text-[12px] font-bold text-[#fff]">More</Text>
          <FontAwesome name="chevron-right" color="#fff" />
        </View>
      </View>

      <RangeComponents />

      <View
        style={{ flexDirection: "column", flexWrap: "wrap", marginTop: 19 }}
      >
        {artistsArr?.length == 0
          ? null
          : artistsArr?.map((val, index) => (
              <View key={index}>
                <ArtistCard {...val} />
              </View>
            ))}
      </View>
    </View>
  );
};

export default AllArtist;
