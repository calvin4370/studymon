import { View, TouchableOpacity, GestureResponderEvent } from 'react-native';
import React, { useState } from 'react';

interface SwitchButtonProps {
  className?: string;
  active?: boolean;
  onToggle?: (event: GestureResponderEvent) => void;
}

const SwitchButton = ({
  className = '',
  active = false,
  onToggle = (event) => {},
}: SwitchButtonProps) => {
  const [isActive, setIsActive] = useState(active);
  const handlePress = (event: GestureResponderEvent) => {
    setIsActive(!isActive);
    onToggle(event);
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`flex-row w-[90px] h-[50px] border-[3px] border-primary rounded-full items-center
        ${className} 
        ${isActive ? 'bg-background' : 'bg-text-2'}`}
    >
      {isActive ? (
        <View className='w-[44px] h-[44px] bg-primary border-[3px] rounded-full ml-auto' />
      ) : (
        <View className='w-[44px] h-[44px] bg-background border-[3px] rounded-full' />
      )}
    </TouchableOpacity>
  );
};

export default SwitchButton;
