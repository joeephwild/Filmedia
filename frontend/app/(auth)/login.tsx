import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const checkPasswordStrength = (password: string) => {
    const strongPassword = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const mediumPassword = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"
    );

    if (strongPassword.test(password)) {
      return "strong";
    } else if (mediumPassword.test(password)) {
      return "medium";
    } else {
      return "weak";
    }
  };

  const setPasswordAndCheckStrength = (text: string) => {
    setPassword(text);
    setPasswordStrength(checkPasswordStrength(text));
  };

  const { signin } = useAuth();

  const handleSubmit = async () => {
    // const tx = await signin(email, password);
    router.push("/(tabs)");
  };
  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/1809390/pexels-photo-1809390.jpeg?auto=compress&cs=tinysrgb&w=600",
        }}
        className="min-h-[60%] w-full"
      ></ImageBackground>
      <View className="px-[20px] py-4 min-h-[40%] space-y-[16px]">
        <View className="items-start">
          <Text className="text-[20px] font-opensans-bold text-[#fff]">
            Welcome Back 😁
          </Text>
        </View>
        <View className="space-y-2">
          <Text className="font-opensans-regular text-[#fff] text-[16px]">
            Email
          </Text>
          <TextInput
            placeholder="johndoe@gmail.com"
            className="bg-white w-full rounded-lg h-[40px] px-3"
            placeholderTextColor="#000"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View className="space-y-2">
          <Text className="font-opensans-regular text-[#fff] text-[16px]">
            Password
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 10,
              height: 40,
              paddingHorizontal: 10,
            }}
          >
            <TextInput
              secureTextEntry={!passwordVisible}
              placeholder="Enter password"
              style={{ flex: 1 }}
              placeholderTextColor="#000"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <FontAwesome
                name={passwordVisible ? "eye" : "eye-slash"}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full items-center">
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-[#ADF802] rounded-lg py-[16px] mt-[10px] items-center justify-center w-[90%]"
          >
            <Text className="text-[16px]  font-opensans-bold text-[#000]">
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LogIn;
