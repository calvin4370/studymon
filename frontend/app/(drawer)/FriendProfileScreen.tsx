import { View, Text, FlatList, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { FIREBASE_DATABASE } from "@/firebaseConfig";
import Avatar from "@/components/Avatar";
import images from "@/constants/images";
import helperFunctions from "@/constants/helperFunctions";
import OwnedCardCard from "@/components/OwnedCardCard";

const FriendProfileScreen = () => {
  const { uid } = useLocalSearchParams();
  const [profile, setProfile] = useState<any>(null);
  const [ownedCards, setOwnedCards] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!uid) return;

      // Fetch friend's profile
      const userDoc = await getDoc(
        doc(FIREBASE_DATABASE, "users", uid as string),
      );
      if (userDoc.exists()) setProfile(userDoc.data());

      // Fetch friend's owned cards
      const ownedCardsSnap = await getDocs(
        collection(FIREBASE_DATABASE, "users", uid as string, "ownedCards"),
      );
      const fetchedOwnedCards = ownedCardsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOwnedCards(fetchedOwnedCards);
    };
    fetchData();
  }, [uid]);

  if (!profile) return <Text>Loading...</Text>;

  // Dummy handler for OwnedCardCard (since friend collection is read-only)
  const handleCardSelect = () => {};

  return (
    <ScrollView className="flex-1 bg-background p-6">
      <View className="items-center mb-6">
        <Avatar
          source={
            profile.profilePic
              ? { uri: profile.profilePic }
              : images.timerActive
          }
          size={200}
        />
        <Text className="text-[28px] font-bold text-text mt-2">
          {profile.displayName || "No Username"}
        </Text>
        <Text className="text-[16px] text-text2 mt-1">{profile.email}</Text>
        <Text className="text-[16px] text-text2 mt-2 text-accent font-black">
          Total Focus:{" "}
          {helperFunctions.formatTimeAsSentence(profile.totalFocusTime || 0)}
        </Text>
      </View>
      {/* Collection Overview */}
      <Text className="text-[22px] font-bold text-text mb-2">Collection</Text>
      <FlatList
        data={ownedCards}
        renderItem={({ item }) => OwnedCardCard(item, handleCardSelect)}
        keyExtractor={(item) => item.cardNum?.toString() || item.id}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 11,
          marginBottom: 11,
        }}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </ScrollView>
  );
};

export default FriendProfileScreen;
