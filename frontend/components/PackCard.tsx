import {
  Text,
  View,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import NumOwnedPill from '@/components/NumOwnedPill';

interface PackCardProps {
  numOwned: number;
  packTier: string;
  name: string;
  image: any;
  onPackPress: (event: GestureResponderEvent) => void | undefined;
}

// Pass display name and image into PackCard for display
const PackCard = ({ numOwned, name, image, onPackPress }: PackCardProps) => {
  return (
    <View className='items-center'>
      <TouchableOpacity onPress={onPackPress} activeOpacity={0.7}>
        <Image
          source={image}
          className='w-[126px] h-[176px]'
          width={126}
          height={176}
          resizeMode='cover'
        />
      </TouchableOpacity>
      <Text className={'mb-2 font-bold text-text>'}>{name}</Text>
      <NumOwnedPill numOwned={numOwned} />
    </View>
  );
};

export default PackCard;
