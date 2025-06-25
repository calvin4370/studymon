import { View } from 'react-native';
import React from 'react';
import CollectionCountPill from './CollectionCountPill';
import RoundishSquare from './RoundishSquare';

const CollectionOverview = () => {
  return (
    <View className='border-[3px] border-primary h-[200px] bg-background-2 rounded-[20px] pt-[22px] p-[20px]'>
      <RoundishSquare />
      <View className='flex-row mt-[59px]'>
        <CollectionCountPill />
      </View>
      
    </View>
  );
};

export default CollectionOverview;
