import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  Alert,
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { SafeAreaView } from "react-native-safe-area-context";

const FormComponent = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [imageSource, setImageSource] = useState<string | null>(null);

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageSource(result.assets[0].uri);
    }
  };

  const submitForm = async () => {
    try {
      // Upload image to IPFS
      const imageHash = await uploadToIPFS(imageSource);
      console.log(imageHash);

      // Create an object to store in IPFS
      const formData = {
        username: username,
        about: about,
        imageHash: imageHash,
      };

      // Store formData in IPFS
      const formHash = await uploadToIPFS(JSON.stringify(formData));

      console.log("Form data stored in IPFS with hash:", formHash);
    } catch (error) {
      console.error("Error storing form data:", error);
      Alert.alert(
        "Error",
        "Failed to store form data. Please try again later."
      );
    }
  };

  const uploadToIPFS = async (uri) => {
    const file = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const response = await fetch("https://ipfs.infura.io:5001/api/v0/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: "file",
        content: file,
      }),
    });

    const data = await response.json();
    return data.Hash;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Tell us about yourself"
          multiline
          numberOfLines={4}
          onChangeText={(text) => setAbout(text)}
          value={about}
        />
        <TouchableOpacity
          style={styles.selectImageButton}
          onPress={selectImage}
        >
          <Text style={styles.selectImageText}>Select Image</Text>
        </TouchableOpacity>
        {imageSource && (
          <Image source={{ uri: imageSource }} style={styles.image} />
        )}
        <Button title="Submit" onPress={submitForm} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  selectImageButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  selectImageText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 20,
    resizeMode: "cover",
    borderRadius: 5,
  },
});

export default FormComponent;
