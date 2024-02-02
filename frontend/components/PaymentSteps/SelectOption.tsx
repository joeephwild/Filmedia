import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import {
  Network,
  hasHttpsCaseInsensitive,
  networks,
  options,
} from "../../utils";

type Props = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  handleNext: () => void;
};

const SelectOption = ({ modalVisible, setModalVisible, handleNext }: Props) => {
  const [active, setActive] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [modalVisibles, setModalVisibles] = useState(false);

  return (
    <View>
      <View className="flex-row items-center justify-center">
        <Text className="w-[200px] text-[12px] text-[#ADF802] text-center font-bold">
          Continue with your preferred payment method
        </Text>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Ionicons name="close" size={24} />
        </TouchableOpacity>
      </View>

      {/** payment options */}
      <View className="items-center space-y-4 mt-[24px]">
        {options.map((item, index) => (
          <Pressable
            onPress={() => setActive(item.title)}
            className={`border-2 px-[16px] py-[8px] rounded-[8px] border-[#A8A8A8] w-[279px] h-[40px] ${
              active === item.title && "h-[235px] "
            }`}
          >
            <View className="flex-row items-center w-full justify-between">
              <View className="flex-row space-x-1 items-center">
                {hasHttpsCaseInsensitive(item.icon) && (
                  <Image
                    source={{
                      uri: item.icon,
                    }}
                    className="w-[24px] h-[24px] object-contain"
                  />
                )}
                {!hasHttpsCaseInsensitive(item.icon) && (
                  <FontAwesome name={item.icon} size={20} />
                )}

                <Text>{item.title}</Text>
              </View>
              <View className="flex-row items-center">
                {item.networks.map((item, index) => (
                  <Image
                    source={{
                      uri: item,
                    }}
                    className="w-[26px] object-contain h-[26px]"
                  />
                ))}
              </View>
            </View>

            {active === item.title && item.title === "Wallet" && (
              <View className="space-y-9">
                <View className="">
                  <Text>Network</Text>
                  <TouchableOpacity
                    onPress={() => setModalVisibles(true)}
                    className="flex-row items-center justify-between w-full mt-6"
                  >
                    <View className="flex-row items-center">
                      <Image
                        source={{ uri: selectedNetwork?.image }}
                        style={{ width: 20, height: 20, marginRight: 10 }}
                      />
                      <Text>
                        {selectedNetwork
                          ? selectedNetwork?.name
                          : "Select a network"}
                      </Text>
                    </View>
                    <Ionicons name="chevron-down" size={20} />
                  </TouchableOpacity>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibles}
                    onRequestClose={() => {
                      setModalVisibles(!modalVisibles);
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          padding: 20,
                          borderRadius: 10,
                          width: "60%", // adjust width
                          height: "30%", // adjust height
                          top: "10%", // adjust top position
                          left: "10%", // adjust left position
                          shadowColor: "#000",
                        }}
                      >
                        {/* <FlatList
                          data={networks}
                          keyExtractor={(item) => item.name}
                          style={{
                            height: "10%", // adjust height to fill the modal
                          }}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 10,
                              }}
                              onPress={() => {
                                setSelectedNetwork(item);
                                setModalVisibles(false);
                              }}
                            >
                              <Image
                                source={{ uri: item.image }}
                                style={{
                                  width: 20,
                                  height: 20,
                                  marginRight: 10,
                                }}
                              />
                              <Text>{item.name}</Text>
                            </TouchableOpacity>
                          )}
                        /> */}
                      </View>
                    </View>
                  </Modal>
                  <TouchableOpacity
                    onPress={handleNext}
                    className="bg-[#ADF802] flex-row itms-center justify-center py-[8px] px-[24px] mt-9 rounded-[40px]"
                  >
                    <Text className="text-[12px] font-bold text-[#000]">
                      Pay $5 to Subscribe
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default SelectOption;
