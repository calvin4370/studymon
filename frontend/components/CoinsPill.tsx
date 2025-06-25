import { View, Text, Image } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';

interface CoinsPillProps {
  className?: string;
  coinsCount?: number;
}

const CoinsPill = ({ className = '', coinsCount = 0 }: CoinsPillProps) => {
  return (
    <View className={`flex-row w-[90px] h-[35px] bg-background border-[3px] items-center justify-center border-text rounded-[20px] px-[18px] py-[7px] ${className}`}>
      <Image
        source={icons.coin}
        className='w-[25px] h-[25px]'
      />
      <Text className='text-text font-bold text-[16px]/[17px] ml-[8px]'>
        {coinsCount}
      </Text>
    </View>
  );
};

export default CoinsPill;
