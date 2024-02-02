import { View, Text, Image, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { city } from "../../utils";

const TicktData = [
  {
    name: "Generative AI",
    description: "Access to the Burna Boy concert on September 23, 2023.",
    price: 100.0,
    image:
      "https://images.pexels.com/photos/19776564/pexels-photo-19776564/free-photo-of-facade-of-an-illuminated-temple-in-taiwan.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    owner_name: "John Doe",
    wallet_address: "0xAbCdEf1234567890AbCdEf1234567890AbCdEf1234567890",
  },
  {
    name: "Areon Hackathon",
    description: "Access to the Burna Boy concert on September 23, 2023.",
    price: 100.0,
    image:
      "https://images.pexels.com/photos/15760122/pexels-photo-15760122/free-photo-of-a-man-on-a-bicycle-rides-past-a-building.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    owner_name: "John Doe",
    wallet_address: "0xAbCdEf1234567890AbCdEf1234567890AbCdEf1234567890",
  },
  {
    name: "How to build a sucessfull startup",
    description: "Access to the Burna Boy concert on September 23, 2023.",
    price: 100.0,
    image:
      "https://images.pexels.com/photos/20008219/pexels-photo-20008219/free-photo-of-river-in-rage.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    owner_name: "John Doe",
    wallet_address: "0xAbCdEf1234567890AbCdEf1234567890AbCdEf1234567890",
  },
];

const ticket = () => {
  function truncateString(str: string, num: number) {
    if (str.length > num) {
      return str.substring(0, num) + "...";
    } else {
      return str;
    }
  }
  return (
    <SafeAreaView className="flex-1 min-h-screen px-[16px]">
      <View className="flex-row items-center space-x-4">
        <Image
          source={{
            uri: "https://gateway.pinata.cloud/ipfs/QmevqC9pXa1K31SR5TgD3iK4iq7a1sLHgdhq6HDKjuYWmY",
          }}
          className="w-[50px] h-[50px] rounded-full"
        />
        <Text className="text-[24px] font-bold text-[#fff]">Discover</Text>
      </View>

      <View className="mt-5">
        <Text className="flex-row items-center text-[20px] font-bold text-[#fff]">
          Cities <FontAwesome name="chevron-right" size={14} color="#fff" />
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-9">
            {city.map((item, index) => (
              <View key={index}>
                <Image
                  source={{
                    uri: item?.image,
                  }}
                  className="w-[190px] bg-black h-[190px] rounded-[30px]"
                />
                <Text className="text-[18px] font-semibold text-[#fff]">
                  {item.city}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View className="mt-5">
        <Text className="text-[24px] font-bold text-[#fff]">
          Featured Events
        </Text>
        <Text className="text-[18px] font-bold text-gray-700">
          That you might love
        </Text>
      </View>

      <FlatList
        data={TicktData}
        renderItem={({ item }) => (
          <View className="flex-row m-2 space-x-2 items-cente">
            <Image
              source={{
                uri: item.image,
              }}
              className="h-[100px] w-[100px] object-cover rounded-lg"
            />
            <View className="items-start space-y-1">
              <Text className="text-[18px] font-opensans-bold text-[#fff] font-bold">
              {truncateString(item.name, 20)}
              </Text>
              <Text className="text-gray-400 w-[60%] font-opensans-light text-[16px] font-light">
                {truncateString(item.description, 60)}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ticket;
