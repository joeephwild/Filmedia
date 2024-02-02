import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { InputField } from "../FormField";
import { useAuth } from "../../context/AuthContext";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";

type Props = {
  setCurrentScreen: React.Dispatch<React.SetStateAction<number>>;
};

const SignUp = ({ setCurrentScreen }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lens, setLoginWithLens] = useState(false);

  const { createAnEOA } = useAuth();

  const handleSubmit = async () => {
    if (!name || !password || password !== confirmPassword)
      return Alert.alert("Fill up needed data");
    createAnEOA(name, password, lens, "");
  };
  return (
    <ScrollView
      contentContainerStyle={{
        // height: "100%",
        marginBottom: 19,
      }}
      style={{
        marginBottom: 200,
        height: "100%",
      }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="items-center mt-[87px] space-y-[24px]">
          <View className="items-center space-y-[16px]">
            <Text className="text-[24px] font-bold text-[#fff]">
              Set up your account
            </Text>
            <Text className="text-[14px] font-semibold text-[#fff] text-center">
              Create your account and dive into a world of Blockchain.
            </Text>
          </View>
          {/** form section */}
          <View className="">
            <InputField
              label="Name"
              value={name}
              placeholder="Enter your Handle"
              onChange={setName}
              name=""
            />
            <InputField
              label="Password"
              value={password}
              placeholder="*********"
              onChange={setPassword}
              name=""
            />
            <InputField
              label="Confirm Password"
              value={confirmPassword}
              placeholder="*********"
              onChange={setConfirmPassword}
              name=""
            />
          </View>

          <View className="space-y-[8px]">
            <TouchableOpacity
              onPress={handleSubmit}
              className="py-[16px] px-[40px] items-center bg-[#ADF802] rounded-[40px]"
            >
              <Text className="text-[14px] font-bold text-[#fff]">
                Create Account
              </Text>
            </TouchableOpacity>
            <Text className="text-[14px] text-[#fff] font-bold text-center">
              Already signed up?{" "}
              <Text
                onPress={() => setCurrentScreen(1)}
                className="text-[#ADF802]"
              >
                Log In
              </Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default SignUp;
