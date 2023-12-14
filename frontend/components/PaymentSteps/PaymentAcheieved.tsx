import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const PaymentAcheieved = ({ setModalVisible, setCurrentStep }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setCurrentStep(0);
        setModalVisible(false);
      }}
    >
      <View>
        <Text>PaymentAcheieved</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PaymentAcheieved;
