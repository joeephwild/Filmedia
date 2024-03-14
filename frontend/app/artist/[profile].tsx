import { View, Text, ImageBackground } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import SubscriptionHeatmap from "../../components/profile/SubscriptionHeatmap";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import { lensClient } from "../_layout";
import { Portal } from "@gorhom/portal";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
interface ArtistProfile {
  name: string;
  owner: string;
  description: string;
  image: string;
  external_url: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

const options = [
  {
    period: "Month",
    pirce: 1,
  },
  {
    period: "3 Month",
    pirce: 1,
  },
  {
    period: "6 Month",
    pirce: 1,
  },
];

const benefit = [
  {
    icon: "certificate",
    title: "Dynamic NFTs",
    description: "Access to exclusive dynamic NFTs that change over time.",
  },
  {
    icon: "shield-alt",
    title: "No Ads Viewing",
    description: "Enjoy an ad-free experience while viewing content.",
  },
  {
    icon: "comments",
    title: "Subscribers Chat",
    description:
      "Join a private chat with other subscribers for exclusive discussions.",
  },
];

const ArtistProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [artistprofile, setArtistProfile] = useState<ArtistProfile>();
  const params = useLocalSearchParams();
  const { address, name, image, follower, following, id } = params;
  const sheetRef = useRef<BottomSheetMethods>(null);

  useEffect(() => {
    const feed = async () => {
      try {
        const publication = await lensClient.publication.fetch({
          forId: "0x533e",
        });
        // Handle the publication here
        console.log(publication);
      } catch (error) {
        // Handle the error here
        console.error(error);
      }
    };
    feed();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, minHeight: "100%", marginBottom: 789 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 60, // Adjust padding as needed
      }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={{
          uri: image
            ? (image as string)
            : "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.1803636316.1708214400&semt=ais",
        }}
        className="h-[296px] object-cover"
        imageStyle={{ resizeMode: "cover" }}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.01)", "#000"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 180,
          }}
        />
      </ImageBackground>
      <View style={{ position: "absolute", top: 135, right: 0, left: 0 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
            {name}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#A8A8A8" }}>
            {`${address.slice(0, 4)}...${address.slice(-4)}`}
          </Text>
          <View className="flex-row pt-3 items-center space-x-3">
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#A8A8A8" }}
            >
              Follower {follower}
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#A8A8A8" }}
            >
              Following {following}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => sheetRef.current?.open()}
            style={{
              marginTop: 29,
              paddingHorizontal: 24,
              backgroundColor: "#ADF802",
              paddingVertical: 8,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 40,
            }}
            className="mx-auto mr-4"
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#000" }}>
              Subscribe
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => follow()}
            style={{
              marginTop: 29,
              paddingHorizontal: 24,
              backgroundColor: "#ADF802",
              paddingVertical: 8,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 40,
            }}
            className="mx-auto"
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#000" }}>
              Follow
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingTop: 20 }}>
        <SubscriptionHeatmap />
        {/* <LatestRelease />
        <TopSongs />
        <Albums /> */}
        {/* <Feed profileId="" /> */}
      </View>
      <Portal>
        <BottomSheet height={500} ref={sheetRef}>
          <View className="px-3">
            <View className="flex-row items-center justify-evenly">
              <FontAwesome5 name="arrow-left" color="#000" size={24} />
              <Text className="text-[18px] font-bold">Subscribe to {name}</Text>
            </View>
            <View className="mt-9">
              <Text className="text-[16px] font-bold font-opensans-bold">
                Tier 1 Subscription
              </Text>
              <Text className="text-[12px] font-opensans-regular font-medium pt-2">
                Susbscribe to {name} and get more benefit and join the {name}{" "}
                community and also get to support the creator.
              </Text>
              <View className="flex-row gap-5 py-4">
                {options.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    className="w-[100px] h-[100px] border-[#ADF802] border"
                  >
                    <Text className="font-opensans-bold">{item.period}</Text>
                    <Text className="pt-[60px] font-opensans-regular">
                      ${item.pirce}/month
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="w-full">
                <TouchableOpacity onPress={() => router.push("/successMessage")} className="bg-[#ADF802] w-full items-center justify-center py-[9px]">
                  <Text className="font-opensans-bold">Subscribe</Text>
                </TouchableOpacity>
                <Text className="text-center font-opensans-regular ">
                  By subscribing you accept the Filmedia terms of sale and
                  acknowledge our privacy policy
                </Text>
              </View>

              <View>
                <Text className="font-opensans-bold pt-5">
                  Subscriber benefit
                </Text>
                <View className="flex-row items-center gap-5 py-3">
                  {benefit.map((item, i) => (
                    <View key={i}>
                      <FontAwesome5
                        name={item.icon}
                        size={24}
                        color="#000"
                        style={{ marginRight: 10 }}
                      />
                      <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                        {item.title}
                      </Text>
                      {/* <Text style={{ fontSize: 14, color: "#666" }}>
                        {item.description}
                      </Text> */}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </BottomSheet>
      </Portal>
    </ScrollView>
  );
};

export default ArtistProfile;
