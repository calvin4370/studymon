import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { cardArtMap } from '@/assets/cards/CardArtMap';

interface OpenedCardProps {
  cardNum: string;
  initialFace: string;
}

const OpenedCard = ({ cardNum, initialFace = 'down' }: OpenedCardProps) => {
  const cardBackImageSource = require('assets/cards/card-back.png');
  const cardImageSource = cardArtMap[`assets/cards/${cardNum}.png`]; // Only works for BASE set for now, add ${item.setCode} later

  // States
  const [face, setFace] = useState(initialFace);

  // Function Definitions
  const handleCardPress = () => {
    setFace(face === 'down' ? 'up' : 'down');
  };

  return (
    <View className=''>
      {face === 'down' ? (
        <TouchableOpacity onPress={handleCardPress} activeOpacity={0.7}>
          <Image
            source={cardBackImageSource}
            className='w-[126px] h-[176px]'
            width={126}
            height={176}
            resizeMode='cover'
          />
          <Text>{face}</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <Image
            source={cardImageSource}
            className='w-[126px] h-[176px]'
            width={126}
            height={176}
            resizeMode='cover'
          />
          <Text>{face}</Text>
        </View>
      )}
    </View>
  );
};

export default OpenedCard;
