import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScheduleScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-primary items-center'>
      <View className='flex-1 justify-center'>
        <Text
          className='text-text text-5xl'
        >
          To Be Done
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ScheduleScreen;