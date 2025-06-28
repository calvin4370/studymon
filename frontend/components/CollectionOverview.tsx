import { GestureResponderEvent, Text, View } from 'react-native';
import React from 'react';
import CollectionCountPill from './CollectionCountPill';
import IconButtonTwoRows from './IconButtonTwoRows';
import SwitchButton from './SwitchButton';
import SearchButton from './SearchButton';

interface CollectionOverviewProps {
  className?: string;
  onOpenPacksButtonPress: (event: GestureResponderEvent) => void | undefined;
  onBuyPacksButtonPress: (event: GestureResponderEvent) => void | undefined;
}

const CollectionOverview = ({ className = '', onOpenPacksButtonPress, onBuyPacksButtonPress }: CollectionOverviewProps) => {
  return (
    <View
      className={`border-[3px] border-primary h-[200px] bg-background-2 rounded-[20px] pt-[22px] p-[20px] 
      ${className}`}
    >
      <View className='flex-row'>
        <IconButtonTwoRows
          className='mr-[10px]'
          row1={'Open'}
          row2={'Packs'}
          onButtonPress={onOpenPacksButtonPress}
        />
        <IconButtonTwoRows
          row1={'Buy'}
          row2={'Packs'}
          onButtonPress={onBuyPacksButtonPress}
        />
      </View>
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
