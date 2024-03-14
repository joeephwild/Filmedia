import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, View, useColorScheme } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import MusicPlayer from "../../components/MusicPlayer";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome5 size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { playerOpen, currentlyPlayed } = useAuth();
  return (
    <View style={{ flex: 1, flexDirection: "column-reverse" }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#ADF802",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#000",
            // borderTopColor: "transparent",
          },
        }}
        sceneContainerStyle={{
          backgroundColor: "#000",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="compass" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="search" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="music"
          options={{
            title: "Music",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="music" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="videos"
          options={{
            title: "Videos",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="video" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ticket"
          options={{
            title: "Ticket",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ticket-alt" color={color} />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="live"
          options={{
            title: "Live Event",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="broadcast-tower" color={color} />
            ),
          }}
        /> */}
      </Tabs>
      {playerOpen && <MusicPlayer currentlyplayed={currentlyPlayed} />}
    </View>
  );
}
