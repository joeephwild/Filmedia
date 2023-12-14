import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

type Props = {
  name: string;
  image: string;
  title: string;
  artist: string;
};

const PodcastCard = ({ artist, image, name, title }: Props) => {
  return (
    <View className="bg-black flex-row space-x-5 max-h-[85px] pb-8 w-full">
      <Image
        source={{
          uri: image,
        }}
        className="w-[80px] h-[85px] bg-white"
      />
      <View className="flex-col items-start pt-7">
        <Link href={`/artist/${name}`}>
          <Text className="text-[#fff] text-[16px] font-bold">{name}</Text>
        </Link>

        <Text className="text-[12px] font-bold text-[#808080]">{title}</Text>
      </View>
    </View>
  );
};

export default PodcastCard;
