import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import { image1 } from "../assets/images";
import { router } from "expo-router";

// const { width, height } = Dimensions.get("window");

const Slides = ({}) => {
  // const scroll = new Animated.Value(0);
  return (
    <View className="min-h-screen w-[391px] items-center">
      <ImageBackground
        source={image1}
        className="h-[393px] w-[393px] object-cover"
      />
      <View className="px-[16px] space-y-[16px] mt-[43px]">
        <Text className="text-[24px] font-bold text-[#fff] text-center">
          Welcome to Filmedia, where Social Content and blockchain unite!
        </Text>
        <Text className="text-[14px] font-bold text-[#fff] text-center">
          A vibrant space where music, videos, and NFTs collide!. Social
          features, exclusive events, and a groundbreaking wallet for your
          security.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/(auth)")}
        className="bg-[#ADF802] w-[80%] mt-[160px] mx-4 items-center justify-center px-[40px] py-[16px] rounded-lg"
      >
        <Text className="text-[#fff] font-bold text-[16px]">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Slides;
