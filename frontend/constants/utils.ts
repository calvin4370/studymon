import {
  FIREBASE_AUTH,
  FIREBASE_DATABASE,
  FIREBASE_STORAGE,
} from "@/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { UserCredential } from "firebase/auth";
import values from "./values";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Functions with important functionality which should be in Firebase Cloud Functions
export const initialiseUserDoc = async (response: UserCredential) => {
  // Initialise user document in Firestore user collection
  const userId = FIREBASE_AUTH.currentUser?.uid || "";
  const userDocRef = doc(FIREBASE_DATABASE, "users", userId);
  await setDoc(userDocRef, {
    email: response.user.email,
    displayName: response.user.displayName || "",
    profilePic: "",
    totalFocusTime: 0, // in seconds
    coins: 0,
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
  });

  // Initialise ownedCards subcollection for user
  // const ownedCardsCollectionRef = collection(userRef, 'ownedCards');
  // I want their collection to be empty on account creation, so hold off till they
  // get their first card

  // Initialise tasks subcollection for user
  await addTask({
    userDocRef: userDocRef,
    title: "Example Task",
    description: "This is a Task",
    deadline: new Date(2025, 5, 30), // Date's months are 0-indexed, this is 30 June
    importance: "low",
    estimatedDurationMinutes: 60,
    completed: false,
  });

  // Initialise events subcollection for user
  await addEvent({
    userDocRef: userDocRef,
    title: "Example Event",
    description: "This is an Event",
    startDate: new Date(), // is a datetime
    endDate: new Date(Date.now() + 1000 * 60 * 60), // is a datetime
    travelTimeTo: 0, // time in minutes unavailable while travelling to event destination
    travelTimeBack: 0, // time in minutes needed to get back to being available
    source: "manual", // e.g. manual input / NUSMods integration
  });

  // Initialise friends subcollection for user
  await addFriend({ userDocRef: userDocRef, friendId: "Example Friend ID" });
};

export const updateUserDocForLogin = async (response: UserCredential) => {
  const userId = FIREBASE_AUTH.currentUser?.uid || "";
  const userDocRef = doc(FIREBASE_DATABASE, "users", userId);
  const userSnap = await getDoc(userDocRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();

    // Ensure coins field is present
    if (userData && typeof userData.coins === "undefined") {
      await updateDoc(userDocRef, {
        coins: 0, // Initialise as 0
      });
      console.log("coins field in current user document added");
    }

    // Ensure createdAt field is present
    if (userData && typeof userData.createdAt === "undefined") {
      await updateDoc(userDocRef, {
        createdAt: serverTimestamp(),
      });
      console.log("createdAt field in current user document added");
    }

    // Ensure email field is present
    if (userData && typeof userData.email === "undefined") {
      await updateDoc(userDocRef, {
        email: FIREBASE_AUTH.currentUser?.email,
      });
      console.log("email field in current user document added");
    }

    // Ensure totalFocusTime (in minutes) field is present
    if (userData && typeof userData.totalFocusTime === "undefined") {
      await updateDoc(userDocRef, {
        totalFocusTime: 0, // Initialise as 0 min
      });
      console.log("email field in current user document added");
    }

    // Also just update other markings
    await updateDoc(userDocRef, {
      lastLogin: serverTimestamp(),
    });
  } else {
    // user document not found in database -> old user from before Firestore was connected
    console.log("Login Issue: user document does not exist: ", userId);
    initialiseUserDoc(response);
    console.log("Initialised user document for user: ", userId);
  }
};

// Select and upload profile picture
export const uploadProfilePic = async () => {
  // Picking image
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (result.canceled)
    return { success: false, message: "Image selection cancelled" };

  // Convert image to blob for upload
  const uri = result.assets[0].uri;
  const response = await fetch(uri);
  const blob = await response.blob();

  // Upload to Firebase Storage
  const userId = FIREBASE_AUTH.currentUser?.uid;
  if (!userId) return { success: false, message: "User not authenticated." };

  const storageRef = ref(FIREBASE_STORAGE, `profilePics/${userId}/profile.jpg`);
  await uploadBytes(storageRef, blob);

  // Get the download URL
  const downloadURL = await getDownloadURL(storageRef);

  // Update user document with profile picture URL
  const userDocRef = doc(FIREBASE_DATABASE, "users", userId);
  await updateDoc(userDocRef, {
    profilePic: downloadURL,
  });

  return {
    success: true,
    message: "Profile picture uploaded successfully.",
    url: downloadURL,
  };
};

export const getCoinReward = (minutes: number) => {
  let coinsGiven = 0;

  // Max out at 3hrs or more
  if (minutes >= 180) {
    coinsGiven +=
      60 / values.FIRST_HOUR_RATE +
      60 / values.SECOND_HOUR_RATE +
      60 / values.THIRD_HOUR_RATE;
    return coinsGiven;
  }

  // 1st hour
  if (minutes > 60) {
    coinsGiven += Math.floor(60 / values.FIRST_HOUR_RATE);
  } else {
    coinsGiven += Math.floor(minutes / values.FIRST_HOUR_RATE);
    return coinsGiven;
  }

  // 2nd hour
  if (minutes > 120) {
    coinsGiven += Math.floor(60 / values.SECOND_HOUR_RATE);
  } else {
    let rewardableMinutes = minutes - 60;
    coinsGiven += Math.floor(rewardableMinutes / values.SECOND_HOUR_RATE);
    return coinsGiven;
  }

  // 3rd hour onwards
  let rewardableMinutes = minutes - 120;
  coinsGiven += Math.floor(rewardableMinutes / values.THIRD_HOUR_RATE);

  return coinsGiven;
};

