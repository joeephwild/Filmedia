import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import useGetArtist from "../../constants/hooks/useGetArtist";
import { artistFTAddress } from "../../constants/addresses";

type Props = {
  name: string;
  description: string;
  image: string;
  owner: string
};

const ArtistCard = ({ name, description, image , owner}: Props) => {
  // const [imageURI, tokenName, tokenDescription, category] = useGetArtist(
  //   id,
  //   artistFTAddress
  // );

  return (
    <Link href={{ pathname: `/artist/${owner}`, params: { address: owner } }}>
      <View className="flex-row items-center space-x-3 pb-5">
        <Text className="text-[14px] text-[#fff] font-bold">1</Text>
        <View className="flex-row items-center space-x-8">
          <Image
            source={{
              uri: image,
            }}
            className="w-[90px] rounded-full h-[90px] bg-black"
          />
          <View>
            <Text className="text-[14px] text-[#fff] font-bold">{name}</Text>
            <Text className="text-[10px] text-[#808080] font-bold">
              {description}
            </Text>
          </View>
        </View>
      </View>
    </Link>
  );
};

export default ArtistCard;
