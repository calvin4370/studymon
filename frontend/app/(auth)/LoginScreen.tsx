import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import ThemedTextInput from "@/components/ThemedTextInput";
import images from "@/constants/images";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateUserDocForLogin } from "@/constants/utils";

const LoginScreen = () => {
  // Calculate the usable width inside the safe area
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get("window").width;
  const usableWidth = windowWidth - insets.left - insets.right;
  const xPadding = 60;

  // Email and Password ThemedTextInputs
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  // Loading State
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const auth = FIREBASE_AUTH;

  // Log In Using Firebase Auth
  const handleLogIn = async () => {
    console.log(`Attempting login with email: ${emailInput}`);
    setLoading(true); // Start loading spinner

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        emailInput,
        passwordInput,
      );
      console.log("Login successful:", response);

      // Update database to add new fields from updates etc.
      updateUserDocForLogin(response);

      router.replace("/(drawer)/(tabs)");
    } catch (error: any) {
      console.error("Login failed:", error);
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Sign Up Button
  const handleSignIn = () => {
    router.push("/(auth)/SignUpScreen");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary items-center">
      {/* StudyMon Logo */}
      <View className="items-center mb-[30px] pt-[40px]">
        <Image source={images.studymonLogo} />
        <Text className="text-text text-[32px] font-extrabold">StudyMon</Text>
      </View>

      {/* Log In Box */}
      <View
        className="bg-background rounded-[20px] shadow-lg px-[24px] py-[16px]"
        style={{ width: usableWidth - 60 }}
      >
        {/* Email Input */}
        <Text className="text-text font-bold text-[18px] mb-[12px]">Email</Text>
        <ThemedTextInput
          placeholder="Enter your email"
          value={emailInput}
          autoCapitalize="none"
          onChangeText={(text: string) => setEmailInput(text)}
        />

        {/* Password Input */}
        <Text className="text-text font-bold text-[18px] mt-[15px] mb-[12px]">
          Password
        </Text>
        <ThemedTextInput
          placeholder="Enter your password"
          value={passwordInput}
          onChangeText={(text: string) => setPasswordInput(text)}
          secureTextEntry={true}
        />

        {/* Log In Button or Loading Spinner */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-[16px]"
          />
        ) : (
          <TouchableOpacity
            onPress={handleLogIn}
            style={{ width: usableWidth - xPadding * 2, height: 64 }}
            className="bg-accent rounded-full justify-center items-center self-center shadow-lg active:opacity-75 mt-[26px]"
          >
            <Text className="text-background text-[22px] font-semibold">
              Log In
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* For Sign Up */}
      <View className="flex-row mt-[40px]">
        <Text className="text-text font-semibold text-[16px]">
          Don&lsquo;t have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => handleSignIn()}>
          <Text className="text-accent font-bold text-[16px]">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
