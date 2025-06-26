import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import images from '@/constants/images';
import helperFunctions from '@/constants/helperFunctions';
import functions from '@/constants/functions';
import { useAuth } from '@/contexts/AuthContext';
import { doc, increment, updateDoc } from 'firebase/firestore';
import { FIREBASE_DATABASE } from '@/firebaseConfig';
import { useEffect } from 'react';

const TimerComplete = () => {
  const { user } = useAuth(); // Get the current user from AuthContext
  const router = useRouter();
  const params = useLocalSearchParams(); // Get params passed from previous TimerScreen (index.tsx)
  const fullDuration = Array.isArray(params.fullDuration)
    ? parseInt(params.fullDuration[0], 10)
    : parseInt(params.fullDuration, 10);
  const minutesCompleted = Math.floor(fullDuration / 60);
  const coinsAwarded = functions.getCoinReward(minutesCompleted);

  const handleReturn = () => {
    router.replace('/(tabs)'); // Go back to index.tsx (TimerScreen)
  };

  // useEffect waits for the user to be defined before executing the function
  useEffect(() => {
    const awardCoins = async () => {
      if (user && coinsAwarded > 0) {
        // must be inside here to ensure user is defined
        const userRef = doc(FIREBASE_DATABASE, 'users', user?.uid || ''); // get a reference to the user's document in Firestore
        // Update user's coins and duration in Firestore
        await updateDoc(userRef, {
          coins: increment(coinsAwarded),
          totalFocusTime: increment(fullDuration),
        });
      }
    };
    awardCoins();
  }, [user, coinsAwarded, fullDuration]);

  return (
    <SafeAreaView className='flex-1 bg-primary'>
      <StatusBar style='dark' />

      {/* Main Content */}
      <View className='flex-1 items-center p-6 mt-[40px]'>
        {/* Pan Handle Timer */}
        <View className='items-center mt-[100px]'>
          <Image source={images.timerActive} />
        </View>

        {/* Timer Complete Message*/}
        <View className='items-center mt-[20px]'>
          <Text className='text-text text-[22px]'>You focused for</Text>
          <Text className='text-text text-[22px] font-semibold'>
            {helperFunctions.formatTimeAsSentence(fullDuration)}!
          </Text>
        </View>

        {/* Coins Awarded Message */}
        <View className='items-center mt-[20px]'>
          <Text className='text-yellow-300 font-semibold italic text-[20px]'>
            +<Text className='font-bold'>{coinsAwarded}</Text> coin
            {coinsAwarded === 1 ? '' : 's'} earned
          </Text>
        </View>

        {/* Return Button */}
        <TouchableOpacity
          onPress={handleReturn}
          className='w-[180px] h-[60px] bg-accent rounded-full justify-center items-center shadow-lg border-2 border-accent-2 active:opacity-75 mt-[50px]'
        >
          <Text className='text-primary text-[24px] font-bold'>Return</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TimerComplete;
