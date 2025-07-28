import { View, Text, Image } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';
import { Event } from '@/interfaces/interfaces';
import colors from '@/constants/colors';

const EventCard = ({
  title,
  description,
  startDate,
  endDate,
  createdAt,
  travelTimeTo,
  travelTimeBack,
  source,
}: Event) => {
  return (
    <View className='h-[60px] bg-accent-2 border-[3px] border-background-1 rounded-[20px] justify-center px-[10px] py-[5px]'>
      <View className='flex-row gap-[20px]'>
        <Image
          source={icons.calendar}
          className='w-[30px] h-[30px]'
          tintColor={colors.text}
        />
        <View>
          <View className='flex-row justify-between gap-[20px]'>
            <Text className='font-bold text-text text-[20px]'>{title}</Text>
          </View>

          <View className='flex-row justify-between gap-[30px]'>
            <Text className='font-semibold text-text text-[14px]'>{startDate.toDate().toLocaleString()} - {endDate.toDate().toLocaleString()}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventCard;
