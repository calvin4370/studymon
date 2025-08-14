import { FlatList, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import RectangleButton from '@/components/RectangleButton';
import icons from '@/constants/icons';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '@/firebaseConfig';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import TaskCard from '@/components/TaskCard';
import EventCard from '@/components/EventCard';
import utils from '@/constants/utils';
import { Task } from '@/interfaces/interfaces';

const ScheduleScreen = () => {
  const userId = FIREBASE_AUTH.currentUser?.uid;

  // Handle Button Presses
  const handleAddTaskButtonPress = () => {
    router.push('../(scheduleScreens)/AddTaskScreen');
  };

  const handleAddEventButtonPress = () => {
    // router.push('../(scheduleScreens)/AddEventScreen');
    router.push('../(scheduleScreens)/AddEventScreen');
  };

  const handleEventCardPress = (eventId: string) => {
    // Unexpanded the previously expanded EventCard if expanded, and if a new EventCard is pressed, expand that one
    setExpandedEventId((prevId) => (prevId === eventId ? null : eventId));
  };

  // EventCard Buttons
  const handleDeleteEvent = async (eventId: string) => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    try {
      const eventDocRef = doc(FIREBASE_DATABASE, 'users', userId, 'events', eventId);
      await deleteDoc(eventDocRef);
      console.log('Event deleted');
    } catch (error) {
      console.error('Failed to delete event; Error:', error);
    }
  }

  const handleTaskCardPress = (taskId: string) => {
    // Unexpanded the previously expanded TaskCard if expanded, and if a new TaskCard is pressed, expand that one
    setExpandedTaskId((prevId) => (prevId === taskId ? null : taskId));
  };

  // TaskCard Buttons
  const handleDeleteTask = async (taskId: string) => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    try {
      const taskDocRef = doc(FIREBASE_DATABASE, 'users', userId, 'tasks', taskId);
      await deleteDoc(taskDocRef);
      console.log('Task deleted');
    } catch (error) {
      console.error('Failed to delete task; Error:', error);
    }
  }

  // States
  const [tasks, setTasks] = useState<any[]>([]); // Quickfix, Figure out what to do with the any type later
  const [events, setEvents] = useState<any[]>([]); // Quickfix, Figure out what to do with the any type later
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  // Read user's Tasks and Events from firestore
  useEffect(() => {
    const userId = FIREBASE_AUTH.currentUser?.uid;

    if (!userId) {
      console.error();
      return;
    }

    const tasksRef = collection(FIREBASE_DATABASE, 'users', userId, 'tasks');
    const tasksQuery = query(tasksRef);

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      tasksQuery,
      (snapshot) => {
        const fetchedTasks = snapshot.docs.map((doc) => ({
          id: doc.id, // Get the Firestore document ID for keyExtractor
          ...doc.data(),
        })) as Task[];

        // Sort tasks according to StudyMon Algorithm
        const sortedTasks = [...fetchedTasks].sort(
          utils.taskPriorityComparator
        );

        setTasks(sortedTasks);
      },
      (err) => {
        console.error('Error fetching tasks:', err);
      }
    );

    // Cleanup function: Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const userId = FIREBASE_AUTH.currentUser?.uid;

    if (!userId) {
      console.error();
      return;
    }

    const eventsRef = collection(FIREBASE_DATABASE, 'users', userId, 'events');
    const eventsQuery = query(eventsRef, orderBy('startDate', 'asc'));

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      eventsQuery,
      (snapshot) => {
        const fetchedEvents = snapshot.docs.map((doc) => ({
          id: doc.id, // Get the Firestore document ID for keyExtractor
          ...doc.data(),
        }));
        setEvents(fetchedEvents);
      },
      (err) => {
        console.error('Error fetching events:', err);
      }
    );

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
              renderItem={({ item }) => (
                <EventCard
                  event={item}
                  onPress={handleEventCardPress}
                  isExpanded={item.id === expandedEventId}
                  handleDeleteEvent={handleDeleteEvent}
                />
              )}
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
              renderItem={({ item }) => (
                <TaskCard
                  task={item}
                  onPress={handleTaskCardPress}
                  isExpanded={item.id === expandedTaskId}
                  handleDeleteTask={handleDeleteTask}
                />
              )}
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
