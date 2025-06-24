<<<<<<< HEAD
import CollectionCountPill from '@/components/CollectionCountPill';
import { View, Text } from 'react-native';

const CollectionScreen = () => {
  return (
    <View className='flex-1 bg-background mt-[20px] mx-[20px]'>
      <CollectionCountPill />
      <View className='items-center border-red-500 border-[2px]'>
        <Text className='text-text text-[48px] font-bold'>To Be Done</Text>
=======
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CollectionScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary items-center">
      <View className="flex-1 justify-center">
        <Text className="text-text text-5xl">To Be Done</Text>
>>>>>>> 93ae8c8757060ffd4a58d90eba98091e1cabf8bd
      </View>
      
    </View>
  );
};

export default CollectionScreen;
