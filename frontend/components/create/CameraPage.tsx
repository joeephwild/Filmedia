import { FontAwesome5 } from "@expo/vector-icons";
import { Camera, CameraType, FlashMode } from "expo-camera";
import React, { useEffect, useRef } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
// import { uploadFileToPinata } from "../../nftStorage";

type Props = {
  setActiveUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  activeUrl: string | undefined;
};

const CameraPage = ({ setActiveUrl, activeUrl }: Props) => {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashMode, setFlashMode] = useState<number | FlashMode>(FlashMode.on);
  const [zoom, setZoom] = useState(0);
  const cameraRef = useRef<Camera>(null);

  const [isRecording, setIsRecording] = useState(false);

  const recordVideo = () => {
    setIsRecording((prevIsRecording) => !prevIsRecording);
  };

  const videoRef = React.useRef<Video>(null);

  // ...

  useEffect(() => {
    if (videoRef.current && activeUrl) {
      videoRef.current.loadAsync({ uri: activeUrl });
    }
  }, [activeUrl]);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].duration) {
      if (result.assets[0].duration > 15000) {
        alert("Please select a video that is not more than 15 seconds long.");
      } else {
        // The video is not more than 15 seconds long, you can use it here.
        console.log(result.assets[0].uri);
        setActiveUrl(result.assets[0].uri);

        // Convert the uri to a File object and upload it
        const file = new File([result.assets[0].uri], "video.mp4", {
          type: "video/mp4",
        });
        // await uploadFileToPinata(file);
      }
    }
  };

  useEffect(() => {
    let video;
    let timeoutId: NodeJS.Timeout = setTimeout(() => {}, 0);
    if (isRecording && cameraRef.current) {
      (async () => {
        video = await cameraRef.current?.recordAsync();
        setActiveUrl(video?.uri);
      })();
      timeoutId = setTimeout(() => {
        setIsRecording(false);
      }, 15000); // stop recording after 15 seconds
    } else if (!isRecording && cameraRef.current) {
      cameraRef.current.stopRecording();
      clearTimeout(timeoutId); // clear the timeout when recording is manually stopped
    }
    return () => clearTimeout(timeoutId); // clear the timeout when the component unmounts
  }, [isRecording]);

  const toggleFlash = () => {
    setFlashMode(flashMode === FlashMode.off ? FlashMode.on : FlashMode.off);
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (!isRecording && activeUrl) {
    return (
      <>
        <Video
          ref={videoRef}
          source={{
            uri: activeUrl,
          }}
          resizeMode={ResizeMode.COVER}
          isMuted={false}
          rate={1.0}
          useNativeControls
          isLooping
          shouldPlay
          style={{
            minHeight: "100%",
            width: 400,
          }}
        />
      </>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  return (
    <Camera ref={cameraRef} className="flex-1 min-h-screen" type={type}>
      <SafeAreaView className="flex-row px-4 items-center justify-between w-full">
        <FontAwesome5
          // onPress={recordVideo}
          name="times"
          size={24}
          color={"#fff"}
        />

        <TouchableOpacity className="bg-blue-600 px-9 py-2.5 rounded-lg">
          <Text className="text-[14px] text-[#fff] font-bold">Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <View className="flex-1 justify-end mb-9">
        <TouchableOpacity className="flex-row justify-start items-center space-x-[150px]">
          <Pressable className="">
            <FontAwesome5
              onPress={pickVideo}
              name="image"
              size={24}
              color={"#fff"}
            />
          </Pressable>

          <FontAwesome5
            onPress={recordVideo}
            name="dot-circle"
            size={54}
            color={isRecording ? "red" : "#fff"}
          />
        </TouchableOpacity>
      </View>
    </Camera>
  );
};

export default CameraPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    alignSelf: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
