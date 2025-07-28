import { FlatList, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import RectangleButton from '@/components/RectangleButton';
import icons from '@/constants/icons';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '@/firebaseConfig';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import TaskCard from '@/components/TaskCard';
import EventCard from '@/components/EventCard';

const ScheduleScreen = () => {
  // Handle Button Presses
  const handleAddTaskButtonPress = () => {
    router.push('../(scheduleScreens)/AddTaskScreen');
  };

  const handleAddEventButtonPress = () => {
    // router.push('../(scheduleScreens)/AddEventScreen');
    router.push('../(scheduleScreens)/AddEventScreen');
  };

  // States
  const [tasks, setTasks] = useState<any[]>([]); // Quickfix, Figure out what to do with the any type later
  const [events, setEvents] = useState<any[]>([]); // Quickfix, Figure out what to do with the any type later

  // Read user's Tasks and Events from firestore
  useEffect(() => {
    const userId = FIREBASE_AUTH.currentUser?.uid;

    if (!userId) {
      console.error()
      return
    }
    
    const tasksRef = collection(FIREBASE_DATABASE, 'users', userId, 'tasks');
    const tasksQuery = query(tasksRef, orderBy('importance', 'desc'));

    // Set up real-time listener
    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id, // Get the Firestore document ID for keyExtractor
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    }, (err) => {
      console.error('Error fetching tasks:', err);
    });

    // Cleanup function: Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const userId = FIREBASE_AUTH.currentUser?.uid;

    if (!userId) {
      console.error()
      return
    }
    
    const eventsRef = collection(FIREBASE_DATABASE, 'users', userId, 'events');
    const eventsQuery = query(eventsRef, orderBy('createdAt', 'desc'));

    // Set up real-time listener
    const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
      const fetchedEvents = snapshot.docs.map((doc) => ({
        id: doc.id, // Get the Firestore document ID for keyExtractor
        ...doc.data(),
      }));
      setEvents(fetchedEvents);
    }, (err) => {
      console.error('Error fetching evens:', err);
    });

    // Cleanup function: Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <View className='flex-1'>
      {/* Main Schedule Content */}
      <View className='flex-1 p-[20px]'>
        <View className='flex-1'>
          {/* Calendar Overview (But now currently just events overview)*/}
          <View className='h-[300px]'>
            <Text className='font-bold text-accent text-[28px] pb-[10px]'>
              Upcoming Events
            </Text>
            <FlatList
              data={events}
              renderItem={({ item }) => <EventCard {...item}/>}
              keyExtractor={(item) => item.id}
            />
          </View>

          {/* Upcoming Tasks/Events Overview */}
          <View className='h-[300px]'>
            <Text className='font-bold text-accent text-[28px] pb-[10px]'>
              Upcoming Tasks
            </Text>
            <FlatList
              data={tasks}
              renderItem={({ item }) => <TaskCard {...item}/>}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </View>

      {/* Add Task/Event Buttons */}
      <View className='flex-row px-[20px] gap-[10px] pb-[75px]'>
        {/* Add Task Button */}
        <RectangleButton
          onButtonPress={handleAddTaskButtonPress}
          icon={icons.news}
          label='Add Task'
        />

        {/* Add Event Button */}
        <RectangleButton
          onButtonPress={handleAddEventButtonPress}
          icon={icons.calendar}
          label='Add Event'
        />
      </View>
    </View>
  );
};

export default ScheduleScreen;
