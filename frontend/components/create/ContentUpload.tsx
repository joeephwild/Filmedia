import {
  View,
  Text,
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { SafeAreaView } from "react-native-safe-area-context";
import { ResizeMode, Video } from "expo-av";
import * as FileSystem from "expo-file-system";
// import { uploadToNFTStorage } from "../../nftStorage"
// import { uploadFileToPinata } from "../../nftStorage";

const ContentUpload = () => {
  const [images, setImages] = useState<MediaLibrary.Asset[]>();
  const [selectedVideos, setSelectedVideos] = useState<string | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  useEffect(() => {
    if (!isAudioEnabled) {
      Alert.alert("Audio is disabled", "Would you like to enable audio?", [
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => setIsAudioEnabled(true) },
      ]);
    }
  }, [isAudioEnabled]);

  // ...

  const videoRef = React.useRef<Video>(null);

  // ...

  useEffect(() => {
    if (videoRef.current && selectedVideos) {
      videoRef.current.loadAsync({ uri: selectedVideos });
    }
  }, [selectedVideos]);

  const uploadVideo = async (assetId: string) => {
    const asset = await MediaLibrary.getAssetInfoAsync(assetId);
    if (!asset.localUri) {
      throw new Error("Asset localUri is undefined");
    }

    // Fetch the file from the local file system as a Blob
    const response = await fetch(asset.localUri);
    const blob = await response.blob();

    // Create a new File object
    const file = new File([asset.localUri], "video.mp4", { type: "video/mp4" });
    console.log(asset.localUri);
    setSelectedVideos(asset.localUri);

    // // Upload the video to NFTStorage
    // const videoUrl = await uploadFileToPinata(file);
    // const res = `https://gateway.pinata.cloud/ipfs/${videoUrl}`;
    // console.log(res);

    // return videoUrl;
  };

  const getVideosFromLibrary = async () => {
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if (granted) {
      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: "video",
      });
      setImages(assets);
      const asset = await MediaLibrary.getAssetInfoAsync(assets[0].id);
      if (!asset.localUri) {
        throw new Error("Asset localUri is undefined");
      }
      setSelectedVideos(asset.localUri || null);
    } else {
      Alert.alert(
        "Permission needed",
        "Please grant the permission to access photos"
      );
    }
  };

  useEffect(() => {
    getVideosFromLibrary();
  }, []);
  return (
    <View className="flex-1 min-h-screen">
      <SafeAreaView className=" h-[400px] items-center justify-center">
        {selectedVideos && (
          <Video
            ref={videoRef}
            source={{
              uri: selectedVideos,
            }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isMuted={!isAudioEnabled} // Set this to false to allow sound
            isLooping
            shouldPlay={true}
            style={{
              width: 300,
              height: 360,
            }} // Set a specific width and height
          />
        )}
      </SafeAreaView>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={3} // change this value to adjust the number of columns
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={async () => {
              const videoUrl = await uploadVideo(item.id);
            }}
            style={{ flex: 1, flexDirection: "column", margin: 1 }}
          >
            <Image
              source={{ uri: item.uri }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 100,
              }}
            />
            <Text
              style={{
                position: "absolute",
                color: "white",
                bottom: 0,
                right: 0,
              }}
            >
              {item.duration.toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ContentUpload;
