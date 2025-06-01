import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import colors from '@/constants/colors';
import icons from '@/constants/icons';
import images from '@/constants/images';

export default function Index() {
  return (
    <SafeAreaView className='flex-1 bg-background items-center'>
      <StatusBar style='dark' backgroundColor={colors.primary} />

      {/* Top Banner */}
      <View className='w-full flex-row bg-primary px-4 py-2 items-center justify-between shadow-md h-[64px] mb-[100px]'>
        <TouchableOpacity onPress={() => console.log('Menu icon pressed!')}>
          <Image
            source={icons.menu} // Use your imported menu icon
            className='m-2 w-6 h-6'
            style={{ tintColor: colors.text }}
            resizeMode='contain'
          />
        </TouchableOpacity>

        <Text className='flex-1 text-text text-[26px] font-extrabold align'>
          StudyMon
        </Text>
      </View>

      {/* Main Content */}
      <View className="flex-1 justify-around items-center p-6">
        {/* Pan Handle Timer */}
        <View className='items-center'>
          <Image source={images.timerPlaceholder} />
        </View>

        {/* Timer Display */}
        <View className='items-center'>
          <Text className='text-text text-[80px] font-extrabold'>
            12:34
          </Text>
        </View>

        {/* Start Button */}
        <TouchableOpacity
          onPress={() => console.log('Start Button Pressed!')}
          className='w-[180px] h-[60px] bg-primary rounded-full justify-center items-center shadow-lg border-2 border-accent-1 active:opacity-75 mb-[100px]'
        >
          <Text className='text-text text-[24px] font-bold'>Start</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
