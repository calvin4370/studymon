import { View, Text, Image } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import colors from "@/constants/colors";

interface CollectionCountPillProps {
  collectionCount?: number;
}

const CollectionCountPill = ({
  collectionCount = 0,
}: CollectionCountPillProps) => {
  return (
    <View className="flex-row w-[119px] h-[34px] bg-background border-[3px] items-center justify-center border-primary rounded-[20px] px-[18px] py-[7px]">
      <Image
        source={icons.cards}
        tintColor={colors.text}
        className="w-[18px] h-[19px]"
      />
      <Text className="text-text font-bold text-[16px]/[17px] ml-[8px]">
        {collectionCount} / 212
      </Text>
    </View>
  );
};

export default CollectionCountPill;
