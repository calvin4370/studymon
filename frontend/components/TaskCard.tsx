import { View, Text, Image } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';
import helperFunctions from '@/constants/helperFunctions';
import colors from '@/constants/colors';
import { Task } from '@/interfaces/interfaces';

const TaskCard = ({
  title,
  description,
  estimatedDurationMinutes,
  deadline = null,
  importance,
  completed,
}: Task) => {
  return (
    <View className='h-[60px] bg-accent-2 border-[3px] border-background-1 rounded-[20px] justify-center px-[10px] py-[5px]'>
      <View className='flex-row gap-[20px]'>
        <Image source={icons.news} className='w-[30px] h-[30px]' tintColor={colors.text} />
        <View>
          <View className='flex-row justify-between gap-[20px]'>
            <Text className='font-bold text-text text-[20px]'>{title}</Text>
            <Text className='font-bold text-text text-[20px]'>{helperFunctions.importanceStars(importance)}</Text>
          </View>
          
          <View className='flex-row justify-between gap-[30px]'>
            <Text className='font-semibold text-text text-[16px]'>{helperFunctions.formatTimeAsShort(estimatedDurationMinutes * 60)}</Text>
            <Text className='font-semibold text-text text-[16px]'>{(deadline) ? (deadline.toDate().toLocaleString()) : ''}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TaskCard;
