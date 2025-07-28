import { FlatList, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import RectangleButton from '@/components/RectangleButton';
import icons from '@/constants/icons';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
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
      const fetchTaskData = async () => {
        try {
          // setLoadingTasks(true);
          // setErrorFetchingTasks(null);
  
          // Fetch user's tasks from users->userId->tasks subcollection
          const userId = FIREBASE_AUTH.currentUser?.uid;
          if (userId) {
            const tasksRef = collection(
              FIREBASE_DATABASE,
              'users',
              userId,
              'tasks'
            );
            const tasksSnap = await getDocs(tasksRef);
            const fetchedTasks = tasksSnap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setTasks(fetchedTasks);
          } else {
            console.warn('Cannot find userId for current user');
            setTasks([]);
          }
        } catch (error: any) {
          console.error('Error fetching card data:', error);
          // setErrorFetchingCards(
          //   `ERROR in loading cards: ${error.message || 'Unknown error'}`
          // );
        } finally {
          // setLoadingCards(false); // Stop loading animation
        }
      };
  
      fetchTaskData();
    }, []); // Dependency array empty so that this only runs once when component mounts

    useEffect(() => {
      const fetchEventData = async () => {
        try {
          // setLoadingEvents(true);
          // setErrorFetchingEvents(null);
  
          // Fetch user's eventss from users->userId->events subcollection
          const userId = FIREBASE_AUTH.currentUser?.uid;
          if (userId) {
            const eventsRef = collection(
              FIREBASE_DATABASE,
              'users',
              userId,
              'events'
            );
            const eventsSnap = await getDocs(eventsRef);
            const fetchedEvents = eventsSnap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setEvents(fetchedEvents);
          } else {
            console.warn('Cannot find userId for current user');
            setEvents([]);
          }
        } catch (error: any) {
          console.error('Error fetching event data:', error);
          // setErrorFetchingEvents(
          //   `ERROR in loading Events: ${error.message || 'Unknown error'}`
          // );
        } finally {
          // setLoadingEvents(false); // Stop loading animation
        }
      };
  
      fetchEventData();
    }, []); // Dependency array empty so that this only runs once when component mounts

  return (
    <View className='flex-1'>
      {/* Main Schedule Content */}
      <View className='flex-1 p-[20px]'>
        <View className='flex-1'>
          {/* Calendar Overview (But now currently just events overview)*/}
          <View className='h-[300px]'>
            <Text className='font-bold text-accent text-[28px] pb-[10px]'>Upcoming Events</Text>
            <FlatList data={events} renderItem={({item}) => (EventCard(item))} keyExtractor={(item) => item.id} />
          </View>

          {/* Upcoming Tasks/Events Overview */}
          <View className='h-[300px]'>
            <Text className='font-bold text-accent text-[28px] pb-[10px]'>Upcoming Tasks</Text>
            <FlatList data={tasks} renderItem={({item}) => (TaskCard(item))} keyExtractor={(item) => item.id} />
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
