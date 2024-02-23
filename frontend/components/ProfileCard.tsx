import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ProfileFragment,
  ProfilePictureSetFragment,
} from "@lens-protocol/client";
import { Image } from "react-native";
import { lensClient } from "../app/_layout";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { router } from "expo-router";

type Props = {
  profile: ProfileFragment;
  close: void | undefined
};
const ProfileCard = ({ profile, close }: Props) => {
  const { open, provider, isConnected, address } = useWalletConnectModal();

  const coverImageUri = profile.metadata?.coverPicture?.optimized?.uri;
  const avatarImageUri = (
    profile.metadata?.picture as ProfilePictureSetFragment
  )?.thumbnail?.uri;

  const signInToLens = async () => {
    try {
      const isAuthenticated = await lensClient.authentication.isAuthenticated();
      console.log(isAuthenticated);
      if (profile && !isAuthenticated) {
        const { id, text } = await lensClient.authentication.generateChallenge({
          signedBy: profile.ownedBy.address,
          for: profile.id,
        });
        console.log(id, text);
        const signature =
          (await provider?.request({
            method: "personal_sign",
            params: [text, address],
          })) || null;
        const res = await lensClient.authentication.authenticate({
          id,
          //@ts-ignore
          signature,
        });
        console.log(res);
      } else if (isAuthenticated) {
        router.push("/(tabs)");
        close
      }
      const profileId = await lensClient.authentication.getProfileId();
      console.log(profileId);
    } catch (error) {
      console.error("Error signing in to Lens:", error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };
  return (
    <View className="flex-row border-2 rounded-xl border-[#ADF802] py-3 px-3 h-[60px] items-center justify-between w-full">
      <View className="flex-row space-x-3">
        <Image
          source={{
            uri: avatarImageUri
              ? avatarImageUri
              : "https://www.shutterstock.com/image-illustration/close-portrait-smiling-man-blue-260nw-1694399425.jpg",
          }}
          className="w-[50px] h-[50px] rounded-full"
        />
        <View>
          <Text className="text-[#fff] text-[16px] font-opensans-bold">
            {profile.handle?.localName}
          </Text>
          <Text className="text-gray-500 text-[12px] font-opensans-bold">
            {profile.handle?.fullHandle}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={signInToLens}
        style={{
          backgroundColor: "#ADF802",
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text
          style={{
            color: "#000",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          sign in
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;
