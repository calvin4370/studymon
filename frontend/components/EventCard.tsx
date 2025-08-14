import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';
import { Event } from '@/interfaces/interfaces';
import colors from '@/constants/colors';
import CircleButton from './CircleButton';

interface EventCardProps {
  event: Event;
  onPress: (eventId: string) => void;
  isExpanded?: boolean;
  handleDeleteEvent: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onPress,
  isExpanded,
  handleDeleteEvent,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(event.id)} activeOpacity={0.7}>
      <View className='h-[60px] bg-accent-2 border-[3px] border-background-1 rounded-[20px] justify-center px-[10px] py-[5px]'>
        <View className='flex-row gap-[20px]'>
          <Image
            source={icons.calendar}
            className='w-[30px] h-[30px]'
            tintColor={colors.text}
          />
          <View>
            <View className='flex-row justify-between gap-[20px]'>
              <Text className='font-bold text-text text-[20px]'>
                {event.title}
              </Text>
            </View>

            <View className='flex-row justify-between gap-[30px]'>
              <Text className='font-semibold text-text text-[14px]'>
                {event.startDate.toDate().toLocaleString()} -{' '}
                {event.endDate.toDate().toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Expanded Portion when highlighted */}
      {isExpanded && (
        <View className='flex-1 h-[60px] bg-primary-1 border-[3px] border-background-1 rounded-[20px] px-[5px] py-[5px]'>
          <View className='flex-row justify-between'>
            <Text className='font-normal text-text text-[12px] m-[5px]'>
              {event.description}
            </Text>
            <View className='flex-row justify-between items-center gap-[5px] p-[2.5px]'>
              <CircleButton
                imageSource={icons.edit}
                imageClassName='w-[20px] h-[20px]'
                width={40}
                height={40}
              />
              <CircleButton
                imageSource={icons.check}
                imageClassName='w-[24px] h-[24px]'
                width={40}
                height={40}
                onCircleButtonPress={() => {handleDeleteEvent(event.id)}}
              />
              <CircleButton
                imageSource={icons.trash}
                imageClassName='w-[22px] h-[22px]'
                width={40}
                height={40}
                onCircleButtonPress={() => {handleDeleteEvent(event.id)}}
              />
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default EventCard;
