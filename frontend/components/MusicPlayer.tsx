import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  Platform,
  Keyboard,
} from "react-native";
import Slider from "@react-native-community/slider";
import LargeMusicPlayer from "./LargeMusicPlayer";
import { useAuth } from "../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  currentlyplayed: {
    image: string;
    title: string;
    url: string;
    artist: string;
  };
};

const MusicPlayer = ({ currentlyplayed }: Props) => {
  // const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  const _keyboardDidShow = () => setKeyboardVisible(true);
  const _keyboardDidHide = () => setKeyboardVisible(false);

  const { playSound, currentlyPlayed, isPlaying, pauseSound } = useAuth();

  async function handlePlaySound() {
    playSound(currentlyPlayed.url, currentlyPlayed);
  }

  return (
    <>
      {!keyboardVisible && (
        <View style={[styles.container, isFullScreen && styles.fullScreen]}>
          {!isFullScreen && (
            <View className="space-y-1 px-2">
              <View className="flex-row pt-1 items-center justify-between">
                <View className="flex-row space-x-6 items-center">
                  <Pressable onPress={() => setIsFullScreen(!isFullScreen)}>
                    <Image
                      source={{
                        uri: currentlyplayed.image
                          ? currentlyplayed.image
                          : "https://www.atlanticrecords.com/sites/g/files/g2000015596/files/styles/artist_image_detail/public/2023-01/080822_BB-ATLWebsite_300x300.png?itok=0HgtcAXi",
                      }}
                      className="w-[45px] h-[45px] rounded-full "
                    />
                  </Pressable>

                  <View>
                    <Text className="tet-[16px] font-bold text-[#fff]">
                      {currentlyplayed.title}
                    </Text>
                    <Text>Burna boy</Text>
                  </View>
                </View>

                <View className="flex-row space-x-[16px]">
                  <Ionicons name="heart-outline" size={24} color="white" />
                  <Ionicons name="contrast" size={24} color="white" />
                  <TouchableOpacity>
                    {!isPlaying ? (
                      <FontAwesome
                        onPress={handlePlaySound}
                        name="play-circle"
                        color="#ADF802"
                        size={24}
                      />
                    ) : (
                      <FontAwesome
                        onPress={pauseSound}
                        name="pause-circle"
                        color="#ADF802"
                        size={24}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <Slider
                style={{
                  width: 350,
                  height: 20,
                }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#979797"
              />
            </View>
          )}

          {isFullScreen && (
            <LargeMusicPlayer
              setIsFullScreen={setIsFullScreen}
              isFullScreen={isFullScreen}
            />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 90 : 70,
    width: "100%",
    height: 100,
    backgroundColor: "#4B0100",
  },
  fullScreen: {
    height: "80%",
    backgroundColor: "#001F3F",
  },
});

export default MusicPlayer;
