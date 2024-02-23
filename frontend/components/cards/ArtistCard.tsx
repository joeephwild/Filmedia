import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { lensClient } from "../../app/_layout";

type Props = {
  item: any;
};

const ArtistCard = ({ item }: Props) => {
  const [isFollowedByMe, setIsFollowedByMe] = useState(false);

  useEffect(() => {
    const checkFollowStatus = async () => {
      const result = await lensClient.profile.fetch({
        forProfileId: "0x018509",
      });
      // console.log(result)
      // setIsFollowedByMe(isFollowedByMe);
    };

    checkFollowStatus();
  }, [item]);

  const Follow = async () => {
    const { unwrap, isFailure, isSuccess} = await lensClient.profile.follow({
      follow: [
        {
          profileId: item?.profileTokenIdHex,
        },
      ],
    });
  };
  console.log(item?.profileTokenIdHex)
  return (
    <Link
      href={{
        pathname: `/artist/${item.userAddress}`,
        params: {
          address: item?.userAddress,
          image: item?.profileImageContentValue?.image?.original,
          name: item?.profileDisplayName,
          follower: item?.followerCount,
          following: item?.followingCount,
          id: item?.profileTokenIdHex
        },
      }}
    >
      <View className="flex-row w-[70%] pt-5 items-center space-x-8">
        <Image
          source={{
            uri: item?.profileImageContentValue?.image?.original
              ? item?.profileImageContentValue?.image?.original
              : "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.1803636316.1708214400&semt=ais",
          }}
          className="w-[60px] rounded-full h-[60px] bg-black"
        />
        <View className="w-[40%]">
          <Text className="text-[17px] text-[#fff] font-bold">
            {item?.profileDisplayName
              ? item?.profileDisplayName
              : item?.profileName}
          </Text>
          <Text className="text-gray-500">{item?.profileBio}</Text>
        </View>
        <TouchableOpacity onPress={Follow} className="bg-[#ADF802] px-8 py-2.5 rounded-lg">
          <Text>{isFollowedByMe ? "Following" : "Follow"}</Text>
        </TouchableOpacity>
      </View>
    </Link>
  );
};

export default ArtistCard;
