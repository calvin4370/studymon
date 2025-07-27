import { FlatList, Text, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import RectangleButton from '@/components/RectangleButton';
import icons from '@/constants/icons';
import { ScrollView } from 'react-native';

const ScheduleScreen = () => {
  // Handle Button Presses
  const handleAddTaskButtonPress = () => {
    router.push('../(scheduleScreens)/AddTaskScreen');
  };

  const handleAddEventButtonPress = () => {
    // router.push('../(scheduleScreens)/AddEventScreen');
    router.push('../(scheduleScreens)/AddEventScreen');
  };

  return (
    <View className='flex-1'>
      {/* Main Schedule Content */}
      <View className='flex-1 p-[20px] border-[1px]'>
        <View className='flex-1 border-[1px] border-blue-500'>
          {/* Calendar Overview (But now currently just events overview)*/}
          <View className='h-[300px] border-[2px] border-green-500'>
            <Text className='font-bold text-text text-[28px] pb-[10px]'>Upcoming Events</Text>
            <FlatList data={undefined} renderItem={undefined} />
          </View>

          {/* Upcoming Tasks/Events Overview */}
          <View className='h-[300px] border-[2px] border-green-500'>
            <Text className='font-bold text-text text-[28px] pb-[10px]'>Upcoming Tasks</Text>
            <FlatList data={undefined} renderItem={undefined} />
          </View>
        </View>
      </View>

      {/* Add Task/Event Buttons */}
      <View className='flex-row px-[20px] gap-[10px] pb-[75px]'>
        {/* Add Task Button */}
        <RectangleButton
          onButtonPress={handleAddTaskButtonPress}
          icon={icons.news}
          label='Add Task'
        />

        {/* Add Event Button */}
        <RectangleButton
          onButtonPress={handleAddEventButtonPress}
          icon={icons.calendar}
          label='Add Event'
        />
      </View>
    </View>
  );
};

export default ScheduleScreen;
