import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";

const VideoDetail = () => {
  const [isSubscribed, setSubscribed] = useState(false);
  const [comment, setComment] = useState("");

  const handleSubscribe = () => {
    setSubscribed(!isSubscribed);
  };

  const handleComment = () => {
    // Implement your logic to handle comments
    console.log(`Comment: ${comment}`);
    setComment("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Video
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping={false}
          style={styles.video}
        />

        <View style={styles.videoDetails}>
          <Text style={styles.title}>Video Title</Text>
          <View className="flex-row items-center justify-between py-6 w-full">
            <Text style={styles.creatorName}>Creator Name</Text>

            <TouchableOpacity
              onPress={handleSubscribe}
              className="bg-blue-700 px-[20px] py-[8px] rounded-lg"
            >
              <Text style={styles.subscribeButtonText}>
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={comment}
            onChangeText={(text) => setComment(text)}
          />

          <TouchableOpacity
            onPress={handleComment}
            style={styles.commentButton}
          >
            <Text style={styles.commentButtonText}>Comment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    // flex: 1,
    height: 300,
  },
  videoDetails: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff"
  },
  creatorName: {
    fontSize: 16,
    marginBottom: 8,
    color: "#fff"
  },
  subscribeButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  subscribeButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 8,
    marginBottom: 8,
  },
  commentButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  commentButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default VideoDetail;
