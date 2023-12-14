import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import useGetNFTs from "../../constants/hooks/useGetNFT";
import { artistNFTAddress } from "../../constants/addresses";
import { Audio } from "expo-av";

type Props = {
  name: string;
  image: string;
  artist: string;
  tokenId: number;
  description: string;
  external_url: string;
};

const SongsCard = ({
  image,
  name,
  tokenId,
  external_url,
  description,
}: Props) => {
  // const [imageURI, tokenName, tokenDescription, category] = useGetNFTs(
  //   tokenId,
  //   artistNFTAddress
  // );

  async function playSound() {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    try {
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        {
          uri: external_url,
        },
        { shouldPlay: true }
      );

      playbackObject.stopAsync();
      // await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      console.log("Error loading audio", error);
    }
  }

  return (
    <View className="flex-row items-center space-x-2 w-full pb-4">
      <Text className="border-y text-[#fff] border-[#fff]">1</Text>
      <View className="flex-row items-center space-x-[78px]">
        <View className="flex-row items-center space-x-6">
          <Image
            source={{
              uri: image,
            }}
            className="w-[80px] h-[80px] bg-black"
          />
          <View className="">
            <Link href={`/artist/${name}`}>
              <Text className="text-[#fff] text-[16px] font-bold">{name}</Text>
            </Link>
            <Text className="text-[#fff] text-[14px] font-semibold">
              {name}
            </Text>
            <Text className="text-[#fff] w-[200px] text-[14px] font-semibold">
              {description}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={playSound}>
          <FontAwesome name="play-circle" color="#fff" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SongsCard;
