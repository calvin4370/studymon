import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import colors from "@/constants/colors";

const HeaderBar = () => {
  return (
    <View className="w-full flex-row bg-primary px-4 py-2 items-center justify-between shadow-md h-[64px]">
      <TouchableOpacity
        onPress={() =>
          alert(
            "This will open a selection for Users to access their Friends, Achievements, Shop etc",
          )
        }
      >
        <Image
          source={icons.menu} // Use your imported menu icon
          className="m-2 w-6 h-6"
          style={{ tintColor: colors.text }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text className="flex-1 text-text text-[26px] font-extrabold align">
        StudyMon
      </Text>
    </View>
  );
};

export default HeaderBar;
