import { Text, View } from 'react-native';
import React from 'react';
import CollectionCountPill from './CollectionCountPill';
import OpenPacksButton from './OpenPacksButton';
import SwitchButton from './SwitchButton';
import SearchButton from './SearchButton';

interface CollectionOverviewProps {
  className?: string;
}

const CollectionOverview = ({ className = '' }: CollectionOverviewProps) => {
  // Check user document's cards subcollection to get collectionCount

  return (
    <View
      className={`border-[3px] border-primary h-[200px] bg-background-2 rounded-[20px] pt-[22px] p-[20px] 
      ${className}`}
    >
      <OpenPacksButton />
      <View className='flex-row justify-between items-center mt-[49px]'>
        <CollectionCountPill />
        <View className='flex-row'>
          <View className='items-center justify-center font-semibold mr-[5px]'>
            <Text className='text-text font-semibold'>View</Text>
            <Text className='text-text font-semibold'>all cards</Text>
          </View>
          <SwitchButton className='mr-[10px]' />
          <SearchButton />
        </View>
      </View>
    </View>
  );
};

export default CollectionOverview;
