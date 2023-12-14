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

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);
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

  return (
    <>
      {!keyboardVisible && (
        <View style={[styles.container, isFullScreen && styles.fullScreen]}>
          {!isFullScreen && (
            <View className="space-y-1 px-2">
              <View className="flex-row pt-1 items-center space-x-[117px]">
                <View className="flex-row space-x-6 items-center">
                  <Pressable onPress={() => setIsFullScreen(!isFullScreen)}>
                    <Image
                      source={{
                        uri: "https://images.pexels.com/photos/19230195/pexels-photo-19230195/free-photo-of-a-little-boy-standing-outside-and-showing-thumbs-up.jpeg?auto=compress&cs=tinysrgb&w=1600",
                      }}
                      className="w-[65px] h-[65px] bg-black rounded-full "
                    />
                  </Pressable>

                  <View>
                    <Text>Burna boy</Text>
                    <Text>Alone</Text>
                  </View>
                </View>

                <View className="flex-row space-x-[16px]">
                  <Ionicons name="heart-outline" size={24} color="white" />
                  <Ionicons name="contrast" size={24} color="white" />
                  <Ionicons name="play-circle-sharp" size={24} color="white" />
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
