import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

interface SwitchButtonProps {
  className?: string;
  active?: boolean;
}

const SwitchButton = ({
  className = '',
  active = false,
}: SwitchButtonProps) => {
  const [isActive, setIsActive] = useState(active);
  const onButtonPress = () => {
    setIsActive(!isActive);
  };
  return (
    <TouchableOpacity
      onPress={onButtonPress}
      className={`flex-row w-[90px] h-[50px] border-[3px] border-primary rounded-full 
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
