import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';
import ThemedTextInput from '@/components/ThemedTextInput';
import images from '@/constants/images';

const LoginScreen = () => {
  // Calculate the usable width inside the safe area
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const usableWidth = windowWidth - insets.left - insets.right;
  const xPadding = 60;

  // Email and Password ThemedTextInputs
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Log In Button
  const router = useRouter();
  const handleLogIn = () => {
    console.log(
      `Log In Button Pressed with email: ${emailInput || 'BLANK'} and password: ${passwordInput || 'BLANK'}`
    );
    // TODO: Add User Auth
  };

  // Sign Up Button
  const handleSignIn = () => {
    console.log('Sign In Button Pressed!');
    router.push('/SignUpScreen');
    // TODO: Finish Sign Up Screen and backend user auth
  };

  return (
    <SafeAreaView className='flex-1 bg-primary items-center'>
      {/* StudyMon Logo */}
      <View className='items-center mb-[30px] pt-[40px]'>
        <Image source={images.studymonLogo} />
        <Text className='text-text text-[32px] font-extrabold'>StudyMon</Text>
      </View>

      {/* Logout Box */}
      <View
        className='bg-background rounded-[20px] shadow-lg px-[24px] py-[16px]'
        style={{ width: usableWidth - 60 }}
      >
        <Text className='text-text text-[16px] font-bold mb-[12px]'>Email</Text>
        <ThemedTextInput
          placeholder='Enter your email'
          value={emailInput}
          onChangeText={(text: string) => setEmailInput(text)}
        />
        <Text className='text-text text-[16px] font-bold mb-[12px]'>Password</Text>
        <ThemedTextInput
          placeholder='Enter your password'
          value={passwordInput}
          onChangeText={(text: string) => setPasswordInput(text)}
        />

        {/* Log In Button */}
        <TouchableOpacity
          onPress={() => handleLogIn()}
          style={{ width: usableWidth - xPadding * 2, height: 64 }}
          className='bg-accent rounded-full justify-center items-center self-center shadow-lg active:opacity-75'
        >
          <Text className='text-background text-[22px] font-semibold'>
            Log In
          </Text>
        </TouchableOpacity>
      </View>

      {/* For Sign Up */}
      <View className='flex-row mt-[40px]'>
        <Text className='text-text text-semibold '>
          Don&lsquo;t have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => handleSignIn()}>
          <Text className='text-accent text-semibold '>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
