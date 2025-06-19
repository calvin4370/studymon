import {Text} from 'react-native'
import React from 'react'
import {Drawer} from "expo-router/drawer";
import colors from "@/constants/colors";

const CustomDrawer = () => {
  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.text,
        headerTitleAlign: 'center',
        headerTitle: () => (
          <Text className='flex-1 text-text text-[25px] font-extrabold align pt-1.5'>
            StudyMon
          </Text>
        ),
      }}
    >
      <Drawer.Screen name="(tabs)" options={{ title: 'Home' }} />
      <Drawer.Screen name="FriendsScreen" options={{ title: 'Friends' }} />
      <Drawer.Screen name="AchievementsScreen" options={{ title: 'Achievements' }} />
    </Drawer>
  )
}
export default CustomDrawer
