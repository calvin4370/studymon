import {
  View,
  Image,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import icons from '@/constants/icons';
import colors from '@/constants/colors';

interface OpenPacksButtonProps {
  className?: string;
  row1?: string;
  row2?: string;
  onButtonPress?: (event: GestureResponderEvent) => void | undefined;
}

const IconButtonTwoRows = ({
  className = '',
  row1 = 'Row 1',
  row2 = 'Row 2',
  onButtonPress,
}: OpenPacksButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onButtonPress}
      activeOpacity={0.7}
      className={`flex-row w-[120px] h-[63px] bg-background border-[3px] border-primary 
        items-center justify-center rounded-[10px] rounded-tl-[20px] rounded-br-[20px] px-[18px] py-[7px] ${className}`}
    >
      <Image
        source={icons.cards}
        tintColor={colors.text}
        className='w-[25px] h-[25px]'
      />
      <View>
        <Text className='text-text font-bold text-[16px]/[17px] ml-[8px]'>
          {row1}
        </Text>
        <Text className='text-text font-bold text-[16px]/[17px] ml-[8px]'>
          {row2}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default IconButtonTwoRows;
