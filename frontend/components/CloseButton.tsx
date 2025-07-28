import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';

interface CloseButtonProps {
  className?: string;
  onButtonPress?: (event: GestureResponderEvent) => void | undefined;
}

const CloseButton = ({ className, onButtonPress }: CloseButtonProps) => {
  return (
    <TouchableOpacity onPress={onButtonPress} activeOpacity={0.7}>
      <View
        className={`flex-row w-[30px] h-[30px] bg-background border-[2px] items-center justify-center border-text rounded-full px-[4px] pt-[0px] pb-[5px] ${className}`}
      >
        <Text className='font-bold text-[20px]'>x</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CloseButton;
