import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';
import ThemedTextInput from '@/components/ThemedTextInput';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '@/firebaseConfig';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import images from '@/constants/images';
import { doc, getDoc, serverTimestamp, setDoc } from '@firebase/firestore';

const SignUpScreen = () => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const usableWidth = windowWidth - insets.left - insets.right;
  const xPadding = 60;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const auth = FIREBASE_AUTH;

  const handleSignUp = async () => {
    setLoading(true);
    try {
      // For authentication
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Creating user document in Firestore
      // reference to the user document using uid from user from useAuth
      const userRef = doc(FIREBASE_DATABASE, 'users', response.user.uid);
      // Obtains a snapshot of the user document, which could or could not exist
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          // all the fields are here
          email: response.user.email,
          displayName: response.user.displayName || '',
          totalFocusTime: 0, // in minutes
          coins: 0,
          collection: [],
          createdAt: serverTimestamp(),
        });
      } else {
        // account already exists
        await deleteUser(response.user); // deletes for the auth
        alert('Account already exists. Please try again or log in.');
        setLoading(false);
        return;
      }

      console.log('Sign up successful:', response);
      alert('Account created! You are now signed in.');
      router.replace('/(tabs)'); // Timer Screen
    } catch (error: any) {
      console.error('Sign up error:', error);
      alert('Sign up failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-primary items-center'>
      {/* StudyMon Logo */}
      <View className='items-center mb-[30px] pt-[40px]'>
        <Image source={images.studymonLogo} />
        <Text className='text-text text-[32px] font-extrabold'>StudyMon</Text>
      </View>

      <View
        className='bg-background rounded-[20px] shadow-lg px-[24px] py-[16px]'
        style={{ width: usableWidth - 60 }}
      >
        <Text className='text-text text-[24px] font-bold mb-[20px] text-center'>
          Create Account
        </Text>

        <Text className='text-text text-[16px] font-bold mb-[12px]'>Email</Text>
        <ThemedTextInput
          placeholder='Enter your email'
          value={email}
          autoCapitalize={'none'}
          onChangeText={(text) => setEmail(text)}
        />

        <Text className='text-text text-[16px] font-bold mb-[12px] mt-[16px]'>
          Password
        </Text>
        <ThemedTextInput
          placeholder='Enter your password'
          value={password}
          autoCapitalize={'none'}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />

        {/* Sign Up Button or Spinner */}
        {loading ? (
          <ActivityIndicator
            size='large'
            color='#0000ff'
            className='mt-[20px]'
          />
        ) : (
          <TouchableOpacity
            onPress={handleSignUp}
            style={{ width: usableWidth - xPadding * 2, height: 64 }}
            className='bg-accent rounded-full justify-center items-center self-center shadow-lg active:opacity-75 mt-[20px]'
          >
            <Text className='text-background text-[22px] font-semibold'>
              Sign Up
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
