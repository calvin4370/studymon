import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { cardArtMap } from '@/assets/cards/CardArtMap';

// NOTE: A Card card is a card (ui component) of a StudyMon card
// OwnedCardCard takes props based on user's owned cards in Firestore/users/ownedCards
// This OwnedCardCard takes a card object (ts) and returns a CardCard component

const OwnedCardCard = (
  { cardNum, id, lastObtained, numOwned, setCode }: OwnedCardProps,
  handleCardSelect: (card: DisplayCardProps) => void
) => {
  // Retrieve card art info and image source
  const cardArtPath = `assets/cards/${cardNum}.png`;
  const imageSource = cardArtMap[cardArtPath]; // Only works for BASE set for now, add ${item.setCode} later

  const onCardPress = () => {
    handleCardSelect({ cardNum, id, lastObtained, numOwned, setCode })
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

export default OwnedCardCard;
