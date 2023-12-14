import {View, Text, Image} from "react-native"
import React from "react"
import { truncate } from "../../utils"

type Props = {
  name: string
  image: string
  title: string
  artist: string
}

const VideoCard = ({image, title}: Props) => {
  return (
    <View className="relative">
      <Image
        source={{
          uri: image,
        }}
        className="w-[100%] h-[200px] bg-black rounded-[12px]"
      />
      <View className="absolute left-5 z-20 bottom-4 right-2">
        <Image
          source={{
            uri: "https://res.cloudinary.com/rashot/image/upload/v1701351537/image_31_dst2pw.png",
          }}
          className="h-[40] w-[40] mb-2"
        />
        <View className="flex flex-row gap-2 flex-wrap">
          <Text className="text-white font-semibold">{truncate(title)}</Text>
        </View>
      </View>
      <View className="absolute inset-0 bg-black opacity-50 w-[100%] h-[200px] rounded-[12px]"></View>
    </View>
  )
}

export default VideoCard
