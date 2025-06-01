import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import TimerDisplay from '@/components/TimerDisplay';
import images from '@/constants/images';
import colors from '@/constants/colors';

const TimerActive = () => {
  const router = useRouter();
  const params = useLocalSearchParams(); // Get params passed from previous TimerScreen (index.tsx)
  const fullDuration = Array.isArray(params.fullDuration)
    ? parseInt(params.fullDuration[0], 10)
    : parseInt(params.fullDuration, 10);
  const [secondsLeft, setSecondsLeft] = useState<number>(fullDuration);

  const handleGiveUp = () => {
    console.log('Give Up Button Pressed!');
    router.replace('/(tabs)'); // Go back to Timer Screen (index.tsx)
  };

  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    if (secondsLeft <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      console.log('Timer finished on TimerActiveScreen!');
      router.replace({
      pathname: '/TimerComplete',
      params: { fullDuration: fullDuration },
    });
      return;
    }

    // Set up Timeout interval to decrease secondsLeft by 1 every second
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [secondsLeft, fullDuration, router]);

  return (
    <SafeAreaView className='flex-1 bg-primary'>
      <StatusBar style='dark' backgroundColor={colors.primary} />

      {/* Main Content */}
      <View className='flex-1 items-center p-6 mt-[100px]'>
        {/* Pan Handle Timer */}
        <View className='items-center mt-[100px]'>
          <Image source={images.timerActive} />
        </View>

        {/* Timer Display */}
        <View className='items-center mt-[10px]'>
          <TimerDisplay seconds={secondsLeft} />
        </View>

        {/* Give Up Button */}
        <TouchableOpacity
          onPress={handleGiveUp}
          className='w-[180px] h-[60px] bg-accent rounded-full justify-center items-center shadow-lg border-2 border-accent-2 active:opacity-75 mt-[50px]'
        >
          <Text className='text-accent-2 text-[24px] font-bold'>Give Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TimerActive;
