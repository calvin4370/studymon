import CollectionCountPill from "@/components/CollectionCountPill";
import { View, Text } from "react-native";

const CollectionScreen = () => {
  return (
    <View className="flex-1 bg-background mt-[20px] mx-[20px]">
      <CollectionCountPill />
      <View className="items-center border-red-500 border-[2px]">
        <Text className="text-text text-[48px] font-bold">To Be Done</Text>
      </View>
    </View>
  );
};

export default CollectionScreen;
