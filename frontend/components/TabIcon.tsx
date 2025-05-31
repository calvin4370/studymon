import images from '@/constants/images';
import colors from '@/constants/colors'
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Text,
  View,
} from 'react-native';

interface TabIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

const TabIcon = ({ focused, icon, title }: TabIconProps) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlightPill}
        className='flex flex-row w-full flex-1 min-w-[112px]
        min-h-16 mt-4 justify-center items-center rounded-full
        overflow-hidden'
      >
        <Image source={icon} tintColor={colors.text} className='size-6' />
        <Text className='text-text text-[12px] font-semibold ml-1'>
          {title}
        </Text>
      </ImageBackground>
    );
  } else {
    return (
      <View
        className='size-full justify-center items-center mt-4 
      rounded-full'
      >
        <Image source={icon} tintColor={colors.accentLight} className='size-6' />
      </View>
    );
  }
};

export default TabIcon;
