import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import useGetNFTs from "../../constants/hooks/useGetNFT";
import { artistNFTAddress } from "../../constants/addresses";
import { Audio } from "expo-av";
import { useAuth } from "../../context/AuthContext";

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
  artist,
}: Props) => {
  // const [imageURI, tokenName, tokenDescription, category] = useGetNFTs(
  //   tokenId,
  //   artistNFTAddress
  // );
  const { playSound, currentlyPlayed, isPlaying, pauseSound } = useAuth();

  async function handlePlaySound() {
    const sound = {
      image,
      name,
      external_url,
      artist,
    };

    playSound(external_url, sound);
  }

  return (
    <Pressable
      onPress={handlePlaySound}
      className="flex-row items-center justify-between px-2  pb-4"
    >
      <View className="flex-row items-center space-x-[8px]">
        <Text className="border-y text-[#fff] border-[#fff]">1</Text>
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
            {/* <Text className="text-[#fff] w-[200px] text-[12px] font-semibold">
              {description}
            </Text> */}
          </View>
        </View>
      </View>
      <TouchableOpacity>
        {currentlyPlayed.url != external_url ? (
          <FontAwesome
            onPress={handlePlaySound}
            name="play-circle"
            color="#ADF802"
            size={34}
          />
        ) : (
          <FontAwesome
            onPress={pauseSound}
            name="pause-circle"
            color="#ADF802"
            size={34}
          />
        )}
      </TouchableOpacity>
    </Pressable>
  );
};

export default SongsCard;
