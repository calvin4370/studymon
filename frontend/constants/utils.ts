import { FIREBASE_AUTH, FIREBASE_DATABASE } from '@/firebaseConfig';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { UserCredential } from 'firebase/auth';

import values from './values';

// Functions with important functionality which should be in Firebase Cloud Functions
export const initialiseUserDoc = async (response: UserCredential) => {
  // Initialise user document in Firestore user collection
  const userId = FIREBASE_AUTH.currentUser?.uid || '';
  const userDocRef = doc(FIREBASE_DATABASE, 'users', userId);
  await setDoc(userDocRef, {
    email: response.user.email,
    displayName: response.user.displayName || '',
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
  const tasksCollectionRef = collection(userDocRef, 'tasks');
  await addDoc(tasksCollectionRef, {
    title: 'Example Task',
    description: 'This is a Task',
    deadline: new Date(2025, 5, 30), // Date's months are 0-indexed, this is 30 June
    importance: 'low',
    estimatedDurationMinutes: 60,
    completed: false,
    createdAt: serverTimestamp(),
  });

  // Initialise events subcollection for user
  const eventsCollectionRef = collection(userDocRef, 'events');
  await addDoc(eventsCollectionRef, {
    title: 'Example Event',
    description: 'This is an Event',
    startDate: new Date(), // is a datetime
    endDate: new Date(Date.now() + 1000 * 60 * 60), // is a datetime
    travelTimeTo: 0, // time in minutes unavailable while travelling to event destination
    travelTimeBack: 0, // time in minutes needed to get back to being available
    source: 'manual', // e.g. manual input / NUSMods integration
    createdAt: serverTimestamp(),
  });

  // Initialise friends subcollection for user
  const friendsCollectionRef = collection(userDocRef, 'friends');
  await addDoc(friendsCollectionRef, {
    friendId: 'Example Friend UID',
    acceptedAt: serverTimestamp(),
  });
};

export const updateUserDocForLogin = async (response: UserCredential) => {
  const userId = FIREBASE_AUTH.currentUser?.uid || '';
  const userDocRef = doc(FIREBASE_DATABASE, 'users', userId);
  const userSnap = await getDoc(userDocRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();

    // Ensure coins field is present
    if (userData && typeof userData.coins === 'undefined') {
      await updateDoc(userDocRef, {
        coins: 0, // Initialise as 0
      });
      console.log('coins field in current user document added');
    }

    // Ensure createdAt field is present
    if (userData && typeof userData.createdAt === 'undefined') {
      await updateDoc(userDocRef, {
        createdAt: serverTimestamp(),
      });
      console.log('createdAt field in current user document added');
    }

    // Ensure email field is present
    if (userData && typeof userData.email === 'undefined') {
      await updateDoc(userDocRef, {
        email: FIREBASE_AUTH.currentUser?.email,
      });
      console.log('email field in current user document added');
    }

    // Ensure totalFocusTime (in minutes) field is present
    if (userData && typeof userData.totalFocusTime === 'undefined') {
      await updateDoc(userDocRef, {
        totalFocusTime: 0, // Initialise as 0 min
      });
      console.log('email field in current user document added');
    }

    // Also just update other markings
    await updateDoc(userDocRef, {
      lastLogin: serverTimestamp(),
    });
  } else {
    // user document not found in database -> old user from before Firestore was connected
    console.log('Login Issue: user document does not exist: ', userId);
    initialiseUserDoc(response);
    console.log('Initialised user document for user: ', userId);
  }
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

const utils = {
  updateUserDocForLogin,
  getCoinReward,
};

export default utils;
