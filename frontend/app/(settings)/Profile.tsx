import { View, Text } from 'react-native';
import React from 'react';
import IconButtonTwoRows from '@/components/IconButtonTwoRows';
import { useRouter } from 'expo-router';

const Profile = () => {
  const router = useRouter();
  const onBackButtonPress = () => {
    router.push('/(drawer)/(tabs)/SettingsScreen')
  }

  return (
    <View className='flex-1 p-[20px]'>
      <IconButtonTwoRows onButtonPress={onBackButtonPress} row1='Back to' row2='Settings' />
      <Text>Profile</Text>
    </View>
  );
};
export default Profile;
