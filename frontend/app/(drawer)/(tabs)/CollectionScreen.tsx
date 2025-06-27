import CollectionOverview from '@/components/CollectionOverview';
import { View, Text, ScrollView } from 'react-native';

// Read Firestore to get user's collection
const cards = [];
const collectionCount = cards.length;

const CollectionScreen = () => {
  return (
    <ScrollView className='bg-background mt-[20px] mx-[20px]'>
      <CollectionOverview className='mb-[20px]' />
      
      {/* Show collection under overview */}
      {(collectionCount > 0) ? (
        <></>
      ) : (
        // User has no cards owned
        <View className='flex-1 justify-center items-center mt-[180px]'>
          <Text className='text-text font-medium text-[32px]'>Open packs to</Text>
          <Text className='text-text font-medium text-[32px] mb-[100px]'>collect cards</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default CollectionScreen;
