import { View, Text } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RangeComponents from "../RangeComponents";
import SongsCard from "../cards/SongsCard";
import { ScrollView } from "react-native-gesture-handler";
import AlbumCard from "../cards/AlbumCard";
import { artistsnft } from "../../utils";
import NFTCard from "../NFTCard";

const AllNfts = () => {
  return (
    <View className="">
      <View className="flex-row items-center justify-between w-full">
        <Text className="text-[20px] font-bold text-[#fff]">
          NFT's of different levels
        </Text>
        <View className="flex-row items-center space-x-1">
          <Text className="text-[12px] font-bold text-[#fff]">More</Text>
          <FontAwesome name="chevron-right" color="#fff" />
        </View>
      </View>

      <RangeComponents nfts={true}/>

      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 19 }}>
        {artistsnft.map((item, index) => (
          <View style={{ width: "50%" }}>
            <NFTCard key={index} {...item} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default AllNfts;
