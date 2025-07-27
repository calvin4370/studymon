import { Stack } from 'expo-router';

export default function ScheduleScreensLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="AddTaskScreen" />
      <Stack.Screen name="AddEventScreen" />
    </Stack>
  );
}