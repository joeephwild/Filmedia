import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  nfts?: true;
};

const RangeComponents = ({ nfts }: Props) => {
  const [active, setIsActive] = useState("trending");

  const steps = [
    {
      value: "Trending",
      active: "trending",
    },
    {
      value: "Upcoming",
      active: "upcoming",
    },
    {
      value: "Featured",
      active: "featured",
    },
    {
      value: "New Releases",
      active: "new-releases",
    },
    {
      value: "All Time Favorites",
      active: "favorites",
    },
    {
      value: "Top Charts",
      active: "top-charts",
    },
    {
      value: "Recommended",
      active: "recommended",
    },
    {
      value: "Genres",
      active: "genres",
    },
    {
      value: "Concerts",
      active: "concerts",
    },
    {
      value: "My Playlist",
      active: "my-playlist",
    },
  ];

  const levels = [
    {
      value: "Level One",
      active: "1",
    },
    {
      value: "Level Two",
      active: "2",
    },
    {
      value: "Level Three",
      active: "3",
    },
  ];

  const arr = nfts ? levels : steps;
  return (
    <View className="">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable className="flex-row gap-x-8 mt-2">
          {arr.map((item, index) => (
            <Text
              onPress={() => setIsActive(item.active)}
              key={index}
              style={{
                backgroundColor:
                  active === item.active
                    ? "#ADF802"
                    : "#F8FEEA",
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
                color: "#000",
                overflow: "hidden",
              }}
            >
              {item.value}
            </Text>
          ))}
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default RangeComponents;
