import { View, Text, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Search = () => {
  const data = [
    {
      title: "Item 1",
      colors: {
        gradientStart: "#FF5733",
        gradientEnd: "#FFD700",
      },
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/40a9faa312665d0a320c44ed5d2813f044e4c00c60f4ee43bf25459f57dac4d0?",
    },
    {
      title: "Item 2",
      colors: {
        gradientStart: "#3498db",
        gradientEnd: "#2ecc71",
      },
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f92a6f7474b1d118525c5ab6e53fb0323b81b944773d8a505db46958dd2bc2e0?",
    },
    {
      title: "Item 3",
      colors: {
        gradientStart: "#e74c3c",
        gradientEnd: "#f39c12",
      },
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2e6c32d580ad6a96f94ace059b7df045329af1668c5a557b0658c08dc6177491?",
    },
    {
      title: "Item 4",
      colors: {
        gradientStart: "#8e44ad",
        gradientEnd: "#3498db",
      },
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a50fbccc144b89f66668481041b8a56479d6cea39f72d7cd75d27636d14c6322?",
    },
    {
      title: "Item 5",
      colors: {
        gradientStart: "#27ae60",
        gradientEnd: "#e74c3c",
      },
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/5b627cdaf9458b53bf0cc0db93dd1bbbbdd2f5bf70b8f6cee337fbf384555333?",
    },
    {
      title: "Item 6",
      colors: {
        gradientStart: "#f39c12",
        gradientEnd: "#8e44ad",
      },
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bc27e240b85077be69f9fff54c5b331ca8e806879cb725db58c82c4d3f3012e2?",
    },
    {
      title: "Item 7",
      colors: {
        gradientStart: "#2ecc71",
        gradientEnd: "#27ae60",
      },
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/885ef81e8ded6b93189ea025dd3cd2589093969834fb285ed74d25bf4f511c3f?",
    },
    {
      title: "Item 8",
      colors: {
        gradientStart: "#3498db",
        gradientEnd: "#f39c12",
      },
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/fa3cd9eba2e4aeeed97b7909354a25f0203d4b57fabc803b0eea912b5d37f4bc?",
    },
    {
      title: "Item 9",
      colors: {
        gradientStart: "#e74c3c",
        gradientEnd: "#2ecc71",
      },
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f9469865466fcc585376ca87e4d23195ddef69e8edb1fc74d867f872bc613560?",
    },
    {
      title: "Item 10",
      colors: {
        gradientStart: "#8e44ad",
        gradientEnd: "#27ae60",
      },
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8897a44aecfec8bfb3c44d95f7d35adbf630767e8bde56a3d0368b4b3e5b8a8f?",
    },
    // {
    //   title: "Item 11",
    //   colors: {
    //     gradientStart: "#f39c12",
    //     gradientEnd: "#3498db",
    //   },
    //   image: "url_to_image_11.jpg",
    // },
    // {
    //   title: "Item 12",
    //   colors: {
    //     gradientStart: "#2ecc71",
    //     gradientEnd: "#e74c3c",
    //   },
    //   image: "url_to_image_12.jpg",
    // },
  ];

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 19, marginLeft: 2 }}>
      {data.map((item, index) => (
        <LinearGradient
          colors={["#000000", item.colors.gradientStart]}
          start={{ x: 0.1, y: 0.2 }}
          style={{ width: "50%", height: 48, padding: 4 }}
          className="flex-row space-x-4 py-4"
        >
          <Image
            source={{
              uri: item.image,
            }}
            className="w-[24px] rounded-full h-[24px] bg-white"
          />
          <Text>{item.title}</Text>
        </LinearGradient>
      ))}
    </View>
  );
};

export default Search;
