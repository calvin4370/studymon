import { View, TextInput, KeyboardTypeOptions } from 'react-native';
import React from 'react';
import colors from '@/constants/colors';

interface ThemedTextInputProps {
  width?: number;
  height?: number;
  placeholder: string;
  onpress?: () => void;
  value: string;
  onChangeText: (text: string) => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  className?: string;
  textClassName?: string;
}

const ThemedTextInput = ({
  width,
  height = 40,
  placeholder,
  onpress,
  value,
  onChangeText,
  secureTextEntry = false,
  multiline = false,
  keyboardType = 'default',
  className = '',
  textClassName = '',
}: ThemedTextInputProps) => {
  return (
    <View
      className={`flex-row items-center bg-background border-[2px] border-accent rounded-[20px] px-[15px] py-[5px] ${className}`}
      style={[
        {
          width: width,
          height: height,
        },
      ]}
    >
      <TextInput
        onPress={onpress}
        placeholder={placeholder}
        placeholderTextColor={colors.text2}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={'none'}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        keyboardType={keyboardType}
        className={`flex-1 ml-[0px] text-text ${textClassName}`}
      />
    </View>
  );
};

export default ThemedTextInput;
