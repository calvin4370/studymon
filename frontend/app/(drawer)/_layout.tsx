import React from 'react'
import {GestureHandlerRootView} from "react-native-gesture-handler";
import CustomDrawer from "@/components/CustomDrawer";

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CustomDrawer />
    </GestureHandlerRootView>
  )
}
export default DrawerLayout
