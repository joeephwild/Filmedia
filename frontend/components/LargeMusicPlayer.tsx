import { View, Text, Image } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from "@react-native-community/slider";

type Props = {
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  isFullScreen: boolean;
};

const LargeMusicPlayer = ({ setIsFullScreen, isFullScreen }: Props) => {
  return (
    <View className="space-y-3 px-2 py-2">
      <View className="flex-row items-center justify-around">
        <Ionicons
          onPress={() => setIsFullScreen(!isFullScreen)}
          name="chevron-down"
          size={22}
          color="#808080"
        />
        <View className="items-center">
          <Text className="text-[16px] font-semibold text-[#fff]">
            Over Dem
          </Text>
          <Text className="text-[12px] font-semibold text-[#fff]">
            By Davido
          </Text>
        </View>
        <Ionicons name="ellipsis-vertical" size={22} color="#fff" />
      </View>

      <View className="items-center pt-3">
        <Image
          source={{
            uri: "https://images.pexels.com/photos/19230195/pexels-photo-19230195/free-photo-of-a-little-boy-standing-outside-and-showing-thumbs-up.jpeg?auto=compress&cs=tinysrgb&w=1600",
          }}
          className="w-[365px] h-[365px] object-cover bg-black "
        />

        <View className="flex-row items-center w-full px-6 pt-4 justify-between">
          <View className="items-start">
            <Text className="text-[16px] font-semibold text-[#fff]">
              Over Dem
            </Text>
            <Text className="text-[12px] font-semibold text-[#fff]">
              By Davido
            </Text>
          </View>
          <Ionicons name="list" size={24} color="#fff" />
        </View>

        <View>
          <Slider
            style={{ width: 350, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#979797"
          />
        </View>

        <View className="flex-row items-center py-2 gap-x-[40px]">
          <Ionicons name="shuffle" size={22} color="#fff" />
          <Ionicons name="play-back" size={22} color="#fff" />
          <Ionicons name="play-circle" size={48} color="#fff" />
          <Ionicons name="play-forward" size={22} color="#fff" />
          <Ionicons name="swap-vertical" size={22} color="#fff" />
        </View>

        <View className="flex-row px-4 items-center justify-between w-full">
          <Ionicons name="share" size={22} color="#fff" />

          <View className="flex-row items-center space-x-3">
            <Ionicons name="heart-outline" size={22} color="#fff" />
            <Ionicons name="contrast" size={22} color="#fff" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default LargeMusicPlayer;
