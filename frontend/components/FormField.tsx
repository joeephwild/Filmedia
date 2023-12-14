import React from "react";
import { TextInput, View, Text } from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  name: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  name,
}) => {
  return (
    <View className="items-start space-y-2 mb-[24px]">
      <Text className="text-[#fff] text-[14px] font-normal">{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        className="border-[#C6C6C6] border bg-[#fff] w-[320px] px-[16px] py-[8px] rounded-[80px]"
      />
    </View>
  );
};

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput value={value} onChangeText={onChange} multiline />
    </View>
  );
};
