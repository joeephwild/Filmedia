import { FontAwesome5 } from "@expo/vector-icons";
import { Camera, CameraType, FlashMode } from "expo-camera";
import React, { useRef } from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CameraPage = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashMode, setFlashMode] = useState<number | FlashMode>(FlashMode.on);
  const [zoom, setZoom] = useState(0);
  const cameraRef = useRef<Camera>(null);

  const toggleFlash = () => {
    setFlashMode(flashMode === FlashMode.off ? FlashMode.on : FlashMode.off);
  };

  const zoomIn = () => {
    setZoom(zoom + 0.1 < 1 ? zoom + 0.1 : 1);
  };

  const zoomOut = () => {
    setZoom(zoom - 0.1 > 0 ? zoom - 0.1 : 0);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 1.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
      if (data.uri) {
        Alert.alert("pitcure taken");
      }
    }
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

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  return (
    <Camera ref={cameraRef} className="flex-1 min-h-screen" type={type}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          className="flex-row items-center space-x-[30px] justify-between background-transparent absolute bottom-0"
          // onPress={toggleCameraType}
        >
          <FontAwesome5
            onPress={toggleCameraType}
            name="image"
            size={34}
            color="#fff"
          />
          <View className="flex-row items-center space-x-[20px]">
            <FontAwesome5
              onPress={toggleCameraType}
              name="sync-alt"
              size={24}
              color="#fff"
            />
            <FontAwesome5
              onPress={zoomIn}
              name="search-plus"
              size={24}
              color="#fff"
            />
            <FontAwesome5
              onPress={takePicture}
              name="camera"
              size={44}
              color="#fff"
            />
            <FontAwesome5
              onPress={zoomOut}
              name="search-minus"
              size={24}
              color="#fff"
            />

            <FontAwesome5
              onPress={toggleFlash}
              name="bolt"
              size={24}
              color="#fff"
            />
          </View>
          <FontAwesome5
            onPress={toggleCameraType}
            name="sync-alt"
            size={24}
            color="#fff"
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
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
