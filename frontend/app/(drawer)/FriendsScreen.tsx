import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { FIREBASE_DATABASE } from "@/firebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import utils from "@/constants/utils";
import images from "@/constants/images";
import Avatar from "@/components/Avatar";

const FriendsScreen = () => {
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      if (!user) return;
      const userDocRef = doc(FIREBASE_DATABASE, "users", user.uid);
      const friendsCollectionRef = collection(userDocRef, "friends");
      const friendsSnapshot = await getDocs(friendsCollectionRef);

      const friendsData = await Promise.all(
        friendsSnapshot.docs.map(async (friendDoc) => {
          const friendId = friendDoc.data().friendId;
          const friendUserDoc = await getDoc(
            doc(FIREBASE_DATABASE, "users", friendId),
          );
          if (friendUserDoc.exists()) {
            const data = friendUserDoc.data();
            return {
              uid: friendId,
              displayName: data.displayName || "No Username",
              email: data.email || "No Email",
              profilePic: data.profilePic || "",
              totalFocusTime: data.totalFocusTime || 0,
            };
          }
          return null;
        }),
      );
      setFriends(friendsData.filter(Boolean));
    };
    fetchFriends();
  }, [user, modalVisible]);

  const handleAddFriend = async () => {
    if (!friendEmail) {
      Alert.alert("Please enter an email.");
      return;
    }
    if (!user) {
      Alert.alert("User not loaded. Try again.");
      return;
    }

    const userDocRef = doc(FIREBASE_DATABASE, "users", user.uid);
    const result = await utils.addFriendByEmail({
      userDocRef,
      friendEmail,
    });

    setModalVisible(false);
    setFriendEmail("");

    if (result.success) {
      Alert.alert("Friend Added!");
      console.log("Friend added successfully:", result.message);
    } else {
      Alert.alert("Error", result.message || "Could not add friend.");
      console.error("Error adding friend:", result.message);
    }
  };

  return (
    <View className="flex-1 bg-background pt-10">
      {/* Header */}
      <View className="flex-row items-center justify-center gap-x-4 px-6 mb-4">
        <Text className="text-[30px] font-extrabold text-text">Friends</Text>
        <TouchableOpacity
          className="w-12 h-12 rounded-full border-4 border-[#1BC6D9] items-center justify-center bg-[#CFF6FB]"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-[32px] text-[#222] font-bold">+</Text>
        </TouchableOpacity>
      </View>
      {/* Friends List */}
      <FlatList
        data={friends}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View className="px-2 relative">
            <View className="flex-row items-center rounded-2xl shadow-md px-4 py-4 mb-3">
              <Avatar
                source={
                  item.profilePic
                    ? { uri: item.profilePic }
                    : images.timerActive
                }
                size={70}
                className="border-accent"
              />
              <View className="ml-4 flex-1">
                <Text className="text-[20px] font-bold text-text">
                  {item.displayName}
                </Text>
                <Text className="text-[13px] text-text2 mt-1">
                  {item.email}
                </Text>
              </View>
              <View className="ml-2 bg-accent rounded-full px-4 py-2 min-w-[70px] items-center justify-center">
                <Text className="text-background text-[16px] font-semibold">
                  {Math.floor(item.totalFocusTime / 60)} min
                </Text>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Add Friend Modal */}
      <Modal visible={modalVisible} transparent animationType={"fade"}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-primary p-6 rounded-lg w-80">
            <Text className="text-text text-lg font-bold mb-4">Add Friend</Text>
            <TextInput
              placeholder="Enter friend's email"
              value={friendEmail}
              onChangeText={setFriendEmail}
              className="border border-text rounded px-3 py-2 mb-4"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <View className="flex-row justify-between">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-red-500 font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddFriend}>
                <Text className="text-accent font-bold">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FriendsScreen;
