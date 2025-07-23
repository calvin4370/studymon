import {View, Image, Text, TouchableOpacity, FlatList, Alert, Modal, TextInput} from "react-native";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/contexts/AuthContext";
import {FIREBASE_DATABASE} from "@/firebaseConfig";
import {collection, getDocs, doc, getDoc} from "firebase/firestore";
import utils from "@/constants/utils";
import images from "@/constants/images";

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
          const friendUserDoc = await getDoc(doc(FIREBASE_DATABASE, "users", friendId));
          if (friendUserDoc.exists()) {
            const data = friendUserDoc.data();
            return {
              uid: friendId,
              displayName: data.displayName || "No Username",
              profilePic: data.profilePic || "", // fallback to empty string
              totalFocusTime: data.totalFocusTime || 0,
            };
          }
          return null;
        })
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

  // Avatar component
  const Avatar = ({ profilePic }: { profilePic: string }) => (
  profilePic ? (
    <Image
      source={{ uri: profilePic }}
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 16,
        borderWidth: 4,
        borderColor: "#226B7A",
      }}
    />
  ) : (
    <Image
      source={images.timerActive}
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 16,
        borderWidth: 4,
        borderColor: "#226B7A",
      }}
    />
  )
)

  return (
    <View className="flex-1 bg-[#E6FCFF] pt-10">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 mb-4">
        <Text className="text-[40px] font-extrabold text-[#222]">Friends</Text>
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
          <View>
            <View className="flex-row items-center px-6 py-4">
              <Avatar />
              <View>
                <Text className="text-[28px] font-extrabold text-[#222]">{item.displayName}</Text>
                <Text className="text-[20px] text-[#222] mt-1">{item.totalFocusTime / 60} minutes</Text>
              </View>
            </View>
            <View className="h-[2px] bg-[#6AD1E3] mx-6" />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Add Friend Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-lg font-bold mb-4">Add Friend by Email</Text>
            <TextInput
              placeholder="Enter friend's email"
              value={friendEmail}
              onChangeText={setFriendEmail}
              className="border rounded px-3 py-2 mb-4"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <View className="flex-row justify-between">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-red-500 font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddFriend}>
                <Text className="text-blue-500 font-bold">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FriendsScreen;