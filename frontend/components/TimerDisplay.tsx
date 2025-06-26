import { View, Text } from 'react-native';
import React from 'react';
import functions from '@/constants/helperFunctions';

interface TimerDisplayProps {
  seconds: number;
}

const TimerDisplay = ({ seconds }: TimerDisplayProps) => {
  const [h, m, s] = functions.formatTime(seconds);

  return (
    <View>
      <Text className='text-text text-[80px] font-extrabold'>
        {h
          ? `${h}:${functions.padWithZero(m)}:${functions.padWithZero(s)}`
          : `${functions.padWithZero(m)}:${functions.padWithZero(s)}`}
      </Text>
    </View>
  );
};

export default TimerDisplay;
