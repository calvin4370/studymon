import {
  View,
  Text,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';

interface RowButtonProps {
  className?: string;
  onButtonPress: (event: GestureResponderEvent) => void | undefined;
  icon: ImageSourcePropType;
  label: string;
  tintColor: string;
  backgroundColour: string;
}

const RowButton = ({
  className,
  onButtonPress,
  icon,
  label,
  tintColor,
  backgroundColour,
}: RowButtonProps) => {
  return (
    <TouchableOpacity onPress={onButtonPress}>
      <View
        className={`flex-row gap-[5px] h-[40px] border-[2px] border-text ${backgroundColour} 
        rounded-[20px] items-center justify-center ${className}`}
      >
        <Image
          source={icon}
          tintColor={tintColor}
          className='w-[24px] h-[24px]'
        />
        <Text className='font-semibold text-background'>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RowButton;
