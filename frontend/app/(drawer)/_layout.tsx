import React from 'react'
import {Drawer} from "expo-router/drawer";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import HeaderBar from "@/components/HeaderBar";
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomDrawer from "@/components/CustomDrawer";

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CustomDrawer />
    </GestureHandlerRootView>
  )
}
export default DrawerLayout
