import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions, Keyboard, TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Avatar from '@/components/Avatar';
import images from '@/constants/images';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '@/firebaseConfig';
import {collection, doc, getDoc, getDocs, updateDoc} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import helperFunctions from '@/constants/helperFunctions';

const ProfileScreen = () => {
  // Calculate safe area to adjust widths around
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const usableWidth = windowWidth - insets.left - insets.right;
  const xPadding = 30;

  // States
  const [totalFocusSeconds, setTotalFocusSeconds] = useState(0);
  const [username, setUsername] = useState('Username');
  const [email, setEmail] = useState('Email');
  const [collectionCount, setCollectionCount] = useState(0);
  // for changing username
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [usernameInput, setUsernameInput] = useState(username);

  // Fetch user data to get Basic User Stats
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user's fields from user document
        const userId = FIREBASE_AUTH.currentUser?.uid;
        if (userId) {
          const userRef = doc(FIREBASE_DATABASE, 'users', userId);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();

            // Update state for user document fields
            setTotalFocusSeconds(userData.totalFocusTime);
            setUsername(userData.username || 'No Username');
            setEmail(userData.email || 'No Email');
          }

          // Access user subcollections to get more basic statistics
          const ownedCardsRef = collection(
            FIREBASE_DATABASE,
            'users',
            userId,
            'ownedCards'
          );
          const ownedCardsSnap = await getDocs(ownedCardsRef);
          setCollectionCount(ownedCardsSnap.docs.length);
        } else {
          console.warn('Cannot find userId for current user');
        }
      } catch (error: any) {
        console.error('Error fetching card data:', error);
      } finally {
        console.log('Fetched user data');
      }
    };

    fetchUserData();
  }, []); // Dependency array empty so that this only runs once when component mounts

  // handling username change
  const handleUsernamePress = () => {
    setUsernameInput(username);
    setIsEditingUsername(true);
  }

  const handleUsernameSubmit = async () => {
    const userId = FIREBASE_AUTH.currentUser?.uid;
    if (userId && usernameInput.trim()) {
      const userRef = doc(FIREBASE_DATABASE, 'users', userId);
      await updateDoc(userRef, {
        displayName: usernameInput.trim()
      });
      setUsername(usernameInput.trim());
    }
    setIsEditingUsername(false);
    Keyboard.dismiss();
  }

  // handling statistics press
  const handleStatisticsPress = () => {
    alert("This will link to the User's statistics page");
  };

  return (
    <View className='flex-1 bg-background items-center justify-start'>
      <ScrollView
        className='flex-1'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10,
          alignItems: 'center',
        }}
      >
        {/* Profile Avatar */}
        <View className='mt-[50px] items-center'>
          <TouchableOpacity
            onPress={() =>
              alert('This will allow User to change their profile picture')
            }
            activeOpacity={0.85}
          >
            <Avatar source={images.timerActive} />
          </TouchableOpacity>
          <Text className='text-text text-[32px] font-bold self-center mt-[16px]'>
            {
              isEditingUsername ? (
                <TextInput
                  value={usernameInput}
                  onChangeText={setUsernameInput}
                  onBlur={handleUsernameSubmit}
                  onSubmitEditing={handleUsernameSubmit}
                  autoFocus
                  className='text-text text-[32px] font-bold self-center mt-[16px] bg-white rounded px-2 w-[250px] h-[48px] text-center'
                />
              ) : (
                <TouchableOpacity onPress={handleUsernamePress} activeOpacity={0.85}>
                  <Text className='text-text text-[32px] font-bold self-center mb-[8px] mt-[4px]'>
                    {username}
                  </Text>
                </TouchableOpacity>
              )
            }
          </Text>
          <Text className='text-text text-[20px] font-normal self-center'>
            {email}
          </Text>
        </View>

        {/* Basic User Stats */}
        {/* Placeholder for now */}
        <TouchableOpacity
          onPress={() => alert('TODO')}
          style={{ width: usableWidth - xPadding * 2, height: 200 }}
          className='bg-accent rounded-[32px] self-center shadow-lg active:opacity-85 mt-[26px] p-[20px]'
          activeOpacity={0.75}
        >
          <Text className='text-background text-[22px] font-semibold'>
            Basic User Stats
          </Text>
          <Text className='text-background text-[16px] font-medium mt-[10px]'>
            Time Focused:{' '}
            {helperFunctions.formatTimeAsSentence(totalFocusSeconds)}
          </Text>
          <Text className='text-background text-[16px] font-medium mt-[10px]'>
            Collection: {collectionCount.toString().padStart(3, '0')} / 212
            cards owned
          </Text>
          <Text className='text-background text-[16px] font-medium mt-[10px]'>
            Tasks Completed: {0}
          </Text>
        </TouchableOpacity>

        {/* Statistics */}
        {/* Placeholder for now */}
        <TouchableOpacity
          onPress={() => handleStatisticsPress()}
          activeOpacity={0.85}
        >
          <Image source={images.statisticsPlaceholder} className='mt-[36px]' />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
