import { View, Image, ImageSourcePropType } from "react-native";
import React from "react";

interface AvatarProps {
  source: ImageSourcePropType;
  size?: number; // Optional size prop, default 70
  className?: string;
}

const Avatar = ({ source, size = 70, className = "" }: AvatarProps) => {
  // expects class names like w-[70px] h-[70px]
  const sizeClass = `w-[${size}px] h-[${size}px] rounded-full border-4 border-[#226B7A]`;

  return (
    <View>
      <Image
        source={source}
        className={`${sizeClass} ${className}`}
        resizeMode="cover"
      />
    </View>
  );
};

export default Avatar;