import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RangeComponents from "../RangeComponents";
import ArtistCard from "../cards/ArtistCard";
import { useQuery } from "@airstack/airstack-react";

import { LensClient, production } from "@lens-protocol/client";

const lensClient = new LensClient({
  environment: production,
});

const AllArtist = () => {
  const query = `
  query MyQuery {
    Socials(input: {filter: {dappName: {_eq: lens}}, blockchain: ethereum}) {
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
        profileTokenIdHex
        handleTokenAddress
        handleTokenId
        metadataURI
        profileMetadata
        coverImageURI
        twitterUserName
        website
        location
        profileHandle
        isDefault
        identity
        followerTokenAddress
        followingCount
        followerCount
        profileBio
        profileDisplayName
        profileImage
        profileUrl
        updatedAt
      }
    }
  }
  `;

  const { data, error, loading } = useQuery(query);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data)
    return <Text className="text-white text-lg">No data available</Text>;
  return (
    <View>
      <View className="flex-row items-center justify-between w-full">
        <Text className="text-[20px] font-bold text-[#fff]">
          Recommended Profiles
        </Text>
        <View className="flex-row items-center space-x-1">
          <Text className="text-[12px] font-bold text-[#fff]">More</Text>
          <FontAwesome name="chevron-right" color="#fff" />
        </View>
      </View>
      <View className="mt-4">
        {data?.Socials?.Social?.slice(5, 15).map(
          (follower: any, index: number) => (
            <ArtistCard key={index} item={follower} />
          )
        )}
      </View>
    </View>
  );
};

export default AllArtist;
