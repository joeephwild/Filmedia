import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  GestureDetector,
  PanGestureHandler,
  Gesture,
  Directions,
} from "react-native-gesture-handler";
import { router } from "expo-router";

const onBoradingSteps = [
  {
    title: "Welcome to Filmedia, where Social Content and blockchain unite!",
    image:
      "https://images.pexels.com/photos/9853880/pexels-photo-9853880.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "A vibrant space where music, videos, and NFTs collide!. Social features, exclusive events, and a groundbreaking wallet for your security.",
  },
  {
    title: "Dive into the world of SocialFI in our All-in-One Hub",
    image:
      "https://images.pexels.com/photos/19391546/pexels-photo-19391546/free-photo-of-woman-with-spiky-hair-screaming.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Discover new music and share your favorites.Watch exclusive videos and connect with creators.Subscribe for premium content and support artists Individually.",
  },
  {
    title: "Secure Wallet for Your Journey",
    image:
      "https://images.pexels.com/photos/5926251/pexels-photo-5926251.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Your inbuilt wallet ensures secure transactions. Purchase subscriptions, tip artists, and collect NFTs confidently.Your digital assets, your control.",
  },
];

const Index = () => {
  // useEffect(() => {
  //   const getNFTs = async (ipfsHashes) => {
  //     const fetchPromises = ipfsHashes.map(async (hash) => {
  //       try {
  //         const response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`);
  //         const json = await response.json(); // Extract JSON from the response

  //         if (typeof json === 'string') {
  //           // If the JSON is a string, parse it again
  //           return JSON.parse(json);
  //         } else {
  //           // Otherwise, return the JSON as is
  //           return json;
  //         }
  //       } catch (error) {
  //         console.error('Error:', error);
  //       }
  //     });

  //     const data = await Promise.all(fetchPromises);
  //     console.log(data); // Log the data for debugging
  //     // You can now use the data here
  //   };

  //   const ipfsHashes = ['QmNT9dVCgGfxEViKZzYLhH114rgiYDT227cVDYVz1y3zvH', 'QmYGgPqaC483J5B9KczHRV9t1fDRkFtiLo5J2zMvqcZWuv'];
  //   getNFTs(ipfsHashes); // Call the function
  // }, []);
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = onBoradingSteps[currentIndex];

  const handleNext = () => {
    if (currentIndex === onBoradingSteps.length - 1) {
      handleSkip();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) {
      handleSkip();
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    setCurrentIndex(2);
  };

  const swipeForward = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd((event) => {
      handleNext();
    });

  const swipeBackward = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd((event) => {
      handleBack();
    });

  const swipes = Gesture.Race(swipeForward, swipeBackward);

  return (
    <GestureDetector gesture={swipes}>
      <View className="items-center  justify-center flex-1">
        <StatusBar style="auto" />
        <ImageBackground
          source={{
            uri: data.image,
          }}
          className="min-h-[600px] w-full items-end relative"
        >
          <TouchableOpacity
            onPress={handleSkip}
            className="rounded-[40px] py-[12px] px-[20px] mt-[80px] items-center justify-center"
          >
            <Text className="text-[16px]  font-opensans-bold text-[#fff]">
              Skip
            </Text>
          </TouchableOpacity>
          <View className="flex-row items-center mb-9 space-x-2 absolute bottom-0 left-1/2 transform -translate-x-1/2">
            {onBoradingSteps.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded w-[20px] ${
                  currentIndex === index
                    ? "bg-blue-400"
                    : "bg-white w-2 rounded-full"
                }`}
              />
            ))}
          </View>
        </ImageBackground>
        <View className="bg-white items-center w-full py-[16px] h-[300px]">
          <Text className="text-[20px] font-opensans-bold px-[20px] text-black text-center font-bold">
            {data.title}
          </Text>
          <Text className="text-[14px] font-opensans-regular p-[20px] text-black text-center">
            {data.description}
          </Text>
          {currentIndex != 2 && (
            <TouchableOpacity
              onPress={handleNext}
              className="bg-[#ADF802] rounded-[40px] py-[16px] mt-[30px] items-center justify-center w-[80%]"
            >
              <Text className="text-[16px]  font-opensans-bold text-[#000]">
                Get Started
              </Text>
            </TouchableOpacity>
          )}
          {currentIndex === 2 && (
            <View className="flex-row items-center px-9 space-x-[120px]">
              <TouchableOpacity
                onPress={() => router.push("/(auth)/login")}
                className=" rounded-[40px] py-[16px] mt-[30px] items-center justify-center"
              >
                <Text className="text-[16px]  font-opensans-bold text-[#000]">
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/(auth)/")}
                className="bg-[#ADF802] rounded-[40px] py-[16px] px-[40px] mt-[30px] items-center justify-center"
              >
                <Text className="text-[16px]  font-opensans-bold text-[#000]">
                  Create Wallet
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </GestureDetector>
  );
};

export default Index;
