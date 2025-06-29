import { GestureResponderEvent, Text, View } from 'react-native';
import React from 'react';
import CollectionCountPill from './CollectionCountPill';
import IconButtonTwoRows from './IconButtonTwoRows';
import SwitchButton from './SwitchButton';
import SearchButton from './SearchButton';

interface CollectionOverviewProps {
  className?: string;
  cardCount: number;
  onOpenPacksButtonPress: (event: GestureResponderEvent) => void | undefined;
  onBuyPacksButtonPress: (event: GestureResponderEvent) => void | undefined;
  onSwitchButtonToggle: (event: GestureResponderEvent) => void | undefined;
  onSearchButtonPress: (event: GestureResponderEvent) => void | undefined;
}

const CollectionOverview = ({
  className = '',
  cardCount,
  onOpenPacksButtonPress,
  onBuyPacksButtonPress,
  onSwitchButtonToggle,
  onSearchButtonPress,
}: CollectionOverviewProps) => {
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
        <CollectionCountPill collectionCount={cardCount} />
        <View className='flex-row'>
          <View className='items-center justify-center font-semibold mr-[5px]'>
            <Text className='text-text font-semibold'>View</Text>
            <Text className='text-text font-semibold'>all cards</Text>
          </View>
          <SwitchButton onToggle={onSwitchButtonToggle} className='mr-[10px]' />
          <SearchButton onSearchButtonPress={onSearchButtonPress} />
        </View>
      </View>
    </View>
  );
};

export default CollectionOverview;
