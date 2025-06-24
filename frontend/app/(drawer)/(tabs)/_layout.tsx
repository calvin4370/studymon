import { Tabs } from 'expo-router';
import React from 'react';
import icons from '@/constants/icons';
import colors from '@/constants/colors';
import TabIcon from '@/components/TabIcon';
<<<<<<< HEAD:frontend/app/(tabs)/_layout.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderBar from '@/components/HeaderBar';
=======
import {SafeAreaView} from "react-native-safe-area-context";
>>>>>>> 19c1b73b7c9fee6170329f7a1c5feae7989fa417:frontend/app/(drawer)/(tabs)/_layout.tsx

const _layout = () => {
  return (
    <SafeAreaView className={'flex-1 bg-background'} edges={['bottom', 'left', 'right']}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarStyle: {
            backgroundColor: colors.text,
            borderRadius: 40,
            marginHorizontal: 20,
            marginBottom: 15,
            height: 52,
            position: 'absolute',
            overflow: 'hidden',
            borderWidth: 0, // hiding border for now
            borderColor: colors.accent,
          },
        }}
        initialRouteName='index' // Timer Screen
      >
        <Tabs.Screen
          name='ProfileScreen'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.person} title='Profile' />
            ),
          }}
        />
        <Tabs.Screen
          name='CollectionScreen'
          options={{
            title: 'Collection',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={icons.cards}
                title='Collection'
              />
            ),
          }}
        />
        <Tabs.Screen
          name='index'
          options={{
            title: 'Timer',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.clock} title='Timer' />
            ),
          }}
        />
        <Tabs.Screen
          name='ScheduleScreen'
          options={{
            title: 'Schedule',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={icons.calendar}
                title='Schedule'
              />
            ),
          }}
        />
        <Tabs.Screen
          name='SettingsScreen'
          options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.gear} title='Settings' />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default _layout;
