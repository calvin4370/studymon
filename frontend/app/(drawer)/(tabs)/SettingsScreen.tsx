import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { signOut } from "@firebase/auth";
import { FIREBASE_AUTH } from "@/firebaseConfig";

const SettingsScreen = () => {
  // Log Out
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route); // Placeholder route
  };

  const handleLogOut = async () => {
    try {
      const response = await signOut(FIREBASE_AUTH);
      console.log("Logout successful:", response);
      router.replace("/(auth)/LoginScreen");
    } catch (error: any) {
      console.error("Logout error:", error);
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <View className="flex-1 bg-background items-center justify-start">
      <View className="flex-1 w-full items-center justify-start mt-10">
        {[
          { label: "Profile Settings", route: "/(settings)/Profile" },
          { label: "Privacy & Security", route: "/(settings)/Privacy" },
          { label: "Notifications", route: "/(settings)/Notifications" },
          { label: "Help", route: "/(settings)/Help" },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            onPress={() => handleNavigate(item.route)}
            className="w-[85%] py-4 my-2 bg-background border border-gray-400 rounded-xl items-center"
            activeOpacity={0.7}
          >
            <Text className="text-black text-lg font-bold">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => handleLogOut()}
        className="w-[200px] h-[70px] bg-accent rounded-full justify-center items-center shadow-lg border-2 border-accent-1 active:opacity-75 mb-[100px]"
      >
        <Text className="text-text text-[24px] font-bold">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
