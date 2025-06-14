import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import HeaderBar from '@/components/HeaderBar';
import Avatar from '@/components/Avatar';
import images from '@/constants/images';

const ProfileScreen = () => {
  // Calculate the usable width inside the safe area
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const usableWidth = windowWidth - insets.left - insets.right;
  const xPadding = 30;

  const handleStatisticsPress = () => {
    alert("This will link to the User's statistics page");
  };
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
          alignItems: 'center',
        }}
      >
        {/* Profile Avatar */}
        <View className='mt-[50px]'>
          <TouchableOpacity
            onPress={() =>
              alert('This will allow User to change their profile picture')
            }
            activeOpacity={0.85}
          >
            <Avatar source={images.timerActive} />
          </TouchableOpacity>
          <Text className='text-text text-[32px] font-bold self-center mt-[16px]'>
            Username
          </Text>
          <Text className='text-text text-[20px] font-medium self-center'>
            Email
          </Text>
        </View>

        {/* Basic User Stats */}
        {/* Placeholder for now */}
        <TouchableOpacity
          onPress={() => alert('TODO')}
          style={{ width: usableWidth - xPadding * 2, height: 200 }}
          className='bg-accent rounded-[32px] self-center shadow-lg active:opacity-85 mt-[26px] p-[20px]'
          activeOpacity={0.75}
        >
          <Text className='text-background text-[22px] font-semibold'>
            Basic User Stats
          </Text>
          <Text className='text-background text-[16px] font-medium mt-[10px]'>
            Time Spent Focused: 0h
          </Text>
          <Text className='text-background text-[16px] font-medium mt-[10px]'>
            Collection: {'(0 / 151)'}
          </Text>
        </TouchableOpacity>

        {/* Statistics */}
        {/* Placeholder for now */}
        <TouchableOpacity
          onPress={() => handleStatisticsPress()}
          activeOpacity={0.85}
        >
          <Image source={images.statisticsPlaceholder} className='mt-[36px]' />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
