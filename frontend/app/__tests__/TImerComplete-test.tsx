import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TimerComplete from '../TimerComplete';

// Mocks
const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: mockReplace }),
  useLocalSearchParams: () => ({ fullDuration: 120 }),
}));
jest.mock('@/constants/images', () => ({ timerActive: 1 }));
jest.mock('@/constants/helperFunctions', () => ({
  formatTimeAsSentence: (seconds: number) => `${seconds} seconds`,
}));
jest.mock('@/constants/utils', () => ({
  getCoinReward: (minutes: number) => minutes,
}));
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ user: { uid: 'abc' } }),
}));
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  increment: jest.fn(),
  updateDoc: jest.fn(),
}));
jest.mock('@/firebaseConfig', () => ({
  FIREBASE_DATABASE: {},
}));

describe('TimerComplete', () => {
  it('renders completion message and coins', () => {
    const { getByText } = render(<TimerComplete />);
    expect(getByText('You focused for')).toBeTruthy();
    expect(getByText('120 seconds!')).toBeTruthy();
    expect(getByText('+2 coins earned')).toBeTruthy();
    expect(getByText('Return')).toBeTruthy();
  });

  it('navigates when Return is pressed', () => {
    const { getByText } = render(<TimerComplete />);
    fireEvent.press(getByText('Return'));
    expect(mockReplace).toHaveBeenCalledWith('/(drawer)/(tabs)');
  });
});