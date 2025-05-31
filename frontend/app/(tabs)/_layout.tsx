import { Tabs } from 'expo-router';
import React from 'react';
import icons from '@/constants/icons';
import TabIcon from '@/components/TabIcon';

const _layout = () => {
  return (
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
          backgroundColor: '#0F0D23',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#0F0D23',
        },
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name='ProfileScreen'
        options={{
          title: 'ProfileScreen',
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
            <TabIcon focused={focused} icon={icons.cards} title='Collection' />
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
            <TabIcon focused={focused} icon={icons.calendar} title='Schedule' />
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
  );
};

export default _layout;
