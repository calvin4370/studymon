import {
  View,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import NumOwnedPill from "@/components/NumOwnedPill";

interface PackCardProps {
  numOwned: number;
  onPackPress: (event: GestureResponderEvent) => void | undefined;
}

const PackCard = ({ numOwned, onPackPress }: PackCardProps) => {
  const imageSource = require("@/assets/images/packs-images/basic-pack.png"); // Only standard pack for now

  return (
    <View className="items-center">
      <TouchableOpacity onPress={onPackPress}>
        <Image
          source={imageSource}
          className="w-[126px] h-[176px]"
          width={126}
          height={176}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <NumOwnedPill numOwned={numOwned} />
    </View>
  );
};

export default PackCard;
