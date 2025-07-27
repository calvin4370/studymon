import { Text, View, Image } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";
import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CoinsPill from "./CoinsPill";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import icons from "@/constants/icons";

const CustomDrawer = () => {
  const userId = FIREBASE_AUTH.currentUser?.uid || null;

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.text,
        headerTitleAlign: "left",
        headerTitle: () => (
          <View className="flex-row items-center w-full h-full">
            <View className="flex-1 items-center">
              <Text className="text-text text-[25px] font-extrabold pl-10">
                StudyMon
              </Text>
            </View>
            <View className="justify-end ml-auto">
              {userId ? <CoinsPill userId={userId} /> : null}
            </View>
          </View>
        ),
        drawerStyle: {
          backgroundColor: colors.primary,
          width: 210,
        },
        drawerType: "front",
        drawerLabelStyle: {
          color: colors.text,
          fontSize: 14,
          fontWeight: "bold",
        },
        drawerContentContainerStyle: {
          paddingTop: 105,
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Home",
          drawerIcon: () => (
            <Ionicons name="home" size={24} color={colors.text} />
          ),
        }}
      />
      <Drawer.Screen
        name="PackOpeningScreen"
        options={{
          title: "Open Packs",
          drawerIcon: () => (
            <Image
              source={icons.cards}
              className="w-[24px] h-[24px]"
              tintColor={colors.text}
              width={24}
              height={24}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="StoreScreen"
        options={{
          title: "Store",
          drawerIcon: () => (
            <Ionicons name="cart" size={24} color={colors.text} />
          ),
        }}
      />
      <Drawer.Screen
        name="FriendsScreen"
        options={{
          title: "Friends",
          drawerIcon: () => (
            <Ionicons name="people" size={24} color={colors.text} />
          ),
        }}
      />
      <Drawer.Screen
        name="AchievementsScreen"
        options={{
          title: "Achievements",
          drawerIcon: () => (
            <Ionicons name="trophy" size={24} color={colors.text} />
          ),
        }}
      />
      <Drawer.Screen
        name="(scheduleScreens)" // Ignore all Screens in (modals)
        options={{
          drawerLabel: () => null,
        name="FriendProfileScreen"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
};
export default CustomDrawer;
