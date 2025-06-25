import { Text } from 'react-native';
import React from 'react';
import { Drawer } from 'expo-router/drawer';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

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
        drawerStyle: {
          backgroundColor: colors.primary,
          width: 200,
        },
        drawerType: 'front',
        drawerLabelStyle: {
          color: colors.text,
          fontSize: 12,
          fontWeight: 'bold',
        },
        drawerContentContainerStyle: {
          paddingTop: 105,
        },
      }}
    >
      <Drawer.Screen
        name='(tabs)'
        options={{
          title: 'Home',
          drawerIcon: () => (
            <Ionicons name='home' size={24} color={colors.text} />
          ),
        }}
      />
      <Drawer.Screen
        name='StoreScreen'
        options={{
          title: 'Store',
          drawerIcon: () => (
            <Ionicons name='cart' size={24} color={colors.text} />
          ),
        }}
      />
      <Drawer.Screen
        name='FriendsScreen'
        options={{
          title: 'Friends',
          drawerIcon: () => (
            <Ionicons name='people' size={24} color={colors.text} />
          ),
        }}
      />
      <Drawer.Screen
        name='AchievementsScreen'
        options={{
          title: 'Achievements',
          drawerIcon: () => (
            <Ionicons name='trophy' size={24} color={colors.text} />
          ),
        }}
      />
    </Drawer>
  );
};
export default CustomDrawer;
