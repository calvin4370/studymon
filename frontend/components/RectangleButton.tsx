import {
  View,
  Text,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';
import React from 'react';
import colors from '@/constants/colors';

interface RectangleButtonProps {
  className?: string;
  onButtonPress?: (event: GestureResponderEvent) => void | undefined;
  icon: ImageSourcePropType;
  label?: string;
  height?: number;
}

const RectangleButton = ({
  className = '',
  onButtonPress,
  icon,
  label,
  height = 50
}: RectangleButtonProps) => {
  // Calculate Window Dimensions
  const windowWidth = Dimensions.get('window').width;
  // const windowHeight = Dimensions.get('window').height
  const rectangleButtonWidth = (windowWidth - 20 * 2 - 10) / 2;

  return (
    <TouchableOpacity onPress={onButtonPress} activeOpacity={0.7}>
      <View
        className={`flex-row bg-accent-1 border-[2px] items-center justify-center border-primary rounded-full gap-[10px] ${className}`}
        style={[
          {
            width: rectangleButtonWidth,
            height: height, 
          },
        ]}
      >
        <Image
          source={icon}
          className='w-[24px] h-[24px]'
          tintColor={colors.background}
        />
        <Text className='font-semibold text-background-1 text-[16px]'>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RectangleButton;
