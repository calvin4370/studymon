import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AddTaskScreen() {
  const [open, setOpen] = useState(false); // <-- Add this line
  const [day, setDay] = useState(days[0]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleAddTask = () => {
    const newTask = { day, title, description };
    router.push({
      pathname: "/(drawer)/(tabs)/ScheduleScreen",
      params: { newTask: JSON.stringify(newTask) },
    });
  };

  const handleCancel = () => {
    router.push("/(drawer)/(tabs)/ScheduleScreen");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background px-4 pt-4"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text className="text-[28px] font-extrabold text-text mb-4">Add Task</Text>

      {/* Dropdown at the top */}
      <View className="mb-6 z-10">
        <Text className="font-semibold text-text mb-2">Day</Text>
        <DropDownPicker
          open={open}
          value={day}
          items={days.map((d) => ({ label: d, value: d }))}
          setOpen={setOpen}
          setValue={setDay}
          containerStyle={{ height: 40 }}
          style={{
            borderRadius: 12,
            borderColor: "#e5e7eb",
            backgroundColor: "#fff",
            minHeight: 40,
          }}
          dropDownContainerStyle={{
            borderRadius: 12,
            borderColor: "#e5e7eb",
          }}
          textStyle={{
            fontSize: 16,
            color: "#22223b",
          }}
          placeholder="Select a day"
        />
      </View>

      <View className="mb-4">
        <Text className="mb-2 font-semibold text-text">Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          className="bg-white border border-gray-200 rounded-xl p-3 text-base"
          placeholder="Enter task title"
          placeholderTextColor="#A0A0A0"
        />
      </View>

      <View className="mb-4">
        <Text className="mb-2 font-semibold text-text">Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          className="bg-white border border-gray-200 rounded-xl p-3 text-base"
          placeholder="Enter task description"
          placeholderTextColor="#A0A0A0"
          multiline
          numberOfLines={3}
        />
      </View>

      <View className="my-8">
        <TouchableOpacity
          onPress={handleAddTask}
          className="bg-accent py-4 rounded-xl items-center mb-3 mx-2"
          activeOpacity={0.85}
        >
          <Text className="font-bold text-xl text-white">Add Task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCancel}
          className="bg-gray-200 py-4 rounded-xl items-center mx-2"
          activeOpacity={0.7}
        >
          <Text className="font-bold text-xl text-gray-500">Cancel</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}