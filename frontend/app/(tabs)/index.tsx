import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// For now this is the Timer Screen
export default function Index() {
  return (
    <SafeAreaView className='flex-1 bg-primary items-center'>
      <StatusBar style='dark' />
      <View className='flex-1 justify-center'>
        <Text className='flex-1 text-text text-[36px] font-extrabold'>
          StudyMon
        </Text>
      </View>
    </SafeAreaView>
  );
}
