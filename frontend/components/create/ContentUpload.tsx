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

const ContentUpload = () => {
  const [images, setImages] = useState<MediaLibrary.Asset[]>();
  const [selectedVideos, setSelectedVideos] = useState<string | null>(null);

  // ...

  const uploadVideo = async (assetId: string) => {
    const asset = await MediaLibrary.getAssetInfoAsync(assetId);
    if (!asset.localUri) {
      throw new Error("Asset localUri is undefined");
    }
    const videoFile = await FileSystem.readAsStringAsync(asset.localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const videoData = `data:video/mp4;base64,${videoFile}`;

    // Create a new File object
    const file = new File([videoData], "video.mp4", { type: "video/mp4" });

    // Upload the video to NFTStorage
    // const videoUrl = await uploadToNFTStorage(file);
    // console.log(videoUrl);

    // return videoUrl;
  };

  // const uploadVideo = async (assetId) => {
  //   const asset = await MediaLibrary.getAssetInfoAsync(assetId);
  //   if (!asset.localUri) {
  //     throw new Error("Asset localUri is undefined");
  //   }
  //   const videoFile = await FileSystem.readAsStringAsync(asset.localUri, {
  //     encoding: FileSystem.EncodingType.Base64,
  //   });
  //   const videoData = `data:video/mp4;base64,${videoFile}`;

  //   // Replace with your upload API endpoint
  //   const uploadUrl = "https://your-upload-api-endpoint";

  //   const response = await fetch(uploadUrl, {
  //     method: "POST",
  //     body: JSON.stringify({ file: videoData }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (!response.ok) {
  //     throw new Error("Upload failed");
  //   }

  //   const data = await response.json();

  //   // The URL of the uploaded video
  //   return data.url;
  // };

  const getVideosFromLibrary = async () => {
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if (granted) {
      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: "video",
      });
      setImages(assets);
      // const res = await uploadVideo(assets[0].uri);
      // console.log(res)
      // setSelectedVideos(res || null);
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
            source={{ uri: selectedVideos }}
            resizeMode={ResizeMode.COVER}
            isMuted={false}
            rate={1.0}
            isLooping
            shouldPlay
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
              // const videoUrl = await uploadVideo(item.id);
              // console.log(videoUrl)
              // setSelectedVideos(videoUrl);
            }}
            style={{ flex: 1, flexDirection: "column", margin: 1 }}
          >
            <Image
              source={{ uri: item.uri }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 100,
              }} // adjust the width and height as needed
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ContentUpload;
