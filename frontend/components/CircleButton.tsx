import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

interface CircleButtonProps {
  className?: string;
  imageClassName?: string;
  imageSource: ImageSourcePropType;
  tintColor?: string;
  width: number;
  height: number;
  onCircleButtonPress?: (event: GestureResponderEvent) => void | undefined;
}

const CircleButton = ({
  className = '',
  imageClassName = '',
  imageSource,
  tintColor,
  width,
  height,
  onCircleButtonPress,
}: CircleButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onCircleButtonPress}
      activeOpacity={0.7}
      className={`flex-row bg-background border-[3px] items-center justify-center border-primary rounded-full ${className}`}
      style={[{
        width: width,
        height: height
      }]}
    >
      <Image source={imageSource} tintColor={tintColor} className={`${imageClassName}`} />
    </TouchableOpacity>
  );
};

export default CircleButton;
