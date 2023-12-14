import { View, Text, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import SubscriptionHeatmap from "../../components/profile/SubscriptionHeatmap";
import LatestRelease from "../../components/profile/LatestRelease";
import TopSongs from "../../components/profile/TopSongs";
import Albums from "../../components/profile/Albums";
import PaymentModal from "../../components/PaymentModal";
import { useLocalSearchParams } from "expo-router";
import { artistsArr } from "../../utils";

interface ArtistProfile {
  name: string;
  owner: string;
  description: string;
  image: string;
  external_url: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

const ArtistProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [artistprofile, setArtistProfile] = useState<ArtistProfile>();
  const params = useLocalSearchParams();
  const { address } = params;

  useEffect(() => {}, []);

  useEffect(() => {
    const filteredArtists = artistsArr.filter(
      (artist) => artist.owner === address
    );
    setArtistProfile(filteredArtists[0]);
  });

  return (
    <ScrollView
      style={{ flex: 1, minHeight: "100%", marginBottom: 789 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 60, // Adjust padding as needed
      }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={{
          uri: artistprofile?.image,
        }}
        className="h-[296px] object-cover"
        imageStyle={{ resizeMode: "cover" }}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.01)", "#191414"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 180,
          }}
        />
      </ImageBackground>
      <View style={{ position: "absolute", top: 135, right: 0, left: 0 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
            {artistprofile?.name}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#A8A8A8" }}>
            {`${address.slice(0, 4)}...${address.slice(-4)}`}
          </Text>

          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#A8A8A8" }}>
            Subscribers 3.7M
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              marginTop: 29,
              paddingHorizontal: 24,
              backgroundColor: "#4169E1",
              paddingVertical: 8,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 40,
            }}
            className="mx-auto mr-4"
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#fff" }}>
              Subscribe for $5
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => follow()}
            style={{
              marginTop: 29,
              paddingHorizontal: 24,
              backgroundColor: "#4169E1",
              paddingVertical: 8,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 40,
            }}
            className="mx-auto"
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#fff" }}>
              Follow
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingTop: 20 }}>
        <SubscriptionHeatmap />
        <LatestRelease />
        <TopSongs />
        <Albums />
      </View>
      <PaymentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        depositing={false}
        artirstAddress={address}
      />
    </ScrollView>
  );
};

export default ArtistProfile;
