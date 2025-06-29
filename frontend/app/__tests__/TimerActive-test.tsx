import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TimerActive from '../TimerActive';

// Mock navigation
const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: mockReplace }),
  useLocalSearchParams: () => ({ fullDuration: 10 }),
}));
jest.mock('@/components/TimerDisplay', () => {
  const MockTimerDisplay = (props: any) => {
    const { Text } = require('react-native');
    return <Text>{props.seconds}</Text>;
  };
  MockTimerDisplay.displayName = 'MockTimerDisplay';
  return MockTimerDisplay;
});
jest.mock('@/constants/images', () => ({ timerActive: 1 }));
jest.mock('@/constants/colors', () => ({ primary: '#fff' }));

describe('TimerActive', () => {
  it('renders timer and Give Up button', () => {
    const { getByText } = render(<TimerActive />);
    expect(getByText('Give Up')).toBeTruthy();
    expect(getByText('10')).toBeTruthy(); // initial seconds
  });

  it('navigates when Give Up is pressed', () => {
    const { getByText } = render(<TimerActive />);
    fireEvent.press(getByText('Give Up'));
    expect(mockReplace).toHaveBeenCalledWith('/(tabs)');
  });
});