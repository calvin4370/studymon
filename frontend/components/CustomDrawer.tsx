import { Text, View } from 'react-native';
import React from 'react';
import { Drawer } from 'expo-router/drawer';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import CoinsPill from './CoinsPill';

const CustomDrawer = () => {
  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.text,
        headerTitleAlign: 'left',
        headerTitle: () => (
          <View className='flex-row items-center w-full h-full'>
            <View className='flex-1 items-center'>
              <Text className='text-text text-[25px] font-extrabold'>
                StudyMon
              </Text>
            </View>
            <View className='justify-end ml-auto' >
              <CoinsPill />
            </View>

          </View>
        ),
        drawerStyle: {
          backgroundColor: colors.primary,
          width: 210,
        },
        drawerType: 'front',
        drawerLabelStyle: {
          color: colors.text,
          fontSize: 14,
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
