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
import functions from '@/constants/functions';

const TimerComplete = () => {
  const router = useRouter();
  const params = useLocalSearchParams(); // Get params passed from previous TimerScreen (index.tsx)
  const fullDuration = Array.isArray(params.fullDuration)
    ? parseInt(params.fullDuration[0], 10)
    : parseInt(params.fullDuration, 10);

  const handleReturn = () => {
    router.replace('/(tabs)'); // Go back to index.tsx (TimerScreen)
  };

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
            {functions.formatTimeAsSentence(fullDuration)}!
          </Text>
        </View>

        {/* Give Up Button */}
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
