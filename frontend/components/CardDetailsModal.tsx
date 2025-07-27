import { View, Text, Image, Modal, Dimensions } from 'react-native';
import React from 'react';
import { cardArtMap } from '@/assets/cards/CardArtMap';
import CloseButton from '@/components/CloseButton';

interface CardDetailsModalProps {
  isVisible: boolean;
  card: DisplayCardProps;
  setCardDetailsModalVisible: (visibleState: boolean) => void;
  onModalCloseButtonPress: () => void;
}

const CardDetailsModal = ({
  isVisible,
  card,
  setCardDetailsModalVisible,
  onModalCloseButtonPress,
}: CardDetailsModalProps) => {
  const windowWidth = Dimensions.get('window').width;
  // const windowHeight = Dimensions.get('window').height;

  // Retrieve card art info and image source
  let imageSource: any;
  if (card.cardNum) {
    const cardArtPath = `assets/cards/${card.cardNum}.png`;
    imageSource = cardArtMap[cardArtPath];
  } else {
    imageSource = (card.cardArt) ? cardArtMap[card.cardArt] : "error";
  }

  // Calculate suitable values for card height and width when shown in Card Details
  const focusedCardWidth = windowWidth - 60;
  const focusedCardHeight = focusedCardWidth * (176 / 126);

  return (
    <Modal
      visible={isVisible}
      animationType='slide'
      presentationStyle='formSheet'
      onRequestClose={() => setCardDetailsModalVisible(false)} // handles Android back button / IOS back gesture
    >
      <View className='mt-[20px] mx-[20px]'>
        <CloseButton className='' onButtonPress={onModalCloseButtonPress} />
      </View>
      <View className='items-center'>
        <Image
          source={imageSource}
          className='mt-[40px]'
          style={[
            // TailwindCSS does not work with dynamic values e.g. classname=`w-${...} h-${...}`
            {
              width: focusedCardWidth,
              height: focusedCardHeight,
            },
          ]}
        />
        {card.numOwned ? (
          <Text className='font-bold text-[20px] mt-[20px]'>
            Number Owned: {card.numOwned}
          </Text>
        ) : (
          <></>
        )}
        {card.set ? (
          <Text className='font-bold text-[20px] mt-[20px]'>
            Set: {card.set}
          </Text>
        ) : (
          <></>
        )}
      </View>
    </Modal>
  );
};

export default CardDetailsModal;
