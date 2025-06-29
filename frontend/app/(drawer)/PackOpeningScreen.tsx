import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '@/firebaseConfig';
import NumOwnedPill from '@/components/NumOwnedPill';
import PackCard from '../../components/PackCard';

const PackOpeningScreen = () => {
  // States
  const [ownedPacks, setOwnedPacks] = useState<any[]>([]); // Quickfix, Figure out what to do with the any type later
  const [openedCards, setOpenedCards] = useState<any[]>([]); // Quickfix, Figure out what to do with the any type later

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
          const ownedPacksSnap = await getDocs(ownedPacksRef);
          const fetchedOwnedPacks = ownedPacksSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOwnedPacks(fetchedOwnedPacks);
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

  // Function definitions for Buttons

  return (
    <View className='flex-1 bg-background-1 p-[20px]'>
      <View className='bg-background-1'>
        <Text className='text-text font-bold text-[30px] mb-[20px]'>
          Your Packs ({ownedPacks.length} owned)
        </Text>
        <FlatList
          className='p-[20px] border-[2px] rounded-[20px]'
          data={ownedPacks}
          renderItem={({ item }) => {
            return (
              <View className='items-center'>
                {/* Update PackCard to take other packs by setCode and packTier */}
                <PackCard numOwned={ownedPacks.length} onPackPress={() => {alert('TBD')}}/>
              </View>
            );
          }}
          keyExtractor={(item) => item.setCode.toString()}
          horizontal={true}
        />
      </View>
      <View>
        <Text className='text-text font-bold text-[30px] mt-[20px] mb-[20px]'>
          Opened Cards
        </Text>
        {openedCards.length > 0 ? (
          <View>
            <Text>Opened cards: {openedCards}</Text>
          </View>
        ) : (
          // No opened cards i.e. have not opened packs yet
          <View className='h-[200px] items-center justify-center'>
            <Text className='text-text font-medium text-[24px]'>No opened cards</Text>
            <Text className='text-text font-medium text-[24px]'>Open cards from packs</Text>
          </View>
        )}
      </View>
      
    </View>
  );
};

export default PackOpeningScreen;
