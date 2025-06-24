import { Stack } from "expo-router";
import "./global.css";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthGate from "@/components/AuthGate";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(settings)" options={{ headerShown: false }} />
          <Stack.Screen name="TimerActive" options={{ headerShown: false }} />
          <Stack.Screen name="TimerComplete" options={{ headerShown: false }} />
        </Stack>
      </AuthGate>
    </AuthProvider>
  );
}
