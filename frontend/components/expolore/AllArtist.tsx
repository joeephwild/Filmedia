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
  const [artists, setArtist] = useState([]);

  // useEffect(() => {
  //   const getAllArtist = async () => {
  //     const artistsall = await _getAllArtist();
  //     console.log(artistsall, "sssssssss");
  //     setArtist(artistsall);
  //   };
  //   // getAllArtist();
  // }, []);

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
