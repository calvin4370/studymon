import { View, Image, ImageSourcePropType } from "react-native";
import React from "react";

interface AvatarProps {
  source: ImageSourcePropType;
}

const Avatar = ({ source }: AvatarProps) => {
  return (
    <View>
      <Image source={source} className="" />
    </View>
  );
};

export default Avatar;
