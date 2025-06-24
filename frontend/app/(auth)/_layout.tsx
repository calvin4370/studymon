import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen name="SignUpScreen" options={{ presentation: "modal" }} />
      {/* Add other auth-related screens here if any */}
    </Stack>
  );
};

export default AuthLayout;
