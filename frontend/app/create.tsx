import { FontAwesome5 } from "@expo/vector-icons";
import { Camera, CameraType, FlashMode } from "expo-camera";
import React, { useRef } from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CameraPage from "../components/create/CameraPage";
import ContentUpload from "../components/create/ContentUpload";
import ImageUpload from "../components/create/ImageUpload";

export default function Create() {
  const [active, setActive] = useState("Feed");
  const steps = ["Feed", "Video", "Image", "Live"];

  const handleDisplay = () => {
    switch (active) {
      case "Feed":
        return <CameraPage />;
      case "Video":
        return <ContentUpload />;
        case "Image":
        return <ImageUpload />;
      default:
        break;
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center">
      {handleDisplay()}
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          position: "absolute",
          bottom: 60,
          right: 0,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
          horizontal
        >
          <View className="w-fit p-5 bg-black/80 space-x-9 mb-7 flex-row">
            {steps.map((item, index) => (
              <Pressable onPress={() => setActive(item)}>
                <Text
                  className={`${
                    item === active ? "text-white" : "text-gray-500"
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
