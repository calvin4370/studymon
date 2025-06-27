import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import icons from '@/constants/icons';
import { doc, onSnapshot } from 'firebase/firestore';
import { FIREBASE_DATABASE } from '@/firebaseConfig';

interface CoinsPillProps {
  className?: string;
  userId: string | null;
}

const CoinsPill = ({ className = '', userId }: CoinsPillProps) => {
  const [coins, setCoins] = useState<number | string>(0);

  useEffect(() => {
    if (!userId) {
      setCoins('no user ID');
      return;
    }
    
    const userRef = doc(FIREBASE_DATABASE, 'users', userId);

    // onSnapshot listener
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data(); // grab data from user doc snapshot
        setCoins(userData.coins || 0);
      } else {
        console.warn(`CoinsPill: User document is missing for UserId: ${userId}`);
        setCoins('error');
      }
    }, (error) => {
      // Handle any errors that occur during the listener's operation
      console.error("Error in CoinsPill", error);
      setCoins('error');
    });

    // cleanup step for onSnapshot
    return () => unsubscribe();

  }, [userId]);

  return (
    <View
      className={`flex-row w-[90px] h-[35px] bg-background border-[3px] items-center justify-center border-text rounded-[20px] px-[18px] py-[7px] ${className}`}
    >
      <Image source={icons.coin} className='w-[25px] h-[25px]' />
      <Text className='text-text font-bold text-[16px]/[17px] ml-[7px]'>
        {coins}
      </Text>
    </View>
  );
};

export default CoinsPill;
