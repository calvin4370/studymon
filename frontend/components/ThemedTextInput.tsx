import { View, TextInput } from 'react-native';
import React from 'react';
import colors from '@/constants/colors';

interface ThemedTextInputProps {
  placeholder: string;
  onpress?: () => void;
  value: string;
  onChangeText: (text: string) => void;
}

const ThemedTextInput = ({
  placeholder,
  onpress,
  value,
  onChangeText,
}: ThemedTextInputProps) => {
  return (
    <View className='flex-row items-center bg-background border-[2px] border-accent rounded-full px-5 py-4'>
      <TextInput
        onPress={onpress}
        placeholder={placeholder}
        placeholderTextColor={colors.text2}
        value={value}
        onChangeText={onChangeText}
        className='flex-1 ml-[0px] text-text'
      />
    </View>
  );
};

export default ThemedTextInput;
