import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Pressable,
  } from "react-native";
  import React, { useState } from "react";
  import IconArrowForward from "../../components/IconComponents/IconArrowForward";
  import IconVerticalDots from "../../components/IconComponents/IconVerticalDots";
  import IconDot from "../../components/IconComponents/IconDot";
  import FontAwesome from "@expo/vector-icons/FontAwesome";
  import VideoCard from "../../components/cards/VideoCard";
  import { Video, ResizeMode } from "expo-av";
  import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
  
  const video = () => {
    const [isInFocus, setIsInFocus] = useState(false);
    const songs = [
      {
        name: "Song 1",
        image:
          "https://res.cloudinary.com/rashot/image/upload/v1701365802/image_38_cl1eig.png",
        title: "I Told Them - Official Music Video",
        artist: "Artist A",
      },
      {
        name: "Song 2",
        image:
          "https://res.cloudinary.com/rashot/image/upload/v1701365802/image_38_cl1eig.png",
        title: "I Told Them - Official Music Video",
        artist: "Artist B",
      },
      {
        name: "Song 3",
        image:
          "https://res.cloudinary.com/rashot/image/upload/v1701365802/image_38_cl1eig.png",
        title: "I Told Them - Official Music Video",
        artist: "Artist C",
      },
      {
        name: "Song 4",
        image:
          "https://res.cloudinary.com/rashot/image/upload/v1701365802/image_38_cl1eig.png",
        title: "I Told Them - Official Music Video",
        artist: "Artist D",
      },
    ];
  
    const video = React.useRef<Video>(null);
    const [status, setStatus] = React.useState({});
  
    return (
      <SafeAreaView className="flex-1 min-h-screen">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            // paddingHorizontal: 15,
            // paddingVertical: 20,
            // marginBottom: 190,
          }}
          style={{
            marginBottom: 100,
            flex: 1,
            minHeight: "100%",
          }}
        >
          <View className="bg-transparent border-2 border-[#fff] w-full h-[48px] space-x-6 px-5 flex-row items-center rounded-[80px]">
            <FontAwesome name="search" size={24} color="white" />
            <TextInput
              placeholder="Search"
              className="w-full"
              placeholderTextColor={"white"}
              onFocus={() => setIsInFocus(!isInFocus)}
            />
          </View>
          <View style={styles.viewMoreContainer}>
            <Text style={styles.video}>Video</Text>
            <TouchableOpacity style={styles.viewMoreContainerFlex}>
              <Text style={styles.viewMore}>More</Text>
              <IconArrowForward />
            </TouchableOpacity>
          </View>
          {[1, 2].map((value, index) => {
            return (
              <View key={index} style={styles.box}>
                <Pressable
                  onPress={() => router.push("/vid/joseph")}
                  style={styles.imageContainer}
                >
                  <Video
                    ref={video}
                    style={styles.previewImage}
                    source={{
                      uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                    }}
                    // useNativeControls
                    videoStyle={{
                      width: 400
                    }}
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                  />
                </Pressable>
                <View style={styles.grandParent}>
                  <View style={styles.titleContainer}>
                    <Image
                      source={{
                        uri: "https://res.cloudinary.com/rashot/image/upload/v1701351537/image_31_dst2pw.png",
                      }}
                      style={styles.profileImage}
                    />
                    <View>
                      <Text style={styles.videoTitle}>
                        I Told Them - Official Music Video
                      </Text>
                      <View style={styles.subTitleContainer}>
                        <Text style={styles.subTitle}>Burna Boy</Text>
                        <View style={styles.subTitleContainerChild}>
                          <IconDot />
                          <Text style={styles.subTitle}>44K views</Text>
                        </View>
                        <View style={styles.subTitleContainerChild}>
                          <IconDot />
                          <Text style={styles.subTitle}>4 months ago</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <IconVerticalDots />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
          <View style={styles.viewMoreContainer}>
            <Text style={styles.video}>Shorts</Text>
            <TouchableOpacity style={styles.viewMoreContainerFlex}>
              <Text style={styles.viewMore}>More</Text>
              <IconArrowForward />
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 7 }}
            className="gap-4 justify-items-start"
          >
            {songs.map((item, index) => (
              <View style={{ flexBasis: 165, flexGrow: 1 }} key={index}>
                <VideoCard {...item} />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default video;
  
  const styles = StyleSheet.create({
    viewMoreContainer: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 40,
    },
    video: {
      fontSize: 20,
      fontWeight: "600",
      color: "white",
    },
    viewMore: {
      color: "white",
      fontWeight: "700",
      fontSize: 12,
    },
    viewMoreContainerFlex: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      columnGap: 5,
    },
    imageContainer: {
      width: "100%",
      height: 200,
      borderRadius: 8,
      overflow: "hidden",
      marginTop: 16,
    },
    previewImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    profileImage: {
      width: 40,
      height: 40,
    },
    videoTitle: {
      fontWeight: "700",
      fontSize: 16,
      color: "white",
    },
    videoTitleTwo: {
      fontWeight: "600",
      fontSize: 12,
      color: "white",
    },
    grandParent: {
      marginTop: 8,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    titleContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      columnGap: 16,
    },
    titleContainerTwo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      columnGap: 16,
      position: "absolute",
      left: 16,
      bottom: 16,
    },
    subTitleContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      columnGap: 5,
      marginTop: 4,
    },
    subTitleContainerChild: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      columnGap: 2,
    },
    subTitle: {
      fontSize: 12,
      color: "#979797",
      fontWeight: "400",
    },
    box: {
      marginTop: 20,
    },
  });
  