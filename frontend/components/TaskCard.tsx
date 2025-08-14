import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';
import helperFunctions from '@/constants/helperFunctions';
import colors from '@/constants/colors';
import { Task } from '@/interfaces/interfaces';
import CircleButton from './CircleButton';

interface TaskCardProps {
  task: Task;
  onPress: (taskId: string) => void;
  isExpanded?: boolean;
  handleDeleteTask: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onPress, isExpanded, handleDeleteTask }) => {
  if (!task) {
    console.warn('TaskCard received an undefined task prop!');
    return null; // Don't render anything if task is undefined
  }

  return (
    <TouchableOpacity onPress={() => onPress(task.id)} activeOpacity={0.7}>
      {/* Main TaskCard */}
      <View className='h-[60px] bg-accent-2 border-[3px] border-background-1 rounded-[20px] justify-center px-[10px] py-[5px]'>
        <View className='flex-row gap-[20px]'>
          <Image
            source={icons.news}
            className='w-[30px] h-[30px]'
            tintColor={colors.text}
          />
          <View className='flex-1'>
            <View className='flex-row justify-between gap-[20px]'>
              <Text className='font-bold text-text text-[20px]'>
                {task.title}
              </Text>
              <Text className='font-bold text-text text-[20px]'>
                {helperFunctions.importanceStars(task.importance)}
              </Text>
            </View>

            <View className='flex-row justify-between gap-[30px]'>
              <Text className='font-semibold text-text text-[16px]'>
                {helperFunctions.formatTimeAsShort(
                  task.estimatedDurationMinutes * 60
                )}
              </Text>
              <Text className='font-semibold text-text text-[16px]'>
                {task.deadline ? task.deadline.toDate().toLocaleString() : ''}
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
              {task.description}
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
                onCircleButtonPress={() => {handleDeleteTask(task.id)}}
              />
              <CircleButton
                imageSource={icons.trash}
                imageClassName='w-[22px] h-[22px]'
                width={40}
                height={40}
                onCircleButtonPress={() => {handleDeleteTask(task.id)}}
              />
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default TaskCard;
