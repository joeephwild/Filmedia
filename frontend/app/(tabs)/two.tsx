import React from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserAvatar from "react-native-user-avatar";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <GenreCo {...item} />}
        contentContainerStyle={{
          paddingHorizontal: 10,
          rowGap: 9,
          columnGap: 9,
          minHeight: 100,
        }}
        ListHeaderComponent={() => (
          <View>
            <View className="flex-row items-center justify-between px-1">
              <Text className="text-[24px] font-opensans-bold text-[#fff]">
                Search
              </Text>
              <UserAvatar size={40} name="Avishay Bar" />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const GenreCo = ({
  artists,
  color,
  genre_name,
}: {
  genre_name: string;
  color: string;
  artists: {
    artist_name: string;
    image_url: string;
  }[];
}) => {
  return (
    <ImageBackground
      source={{
        uri: "https://consequence.net/wp-content/uploads/2023/09/burna-boy-2023-tour.jpg",
      }}
      resizeMode="cover"
      className="bg-green-600 w-[49%] mx-1 h-[150px]"
    >
      <Text className="self-end items-end justify-end text-[20px]">Gospel</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  genreContainer: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
  },
  genreTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  artistContainer: {
    alignItems: "center",
    marginRight: 10,
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  artistName: {
    fontSize: 16,
    marginTop: 5,
  },
});
