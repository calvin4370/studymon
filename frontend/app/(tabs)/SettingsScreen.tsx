import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const SettingsScreen = () => {

  // Log Out
  const router = useRouter();

  const handleLogOut = () => {
    console.log('Logged Out!')
    router.replace('/LoginScreen');
  };

  return (
    <SafeAreaView className='flex-1 bg-primary items-center justify-center'>
      <View className=''>
        <Text className='text-text text-5xl'>To Be Done</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleLogOut()}
        className='w-[200px] h-[70px] bg-accent rounded-full justify-center items-center shadow-lg border-2 border-accent-1 active:opacity-75 mb-[100px]'
      >
        <Text className='text-text text-[24px] font-bold'>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SettingsScreen;
