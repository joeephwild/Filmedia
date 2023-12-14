import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const CarouselCompoent = () => {
  const width = Dimensions.get("window").width;

  const data = [
    {
      concert: {
        name: "Rock Fest 2023",
        image: "https://example.com/rock_fest_image.jpg",
        owner: {
          name: "Music Events LLC",
          image: "https://example.com/music_events_image.jpg",
        },
      },
    },
    {
      concert: {
        name: "Pop Extravaganza",
        image: "https://example.com/pop_extravaganza_image.jpg",
        owner: {
          name: "Entertainment World",
          image: "https://example.com/entertainment_world_image.jpg",
        },
      },
    },
    {
      concert: {
        name: "Jazz Fusion Night",
        image: "https://example.com/jazz_fusion_image.jpg",
        owner: {
          name: "Harmony Productions",
          image: "https://example.com/harmony_productions_image.jpg",
        },
      },
    },
    {
      concert: {
        name: "Country Music Jamboree",
        image: "https://example.com/country_music_image.jpg",
        owner: {
          name: "Southern Sounds Inc.",
          image: "https://example.com/southern_sounds_image.jpg",
        },
      },
    },
    {
      concert: {
        name: "Electronic Beats Showcase",
        image: "https://example.com/electronic_beats_image.jpg",
        owner: {
          name: "Digital Grooves Productions",
          image: "https://example.com/digital_grooves_image.jpg",
        },
      },
    },
  ];

  return (
    <View style={{ flex: 1, marginVertical: 19 }}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={false}
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item, index }) => (
          <View className="bg-black w-[89%] h-[172px]">
            <Image
              source={{
                uri: item.concert.image,
              }}
              className="w-full h-[120px] object-cover"
            />
            <View className="flex-row items-center justify-between w-full px-[20px]">
              <View>
                <Text className="text-white text-[10px] font-bold">
                  {item.concert.name}
                </Text>
                <Text className="text-white text-[14px] font-bold">
                  {item.concert.name}
                </Text>
              </View>
              <FontAwesome name="play-circle" color="#fff" size={24} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CarouselCompoent;