async function addTask({
  userDocRef,
  title,
  description,
  deadline, // Date's months are 0-indexed
  importance,
  estimatedDurationMinutes,
  completed = false,
}: {
  userDocRef: DocumentReference<DocumentData, DocumentData>;
  title: string;
  description: string;
  deadline: Date; // Date's months are 0-indexed
  importance: "low" | "medium" | "high";
  estimatedDurationMinutes: number;
  completed?: boolean;
}) {
  const tasksCollectionRef = collection(userDocRef, "tasks");
  await addDoc(tasksCollectionRef, {
    title: title,
    description: description,
    deadline: deadline,
    importance: importance,
    estimatedDurationMinutes: estimatedDurationMinutes,
    completed: completed,
  });
}

async function addEvent({
  userDocRef,
  title,
  description,
  startDate,
  endDate,
  travelTimeTo = 0,
  travelTimeBack = 0,
  source = "manual",
}: {
  userDocRef: DocumentReference<DocumentData, DocumentData>;
  title: string;
  description: string;
  startDate: Date; // is a datetime
  endDate: Date; // is a datetime
  travelTimeTo?: number; // time in minutes unavailable while travelling to event destination
  travelTimeBack?: number; // time in minutes needed to get back to being available
  source?: "manual" | "NUSMods"; // e.g. manual input / NUSMods integration
}) {
  const eventsCollectionRef = collection(userDocRef, "events");
  await addDoc(eventsCollectionRef, {
    title: title,
    description: description,
    startDate: startDate, // is a datetime
    endDate: endDate, // is a datetime
    travelTimeTo: travelTimeTo, // time in minutes unavailable while travelling to event destination
    travelTimeBack: travelTimeBack, // time in minutes needed to get back to being available
    source: source, // e.g. manual input / NUSMods integration
    createdAt: serverTimestamp(),
  });
  console.log(`Event ${title} added`);
}

async function addFriend({
  userDocRef,
  friendId,
}: {
  userDocRef: DocumentReference<DocumentData, DocumentData>;
  friendId: string;
}) {
  const friendsCollectionRef = collection(userDocRef, "friends");
  await addDoc(friendsCollectionRef, {
    friendId: friendId,
    acceptedAt: serverTimestamp(),
  });
}

export async function addFriendByEmail({
  userDocRef,
  friendEmail,
}: {
  userDocRef: DocumentReference<DocumentData, DocumentData>;
  friendEmail: string;
}) {
  // Query firestore for user with this email
  const usersRef = collection(FIREBASE_DATABASE, "users");
  const q = query(usersRef, where("email", "==", friendEmail));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return { success: false, message: "No user found with that email." };
  }

  // Get friend's UID, first matching document
  const friendDoc = querySnapshot.docs[0];
  const friendId = friendDoc.id;

  // Add friend by UID
  await addFriend({ userDocRef, friendId });

  return { success: true };
}

export async function removeFriend({
  userDocRef,
  friendId,
}: {
  userDocRef: DocumentReference<DocumentData, DocumentData>;
  friendId: string;
}) {
  const friendsCollectionRef = collection(userDocRef, "friends");
  const q = query(friendsCollectionRef, where("friendId", "==", friendId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return { success: false, message: "Friend not found." };
  }

  // Remove the first matching document
  const friendDoc = querySnapshot.docs[0];
  await deleteDoc(friendDoc.ref);

  return { success: true, message: "Friend removed successfully." };
}

export async function buyPack(pack: {
  setCode: string;
  packTier: string;
  price: number;
}) {
  const userId = FIREBASE_AUTH.currentUser?.uid;
  if (!userId) throw new Error("User not authenticated.");

  const userDocRef = doc(FIREBASE_DATABASE, "users", userId);
  const packDocId = `${pack.setCode}-${pack.packTier}`;
  const packRef = doc(FIREBASE_DATABASE, "users", userId, "packs", packDocId);

  await runTransaction(FIREBASE_DATABASE, async (transaction) => {
    const userSnap = await transaction.get(userDocRef);
    const packSnap = await transaction.get(packRef);

    if (!userSnap.exists()) {
      throw new Error("User document does not exist.");
    }
    const userData = userSnap.data();
    const currentCoins = userData.coins ?? 0;

    if (currentCoins < pack.price) {
      throw new Error("Insuffient coins");
    }

    // Deduct coins
    transaction.update(userDocRef, { coins: currentCoins - pack.price });

    // Update or create pack
    if (packSnap.exists()) {
      // if pack exists, increment the numOwned
      const currentNumOwned = packSnap.data().numOwned || 0;
      transaction.update(packRef, {
        numOwned: currentNumOwned + 1,
        lastObtained: serverTimestamp(),
      });
    } else {
      // if pack does not exist, create it
      transaction.set(packRef, {
        setCode: pack.setCode,
        packTier: pack.packTier,
        numOwned: 1,
        lastObtained: serverTimestamp(),
      });
    }
  });
}

const utils = {
  initialiseUserDoc,
  updateUserDocForLogin,
  getCoinReward,
  uploadProfilePic,
  addTask,
  addEvent,
  addFriend,
  addFriendByEmail,
  removeFriend,
  buyPack,
};

export default utils;
