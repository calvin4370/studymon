import { View, ScrollView, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderBar from '@/components/HeaderBar';
import Avatar from '@/components/Avatar';
import images from '@/constants/images';

const ProfileScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-background items-center justify-start'>
      <View>
        <HeaderBar />
      </View>

      <ScrollView
        className='flex-1'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10,
          alignItems: 'center'
        }}
      >
        {/* Profile Avatar */}
        <View className='mt-[50px]'>
          <Avatar source={images.timerActive} />
          <Text className='text-text text-[32px] font-bold self-center mt-[16px]'>
            Username
          </Text>
          <Text className='text-text text-[20px] font-medium self-center'>
            Email
          </Text>
        </View>

        {/* Statistics */}
        {/* Placeholder for now */}
        <Image source={images.statisticsPlaceholder} className='mt-[36px]' />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
