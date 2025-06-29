import { View, Text } from 'react-native';
import React from 'react';

interface NumOwnedPillProps {
  numOwned: number;
}

const NumOwnedPill = ({ numOwned }: NumOwnedPillProps) => {
  return (
    <View className='w-[100px] h-[44px] bg-primary border-[3px] rounded-full items-center justify-center'>
      <Text className='text-text font-semibold text-[16px]'>{numOwned} owned</Text>
    </View>
  );
};

export default NumOwnedPill;
