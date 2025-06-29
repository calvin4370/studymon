import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import AuthGate from '../AuthGate';

let mockAuth = { userLoggedIn: true, isLoadingAuth: false };

jest.mock('expo-router', () => {
  const replace = jest.fn();
  // @ts-ignore
  global.__replaceMock = replace;
  return {
    useRouter: () => ({ replace }),
  };
});

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => mockAuth,
}));

describe('AuthGate', () => {
  beforeEach(() => {
    // @ts-ignore
    if (global.__replaceMock) global.__replaceMock.mockClear();
  });

  it('renders children when authenticated', () => {
    mockAuth = { userLoggedIn: true, isLoadingAuth: false };
    const { getByText } = render(
      <AuthGate>
        <Text>Child content</Text>
      </AuthGate>
    );
    expect(getByText('Child content')).toBeTruthy();
  });

  it('redirects to login when not authenticated', async () => {
    mockAuth = { userLoggedIn: false, isLoadingAuth: false };
    render(<AuthGate><Text>Child</Text></AuthGate>);
    // @ts-ignore
    await waitFor(() =>
      expect(global.__replaceMock).toHaveBeenCalledWith('/(auth)/LoginScreen')
    );
  });
});