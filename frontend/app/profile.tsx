import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "@airstack/airstack-react";
import { Profilequery } from "../utils/Query";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";

const profile = () => {
  const { address } = useWalletConnectModal();
  const { data, loading, error } = useQuery(Profilequery, {
    identity: address,
  });
  console.log(`${JSON.stringify(data)} result`);
  return (
    <View>
      <Text>profile</Text>
    </View>
  );
};

export default profile;
