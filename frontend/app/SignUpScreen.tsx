import { Text, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import ThemedTextInput from '@/components/ThemedTextInput';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";

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
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Sign up successful:', response);
            alert('Account created! You are now signed in.');
            router.replace('./tabs'); // ✅ Navigate to main screen after sign-up
        } catch (error: any) {
            console.error('Sign up error:', error);
            alert('Sign up failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className='flex-1 bg-primary items-center justify-center'>
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
                    onChangeText={(text) => setEmail(text)}
                />

                <Text className='text-text text-[16px] font-bold mb-[12px] mt-[16px]'>Password</Text>
                <ThemedTextInput
                    placeholder='Enter your password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                {/* Sign Up Button or Spinner */}
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" className="mt-[20px]" />
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