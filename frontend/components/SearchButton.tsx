import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/constants/colors';

interface SearchButtonProps {
  className?: string;
  onSearchButtonPress?: (event: GestureResponderEvent) => void | undefined
}

const SearchButton = ({className = '', onSearchButtonPress} : SearchButtonProps) => {
  return (
    <TouchableOpacity onPress={onSearchButtonPress}
      className={`flex-row w-[50px] h-[50px] bg-background border-[3px] items-center justify-center border-primary rounded-full ${className}`}
    >
      <Ionicons name='search' size={28} color={colors.text} />
    </TouchableOpacity>
  );
};

export default SearchButton;
