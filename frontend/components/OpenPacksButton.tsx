import { View, Image, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';
import colors from '@/constants/colors';

interface OpenPacksButtonProps {
  className?: string;
  onButtonPress?: (event: GestureResponderEvent) => void | undefined;
}

const OpenPacksButton = ({className = '', onButtonPress} : OpenPacksButtonProps) => {
  return (
    <TouchableOpacity onPress={onButtonPress}
      className='flex-row w-[120px] h-[63px] bg-background border-[3px] border-primary 
        items-center justify-center rounded-[10px] rounded-tl-[20px] rounded-br-[20px] px-[18px] py-[7px]'
    >
      <Image
        source={icons.cards}
        tintColor={colors.text}
        className='w-[25px] h-[25px]'
      />
      <View>
        <Text className='text-text font-bold text-[16px]/[17px] ml-[8px]'>
          Open
        </Text>
        <Text className='text-text font-bold text-[16px]/[17px] ml-[8px]'>
          Packs
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OpenPacksButton;
