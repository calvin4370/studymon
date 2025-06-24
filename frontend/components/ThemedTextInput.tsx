import { View, TextInput } from "react-native";
import React from "react";
import colors from "@/constants/colors";

interface ThemedTextInputProps {
  placeholder: string;
  onpress?: () => void;
  value: string;
  onChangeText: (text: string) => void;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  secureTextEntry?: boolean;
}

const ThemedTextInput = ({
  placeholder,
  onpress,
  value,
  onChangeText,
  secureTextEntry = false,
}: ThemedTextInputProps) => {
  return (
<<<<<<< HEAD
    <View className='flex-row items-center bg-background border-[2px] border-accent rounded-full px-5 py-4'>
=======
    <View className="flex-row items-center bg-background border-[2px] border-accent rounded-full px-5 py-4">
>>>>>>> 93ae8c8757060ffd4a58d90eba98091e1cabf8bd
      <TextInput
        onPress={onpress}
        placeholder={placeholder}
        placeholderTextColor={colors.text2}
        value={value}
        onChangeText={onChangeText}
<<<<<<< HEAD
        autoCapitalize={'none'}
        secureTextEntry={secureTextEntry}
        className='flex-1 ml-[0px] text-text'
=======
        autoCapitalize={"none"}
        secureTextEntry={secureTextEntry}
        className="flex-1 ml-[0px] text-text"
>>>>>>> 93ae8c8757060ffd4a58d90eba98091e1cabf8bd
      />
    </View>
  );
};

export default ThemedTextInput;
