<<<<<<< HEAD
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomDrawer from '@/components/CustomDrawer';
=======
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomDrawer from "@/components/CustomDrawer";
>>>>>>> 93ae8c8757060ffd4a58d90eba98091e1cabf8bd

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CustomDrawer />
    </GestureHandlerRootView>
  );
};
export default DrawerLayout;
