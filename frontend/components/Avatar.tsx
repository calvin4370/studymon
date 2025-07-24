import { View, Image, ImageSourcePropType } from "react-native";
import React from "react";

interface AvatarProps {
  source: ImageSourcePropType;
}

const Avatar = ({ source }: AvatarProps) => {
  return (
    <View>
      <Image
        source={source}
        className="w-[210px] h-[210px] rounded-full border-4 border-[#226B7A]"
        resizeMode={"cover"}
      />
    </View>
  );
};

export default Avatar;
