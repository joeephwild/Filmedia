import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { InputField } from "../FormField";
import { dynamicNftAddress } from "../../constants/addresses";

type Props = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  depositing: boolean;
  artirstAddress: string | string[];
};

const PaymentProcessing = ({
  setModalVisible,
  setCurrentStep,
  depositing,
  artirstAddress,
}: Props) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {};

  return (
    <View className="relative">
      <View className="bg-[#ADF802] w-[40px] mb-96 h-[40px] rounded-full absolute -top-9  right-[130px] p-[10px] items-center justify-center">
        <ActivityIndicator size="large" />
      </View>

      <View className="mt-[16px] items-center ">
        <Text className="text-[14px] font-bod text-[#ADF802]">
          Payment Processing
        </Text>
        <Text className="text-center text-[10px] text-[#010101] font-bold pt-3">
          To complete the process, please approve the transaction and sign from
          wallet. Thank you for your patience!
        </Text>

        {!depositing && (
          <View className="bg-[#B3C3F3] px-[10px] py-[4px] mt-6 rounded-[40px]">
            <Text>5.00 USDT</Text>
          </View>
        )}
        {depositing == true && (
          <InputField
            label="Confirm Password"
            value={amount}
            placeholder="*********"
            onChange={setAmount}
            name=""
          />
        )}

        <View className="mt-[16px] space-y-[16px]">
          <View className="bg-[#ADF802] px-[24px] py-[8px]  rounded-[40px]">
            <TouchableOpacity onPress={handleApprove}>
              <Text className="text-[12px] font-bold text-[#fff]">
                {loading ? "Approving" : "Approve transaction"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <View className="bg-[#B3C3F3] px-[24px] py-[8px] items-center  rounded-[40px]">
              <Text>Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PaymentProcessing;
