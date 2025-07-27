import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { cardArtMap } from '@/assets/cards/CardArtMap';

// NOTE: A Card card is a card (ui component) of a StudyMon card
// AllCardCard takes props based on cards in Firestore/cards
// This AllCardCard takes a card object (ts) and returns a CardCard component


const AllCardCard = (
  { cardArt, category, faculty, id, name, rarity, set, year }: AllCardProps,
  handleCardSelect: (card: DisplayCardProps) => void
) => {
  // Retrieve card art info and image source
  const imageSource = cardArtMap[cardArt]; // Only works for BASE set for now, add ${item.setCode} later

  const onCardPress = () => {
    handleCardSelect({ cardArt, category, faculty, id, name, rarity, set, year })
  }

  return (
    <TouchableOpacity onPress={onCardPress}>
      <View className='overflow-hidden'>
        <Image
          source={imageSource}
          className='w-[126px] h-[176px]'
          width={126}
          height={176}
          resizeMode='cover'
        />
      </View>
    </TouchableOpacity>
  );
};

export default AllCardCard;
