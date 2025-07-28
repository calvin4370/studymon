import { View, Text, ScrollView, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import CollectionOverview from '@/components/CollectionOverview';
import OwnedCardCard from '@/components/OwnedCardCard';
import AllCardCard from '@/components/AllCardCard';
import CardDetailsModal from '@/components/CardDetailsModal';
import values from '@/constants/values';

import { FIREBASE_AUTH, FIREBASE_DATABASE } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { DisplayCardProps } from '@/interfaces/interfaces';

const CollectionScreen = () => {
  const router = useRouter();

  // States
  const [viewState, setViewState] = useState('collectionOnly');
  const [ownedCards, setOwnedCards] = useState<any[]>([]); // Quickfix, Figure out what to do with the any type later
  const [allCards, setAllCards] = useState<any[]>([]);
  // // State to track if data is still being loaded so can show spinning icon while waiting
  // const [loadingCards, setLoadingCards] = useState(true); // Think about setting a loading spinner
  // // State to track if an error occurred so can show the error text later
  // const [errorFetchingCards, setErrorFetchingCards] = useState<string | null>(
  //   null
  // );
  const [cardDetailsModalVisible, setCardDetailsModalVisible] = useState(false);
  const [currentSelectedCard, setCurrentSelectedCard] = useState<
    DisplayCardProps
  >(values.nullCard);

  // Fetch all card info & user's ownedCards from Firestore database
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        // setLoadingCards(true);
        // setErrorFetchingCards(null);

        // Fetch all cards from 'cards' collection (masterlist of all cards in app)
        const allCardsRef = collection(FIREBASE_DATABASE, 'cards');
        const allCardsSnap = await getDocs(allCardsRef);
        const fetchedAllCards = allCardsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })); // Convert the card documents in the masterlist to an array of javascript objects representing cards
        setAllCards(fetchedAllCards);

        // Fetch user's owned cards from users->userId->ownedCards subcollection
        const userId = FIREBASE_AUTH.currentUser?.uid;
        if (userId) {
          const ownedCardsRef = collection(
            FIREBASE_DATABASE,
            'users',
            userId,
            'ownedCards'
          );
          const ownedCardsSnap = await getDocs(ownedCardsRef);
          const fetchedOwnedCards = ownedCardsSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOwnedCards(fetchedOwnedCards);
        } else {
          console.warn('Cannot find userId for current user');
          setOwnedCards([]);
        }
      } catch (error: any) {
        console.error('Error fetching card data:', error);
        // setErrorFetchingCards(
        //   `ERROR in loading cards: ${error.message || 'Unknown error'}`
        // );
      } finally {
        // setLoadingCards(false); // Stop loading animation
      }
    };

    fetchCardData();
  }, []); // Dependency array empty so that this only runs once when component mounts

  // Function definitions for Buttons
  const handleOpenPacksButtonPress = () => {
    router.push('/(drawer)/PackOpeningScreen');
  };

  const handleBuyPacksButtonPress = () => {
    router.push('/(drawer)/StoreScreen');
  };

  const handleSwitchButtonToggle = () => {
    if (viewState === 'collectionOnly') {
      setViewState('allCards');
    } else {
      setViewState('collectionOnly');
    }
  };

  const onSearchButtonPress = () => {
    console.log('Search');
    alert('Search function for card collection TBD');
  };

  const onModalCloseButtonPress = () => {
    console.log('CardDetailsModal Close Button Pressed')
    setCardDetailsModalVisible(false)
  }

  const handleCardSelect = (card: DisplayCardProps) => {
    setCurrentSelectedCard(card);
    setCardDetailsModalVisible(true);
    console.log(`Clicked card: ${card.cardNum}`)
  };

  return (
    <ScrollView className='bg-background pt-[20px] mx-[20px]'>
      <CollectionOverview
        className='mb-[20px]'
        cardCount={ownedCards.length}
        onOpenPacksButtonPress={handleOpenPacksButtonPress}
        onBuyPacksButtonPress={handleBuyPacksButtonPress}
        onSwitchButtonToggle={handleSwitchButtonToggle}
        onSearchButtonPress={onSearchButtonPress}
      />

      {/* Show only collectionOnly view or allCards view based on SwitchButton state */}
      {viewState === 'collectionOnly' ? (
        ownedCards.length > 0 ? (
          // collectionOnly view and user has at least 1 card to show
          <View>
            <Text className='text-text font-bold text-[30px] mb-[20px]'>
              Collection
            </Text>
            <FlatList
              className='pb-[50px]'
              data={ownedCards}
              renderItem={({ item }) => OwnedCardCard(item, handleCardSelect)}
              keyExtractor={(item) => item.cardNum.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 11,
                marginBottom: 11,
              }}
              scrollEnabled={false} // handled by the outer ScrollView
            />
          </View>
        ) : (
          // collectionOnly view and but user has an empty collection
          <View className='flex-1 justify-center items-center mt-[180px]'>
            <Text className='text-text font-medium text-[32px]'>
              Open packs to
            </Text>
            <Text className='text-text font-medium text-[32px] mb-[100px]'>
              collect cards
            </Text>
          </View>
        )
      ) : (
        // allCards view
        <View>
          <Text className='text-text font-bold text-[30px] mb-[20px]'>
            Base Set
          </Text>
          <FlatList
            className='pb-[50px]'
            data={allCards}
            renderItem={({ item }) => AllCardCard(item, handleCardSelect)}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: 'flex-start',
              gap: 11,
              marginBottom: 11,
            }}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* Card Details Modal */}
      <CardDetailsModal
        isVisible={cardDetailsModalVisible}
        card={currentSelectedCard}
        setCardDetailsModalVisible={setCardDetailsModalVisible}
        onModalCloseButtonPress={onModalCloseButtonPress}
      />
    </ScrollView>
  );
};

export default CollectionScreen;
