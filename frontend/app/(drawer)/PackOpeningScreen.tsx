import { View, Text, FlatList, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '@/firebaseConfig';
import PackCard from '../../components/PackCard';
import { FACULTY_PACKS, PACK_SIZES } from '@/constants/packs';
import { openPackForUser } from '@/constants/utils';
import OwnedCardCard from '@/components/OwnedCardCard';

// Helper to get display name and image by packTier
function getPackMeta(packTier: string) {
  const meta =
    PACK_SIZES.find((pack) => pack.id === packTier) ||
    FACULTY_PACKS.find((pack) => pack.id === packTier);
  return {
    name: meta?.name ?? packTier,
    image: meta?.image,
  };
}

const PackOpeningScreen = () => {
  // States
  const [ownedPacks, setOwnedPacks] = useState<any[]>([]); // Quickfix, Figure out what to do with the any type later
  const [openedCards, setOpenedCards] = useState<any[]>([]); // Quickfix, Figure out what to do with the any type later

  // Total number of owned packs
  const totalOwnedPacks = ownedPacks.reduce(
    (total, pack) => total + (pack.numOwned || 0),
    0
  );

  // Fetch all  user's ownedPacks from Firestore database
  useEffect(() => {
    const fetchPackData = async () => {
      try {
        // Fetch all owned packs for users->userId->packs subcollection
        const userId = FIREBASE_AUTH.currentUser?.uid;
        if (userId) {
          const ownedPacksRef = collection(
            FIREBASE_DATABASE,
            'users',
            userId,
            'packs'
          );
          // Listen for real-time updates
          const unsubscribe = onSnapshot(ownedPacksRef, (snapshot) => {
            const fetchedOwnedPacks = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setOwnedPacks(fetchedOwnedPacks);
          });
          // Cleanup listener on unmount
          return () => unsubscribe();
        } else {
          console.warn('Cannot find userId for current user');
          setOwnedPacks([]);
        }
      } catch (error: any) {
        console.error('Error fetching user ownedPacks data: ', error);
      } finally {
        console.log("Fetched user's ownedPacks");
      }
    };

    fetchPackData();
  }, []); // Dependency array empty so that this only runs once when component mounts

  // Confirmation and pack opening logic
  const handleOpenPack = async (pack: any) => {
    if (pack.numOwned <= 0) {
      Alert.alert('No packs left', 'You do not own this pack.');
      return;
    }
    Alert.alert(
      'Open Pack',
      `Are you sure you want to open a ${getPackMeta(pack.packTier).name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open',
          onPress: async () => {
            try {
              const opened = await openPackForUser(pack.packTier);
              setOpenedCards(opened);

              // Reduce numOwned for this pack
              const userId = FIREBASE_AUTH.currentUser?.uid;
              const packDocId = pack.id;
              const packRef = doc(
                FIREBASE_DATABASE,
                'users',
                userId!,
                'packs',
                packDocId
              );
              await updateDoc(packRef, {
                numOwned: pack.numOwned - 1,
              });
            } catch (err) {
              Alert.alert('Error opening pack', err.message || 'Unknown error');
            }
          },
        },
      ]
    );
  };

  // Only show packs if user has any owned packs
  const visibleOwnedPacks = ownedPacks.filter((pack) => pack.numOwned > 0);

  return (
    <View className='flex-1 bg-background-1 p-[20px]'>
      <View className='bg-background-1'>
        <Text className='text-text font-bold text-[30px] mb-[20px]'>
          Your Packs ({totalOwnedPacks} owned)
        </Text>
        <FlatList
          className='p-[20px] border-[2px] rounded-[20px]'
          data={visibleOwnedPacks}
          renderItem={({ item }) => {
            const { name, image } = getPackMeta(item.packTier);
            return (
              <View className='items-center'>
                <PackCard
                  numOwned={item.numOwned}
                  packTier={item.packTier}
                  name={name}
                  image={image}
                  onPackPress={() => handleOpenPack(item)}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
      <View>
        <Text className='text-text font-bold text-[30px] mt-[20px] mb-[20px]'>
          Opened Cards
        </Text>
        {openedCards.length > 0 ? (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className='flex-row flex-wrap gap-x-[10px]'>
              {openedCards.map((card) => (
                <OwnedCardCard
                  key={card.cardNum}
                  {...card}
                  handleCardSelect={() => {}} // or your own handler
                />
              ))}
            </View>
          </ScrollView>
        ) : (
          // No opened cards i.e. have not opened packs yet
          <View className='h-[200px] items-center justify-center'>
            <Text className='text-text font-medium text-[24px]'>
              No opened cards
            </Text>
            <Text className='text-text font-medium text-[24px]'>
              Open cards from packs
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default PackOpeningScreen;
