import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import colors from '@/constants/colors';
import HeaderBar from '@/components/HeaderBar';
import TimerDisplay from '@/components/TimerDisplay';
import images from '@/constants/images';

export default function Index() {
  const router = useRouter();

  const handleTimerStart = () => {
    console.log('Timer Start Button Pressed!');
    router.push('/TimerActive');
  };

  return (
    <SafeAreaView className='flex-1 bg-background items-center'>
      <StatusBar style='dark' backgroundColor={colors.primary} />

      {/* Top Banner */}
      <HeaderBar />

      {/* Main Content */}
      <View className='flex-1 items-center p-6 mt-[100px]'>
        {/* Pan Handle Timer */}
        <View className='items-center mt-[10px]'>
          <Image source={images.timerPlaceholder} />
        </View>

        {/* Timer Display */}
        <View className='items-center mt-[10px]'>
          <TimerDisplay seconds={3600} />
        </View>

        {/* Start Button */}
        <TouchableOpacity
          onPress={handleTimerStart}
          className='w-[180px] h-[60px] bg-primary rounded-full justify-center items-center shadow-lg border-2 border-accent-1 active:opacity-75 mt-[50px]'
        >
          <Text className='text-text text-[24px] font-bold'>Start</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
