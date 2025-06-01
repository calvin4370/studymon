import { Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import colors from '@/constants/colors';
import HeaderBar from '@/components/HeaderBar';
import TimerDisplay from '@/components/TimerDisplay';
import ThemedTextInput from '@/components/ThemedTextInput';
import images from '@/constants/images';

export default function Index() {
  const router = useRouter();
  const [timerModalVisible, setTimerModalVisible] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(10); // Default timer to 30 minutes
  const [inputText, setInputText] = useState<string>('');

  const handleTimerStart = () => {
    console.log(`Timer started with ${timerSeconds} seconds`);
    router.push({
      pathname: '/TimerActive',
      params: { fullDuration: timerSeconds },
    });
  };

  const handleConfirm = () => {
    const inputMinutes = parseInt(inputText, 10);

    // Validate Input
    if (inputText === 'test') {
      setTimerSeconds(10);
    } else if (
      !isNaN(inputMinutes) &&
      inputMinutes >= 1 &&
      inputMinutes <= 180
    ) {
      setTimerSeconds(inputMinutes * 60);
    } else {
      alert('Input a number of minutes between 1 and 180');
    }
    setInputText(''); // Reset text for future input
    setTimerModalVisible(false);
  };

  const handleCancel = () => {
    setTimerModalVisible(false);
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
          <TouchableOpacity
            onPress={() =>
              alert(
                'This is meant to be an interactable pan handle component to adjust Timer'
              )
            }
            activeOpacity={0.85}
          >
            <Image source={images.timerPlaceholder} />
          </TouchableOpacity>
        </View>

        {/* Timer Display */}
        <TouchableOpacity
          onPress={() => setTimerModalVisible(true)}
          className='items-center mt-[10px]'
        >
          <TimerDisplay seconds={timerSeconds} />
        </TouchableOpacity>

        {/* Start Button */}
        <TouchableOpacity
          onPress={handleTimerStart}
          className='w-[180px] h-[60px] bg-primary rounded-full justify-center items-center shadow-lg border-2 border-accent-1 active:opacity-75 mt-[50px]'
        >
          <Text className='text-text text-[24px] font-bold'>Start</Text>
        </TouchableOpacity>
      </View>

      {/* Modal to prompt User for input */}
      <Modal
        visible={timerModalVisible}
        animationType='slide'
        presentationStyle='formSheet'
        onRequestClose={() => setTimerModalVisible(false)} // handles Android back button / IOS back gesture
      >
        <View className='bg-background items-center p-[60px]'>
          <Text className='text-text font-bold text-[32px]'>Input Time</Text>
          <Text className='text-text font-normal text-[32px] mb-[50px]'>
            {'(1-180 minutes)'}
          </Text>
          <ThemedTextInput
            placeholder='Enter minutes'
            value={inputText}
            onChangeText={(text: string) => setInputText(text)}
          />

          {/* Cancel and Confirm Buttons */}
          <View className='flex-row'>
            <TouchableOpacity
              onPress={handleCancel}
              className='w-[150px] h-[60px] bg-accent rounded-full justify-center items-center shadow-lg border-2 border-accent-2 active:opacity-75 mt-[50px]'
            >
              <Text className='text-accent-2 text-[24px] font-bold'>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleConfirm}
              className='w-[150px] h-[60px] bg-primary rounded-full justify-center items-center shadow-lg border-2 border-accent active:opacity-75 mt-[50px] ml-[40px]'
            >
              <Text className='text-accent text-[24px] font-bold'>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
