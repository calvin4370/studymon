import {
  View,
  Text,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import icons from '@/constants/icons';
import colors from '@/constants/colors';

interface SaveButtonProps {
  className?: string;
  onButtonPress?: (event: GestureResponderEvent) => void | undefined;
}

const SaveButton = ({ className, onButtonPress }: SaveButtonProps) => {
  return (
    <TouchableOpacity onPress={onButtonPress}>
      <View
        className={`flex-row gap-[5px] w-[80px] h-[35px] border-[2px] border-accent-1 bg-primary-1
        rounded-[20px] items-center justify-center ${className}`}
      >
        <Image source={icons.check} tintColor={colors.text} className='w-[24px] h-[24px]' />
        <Text className='font-semibold text-text'>Save</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SaveButton;