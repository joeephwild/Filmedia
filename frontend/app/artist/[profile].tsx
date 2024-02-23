import { View, Text, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import SubscriptionHeatmap from "../../components/profile/SubscriptionHeatmap";
import PaymentModal from "../../components/PaymentModal";
import { useLocalSearchParams } from "expo-router";

// import { Feed } from "@lens-protocol/react-native-lens-ui-kit";

const query = `
query MyQuery {
  Socials(
    input: {filter: {userAssociatedAddresses: {_eq: "0xa5a2f2207a138b4E7624ac50C0bF981889f19ec8"}, dappName: {_eq: lens}}, blockchain: ethereum}
  ) {
    Social {
       dappName
        profileName
        profileBio
        profileDisplayName
        profileImage
        profileUrl
        followerCount
        followingCount
        userAddress
        userCreatedAtBlockTimestamp
        userCreatedAtBlockNumber
        userLastUpdatedAtBlockTimestamp
        userLastUpdatedAtBlockNumber
        userHomeURL
        userRecoveryAddress
        userAssociatedAddresses
        profileCreatedAtBlockTimestamp
        profileCreatedAtBlockNumber
        profileLastUpdatedAtBlockTimestamp
        profileLastUpdatedAtBlockNumber
        profileTokenUri
        profileImageContentValue {
          image {
            extraSmall
            small
            medium
            large
            original
          }
        }
        coverImageContentValue {
          image {
            extraSmall
            small
            medium
            large
            original
          }
        }
    }
  }
}
`;

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
  const { address, name, image, follower, following } = params;
  console.log(follower, following);

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
          uri: image
            ? (image as string)
            : "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.1803636316.1708214400&semt=ais",
        }}
        className="h-[296px] object-cover"
        imageStyle={{ resizeMode: "cover" }}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.01)", "#000"]}
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
            {name}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#A8A8A8" }}>
            {`${address.slice(0, 4)}...${address.slice(-4)}`}
          </Text>
          <View className="flex-row pt-3 items-center space-x-3">
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#A8A8A8" }}
            >
              Follower {follower}
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#A8A8A8" }}
            >
              Following {following}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              marginTop: 29,
              paddingHorizontal: 24,
              backgroundColor: "#ADF802",
              paddingVertical: 8,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 40,
            }}
            className="mx-auto mr-4"
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#000" }}>
              Subscribe for $5
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => follow()}
            style={{
              marginTop: 29,
              paddingHorizontal: 24,
              backgroundColor: "#ADF802",
              paddingVertical: 8,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 40,
            }}
            className="mx-auto"
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#000" }}>
              Follow
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingTop: 20 }}>
        <SubscriptionHeatmap />
        {/* <LatestRelease />
        <TopSongs />
        <Albums /> */}
        {/* <Feed profileId="" /> */}
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
