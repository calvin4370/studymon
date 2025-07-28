import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';
import helperFunctions from '@/constants/helperFunctions';
import colors from '@/constants/colors';
import { Task } from '@/interfaces/interfaces';

interface TaskCardProps {
  task: Task;
  onPress?: (taskId: string) => void;
  isExpanded?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onPress,
  isExpanded,
}) => {
  if (!task) {
    console.warn('TaskCard received an undefined task prop!');
    return null; // Don't render anything if task is undefined
  }

  return (
    <TouchableOpacity activeOpacity={0.7}>
      
      {/* Main TaskCard */}
      <View className='h-[60px] bg-accent-2 border-[3px] border-background-1 rounded-[20px] justify-center px-[10px] py-[5px]'>
        <View className='flex-row gap-[20px]'>
          <Image source={icons.news} className='w-[30px] h-[30px]' tintColor={colors.text} />
          <View>
            <View className='flex-row justify-between gap-[20px]'>
              <Text className='font-bold text-text text-[20px]'>{task.title}</Text>
              <Text className='font-bold text-text text-[20px]'>{helperFunctions.importanceStars(task.importance)}</Text>
            </View>
            
            <View className='flex-row justify-between gap-[30px]'>
              <Text className='font-semibold text-text text-[16px]'>{helperFunctions.formatTimeAsShort(task.estimatedDurationMinutes * 60)}</Text>
              <Text className='font-semibold text-text text-[16px]'>{(task.deadline) ? (task.deadline.toDate().toLocaleString()) : ''}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Expanded Portion when highlighted */}
      {isExpanded && (
        <View className='h-[60px] bg-primary-1 border-[3px] border-background-1 rounded-[20px] justify-center px-[10px] py-[5px]'>
          <View>
            <Text className='font-normal text-text text-[12px]'>{task.description}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default TaskCard;
