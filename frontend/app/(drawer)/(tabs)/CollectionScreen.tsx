import CollectionOverview from '@/components/CollectionOverview';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, FlatList } from 'react-native';

import { FIREBASE_AUTH, FIREBASE_DATABASE } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { cardArtMap } from '@/assets/cards/CardArtMap';

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
    router.push('/CollectionScreen');
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
              renderItem={({ item }) => {
                const imageSource = cardArtMap[`assets/cards/${item.cardNum}.png`]; // Only works for BASE set for now, add ${item.setCode} later
                return (
                  <View className='overflow-hidden'>
                    {/* Update to be a ownedCollectionCard component */}
                    <Image
                      source={imageSource}
                      className='w-[126px] h-[176px]'
                      width={126}
                      height={176}
                      resizeMode='cover'
                    />
                  </View>
                );
              }}
              keyExtractor={(item) => item.cardNum.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 11,
                paddingRight: 5,
                marginBottom: 10,
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
            renderItem={({ item }) => {
              const imageSource = cardArtMap[item.cardArt];
              return (
                <View className='overflow-hidden'>
                  {/* Update to be a cardCard component */}
                  <Image
                    source={imageSource}
                    className='w-[126px] h-[176px]'
                    width={126}
                    height={176}
                    resizeMode='cover'
                  />
                </View>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: 'flex-start',
              gap: 11,
              paddingRight: 5,
              marginBottom: 10,
            }}
            scrollEnabled={false}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default CollectionScreen;
