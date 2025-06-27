import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="Profile" options={{ headerShown: true }} />
      <Stack.Screen name="Privacy" options={{ headerShown: true }} />
      <Stack.Screen name="Notifications" options={{ headerShown: true }} />
      <Stack.Screen name="Help" options={{ headerShown: true }} />
    </Stack>
  );
}