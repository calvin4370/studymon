import { View } from 'react-native';
import React from 'react';
import CollectionCountPill from './CollectionCountPill';
import OpenPacksButton from './OpenPacksButton';
import SwitchButton from './SwitchButton';
import SearchButton from './SearchButton';

const CollectionOverview = () => {
  return (
    <View className='border-[3px] border-primary h-[200px] bg-background-2 rounded-[20px] pt-[22px] p-[20px]'>
      <OpenPacksButton />
      <View className='flex-row justify-between items-center mt-[49px]'>
        <CollectionCountPill />
        <SwitchButton />
        <SearchButton />
      </View>
    </View>
  );
};

export default CollectionOverview;
