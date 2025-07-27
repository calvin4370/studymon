import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { PACK_SIZES, FACULTY_PACKS } from "@/constants/packs";
import icons from "@/constants/icons";
import { buyPack } from "@/constants/utils";

export default function StoreScreen() {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [isBuying, setIsBuying] = useState(false);

  // Helper to get pack info by id
  const getSelectedPackInfo = () => {
    return (
      PACK_SIZES.find((pack) => pack.id === selectedPack) ||
      FACULTY_PACKS.find((pack) => pack.id === selectedPack)
    );
  };

  const handleBuy = async () => {
    const pack = getSelectedPackInfo();
    if (!pack) return;

    // For now, all setCode is "BASE", and packTier is the pack name (from packs.ts)
    const packData = {
      setCode: "BASE",
      packTier: pack.name,
      price: pack.price,
    };

    setIsBuying(true);
    try {
      await buyPack(packData);
      Alert.alert("Success", `You bought a ${pack.name}!`);
      setSelectedPack(null); // Reset selection after purchase
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to buy pack");
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <View className="flex-1 bg-background px-4 pt-4">
      {/* Standard Packs */}
      <View className="flex-none">
        <Text className="text-[28px] font-extrabold text-text mb-4">
          Standard Packs
        </Text>
        <View className="flex-row justify-between mb-6">
          {PACK_SIZES.map((pack) => (
            <TouchableOpacity
              key={pack.id}
              onPress={() => setSelectedPack(pack.id)}
              activeOpacity={0.85}
              className={`
    items-center flex-1 mx-1 rounded-2xl
    py-3
    ${selectedPack === pack.id ? "bg-accent/20" : "bg-white"}
   `}
            >
              <Image
                source={pack.image}
                className={`mb-2 ${
                  selectedPack === pack.id
                    ? "w-[100px] h-[157px]"
                    : "w-[85px] h-[134px]"
                }`}
                resizeMode="contain"
              />
              <Text
                className={`
      font-bold text-center
      ${selectedPack === pack.id ? "text-accent text-xl" : "text-gray-800 text-lg"}
    `}
                numberOfLines={1}
              >
                {pack.name}
              </Text>
              <View className="flex-row items-center mt-1">
                <Image source={icons.coin} className="w-5 h-5 mr-1" />
                <Text className="font-bold text-base text-gray-700">
                  {pack.price}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Subject Packs */}
      <View className="flex-1">
        <Text className="text-[26px] font-extrabold text-text mb-3">
          Faculty Packs
        </Text>
        <ScrollView className="flex-1">
          {FACULTY_PACKS.map((pack) => (
            <TouchableOpacity
              key={pack.id}
              onPress={() => setSelectedPack(pack.id)}
              className={`rounded-xl px-5 py-4 mb-4 flex-row items-center ${
                selectedPack === pack.id ? "bg-accent/20" : "bg-white"
              }`}
            >
              <Text
                className={`text-lg font-bold flex-1 ${
                  selectedPack === pack.id ? "text-accent" : "text-gray-800"
                }`}
              >
                {pack.name}
              </Text>
              <View className="flex-row items-center">
                <Image source={icons.coin} className="w-5 h-5 mr-1" />
                <Text className="font-bold text-base text-gray-700">
                  {pack.price}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Buy button */}
      <View className="flex-none py-2">
        <TouchableOpacity
          disabled={!selectedPack}
          onPress={handleBuy}
          className={`
          ${selectedPack ? "bg-accent" : "bg-gray-300"}
          py-4 rounded-xl items-center mb-8 mx-2
        `}
        >
          <Text
            className={`font-bold text-xl ${selectedPack ? "text-white" : "text-gray-500"}`}
          >
            {isBuying ? "Buying..." : "BUY"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
