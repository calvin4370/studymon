import { View, Text } from 'react-native';
import React from 'react';

interface TimerDisplayProps {
  seconds: number;
}

const TimerDisplay = ({ seconds }: TimerDisplayProps) => {
  // Helper function to add leading 0 to number (up to 2 digits)
  const padWithZero = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  // Helper function to convert seconds to [hours, minutes, seconds]
  const formatTime = (seconds: number): number[] => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return [h, m, s];
  };

  const [h, m, s] = formatTime(seconds)

  return (
    <View>
      <Text className='text-text text-[80px] font-extrabold'>
        {
          h
            ? `${h}:${padWithZero(m)}:${padWithZero(s)}`
            : `${padWithZero(m)}:${padWithZero(s)}`
        }
      </Text>
    </View>
  );
};

export default TimerDisplay;
