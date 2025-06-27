import CollectionOverview from '@/components/CollectionOverview';
import { View, Text } from 'react-native';

// Read Firestore to get user's collection
const cards = [];

const CollectionScreen = () => {
  return (
    <View className='flex-1 bg-background mt-[20px] mx-[20px] rounded-[20px]'>
      <CollectionOverview />
      <View className='items-center border-red-500 border-[2px] mt-[20px]'>
        <Text className='text-text text-[48px] font-bold'>What the helly</Text>
      </View>
    </View>
  );
};

export default CollectionScreen;
