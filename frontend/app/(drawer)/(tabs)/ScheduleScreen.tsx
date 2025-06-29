import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type Task = {
  day: string;
  title: string;
  description: string;
  // deadline removed
};

const ScheduleScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params?.newTask && typeof params.newTask === "string") {
      try {
        const newTask: Task = JSON.parse(params.newTask);
        setTasks((prev) => [...prev, newTask]);
        router.setParams({ newTask: undefined });
      } catch {}
    }
  }, [params?.newTask, router]);

  return (
    <View className="flex-1 bg-background px-4 pt-4">
      <Text className="text-[28px] font-extrabold text-text mb-4">Schedule</Text>
      <ScrollView className="flex-1">
        {days.map((day) => (
          <View key={day} className="mb-6">
            <Text className="font-bold text-lg text-text mb-2">{day}</Text>
            {tasks.filter((t) => t.day === day).length === 0 ? (
              <Text className="ml-2 text-gray-400">No tasks</Text>
            ) : (
              tasks
                .filter((t) => t.day === day)
                .map((task, idx) => (
                  <View
                    key={idx}
                    className="ml-2 mb-3 p-4 border border-gray-200 rounded-2xl bg-white shadow-sm"
                  >
                    <Text className="font-semibold text-accent text-base mb-1">{task.title}</Text>
                    <Text className="text-gray-700">{task.description}</Text>
                  </View>
                ))
            )}
          </View>
        ))}
      </ScrollView>
      <View className="pb-12">
        <TouchableOpacity
          onPress={() => router.push("/(drawer)/(tabs)/AddTaskScreen")}
          className="bg-accent py-4 rounded-xl items-center mb-8 mx-2"
          activeOpacity={0.85}
        >
          <Text className="font-bold text-xl text-white">Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScheduleScreen;