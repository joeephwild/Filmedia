import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import AllSongs from "../../components/expolore/AllSongs";
import AllAlbums from "../../components/expolore/AllAlbums";
import AllArtist from "../../components/expolore/AllArtist";
import TrendingMintsSwiper from "../../components/TrendingMintsSwipper";

export default function TabOneScreen() {
  return (
    <SafeAreaView className="min-h-screen flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: 100,
          flex: 1,
          minHeight: "100%",
        }}
      >
        {/** header view */}
        <View className="flex-row items-center justify-between w-full px-2 pb-3">
          <Text className="text-[#fff] text-[30px] font-opensans-bold">
            Explore
          </Text>
          <View>
            <FontAwesome name="user-circle" size={40} color="#fff" />
          </View>
        </View>

        <AllSongs />
        <AllAlbums />
        <AllArtist />
      </ScrollView>
    </SafeAreaView>
  );
}
