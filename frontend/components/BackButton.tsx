import {
  View,
  Text,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import icons from '@/constants/icons';

interface BackButtonProps {
  className?: string;
  onButtonPress?: (event: GestureResponderEvent) => void | undefined;
}

const BackButton = ({ className, onButtonPress }: BackButtonProps) => {
  return (
    <TouchableOpacity onPress={onButtonPress}>
      <View
        className={`flex-row gap-[5px] w-[80px] h-[40px] border-[2px] border-accent-2 bg-background-2 
        rounded-[20px] items-center justify-center ${className}`}
      >
        <Image source={icons.backSign} />
        <Text className='font-semibold text-text'>Back</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
