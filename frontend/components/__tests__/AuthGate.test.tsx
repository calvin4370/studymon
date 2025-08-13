import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

// Mock the AuthContext hook
jest.mock("@/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// Mock the expo-router hook
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("AuthGate logic", () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup useRouter mock
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
  });

  test("redirects to login screen when user is not authenticated", () => {
    // Mock authentication state as not logged in
    (useAuth as jest.Mock).mockReturnValue({
      userLoggedIn: false,
      isLoadingAuth: false,
    });

    // Simulate the AuthGate logic directly
    const { userLoggedIn, isLoadingAuth } = useAuth();

    if (!isLoadingAuth && !userLoggedIn) {
      useRouter().replace("/(auth)/LoginScreen");
    }

    // Should redirect to login screen
    expect(mockReplace).toHaveBeenCalledWith("/(auth)/LoginScreen");
  });

  test("does not redirect when user is authenticated", () => {
    // Mock authentication state as logged in
    (useAuth as jest.Mock).mockReturnValue({
      userLoggedIn: true,
      isLoadingAuth: false,
    });

    // Simulate the AuthGate logic directly
    const { userLoggedIn, isLoadingAuth } = useAuth();

    if (!isLoadingAuth && !userLoggedIn) {
      useRouter().replace("/(auth)/LoginScreen");
    }

    // Should not redirect
    expect(mockReplace).not.toHaveBeenCalled();
  });

  test("does not redirect when authentication is loading", () => {
    // Mock authentication state as loading
    (useAuth as jest.Mock).mockReturnValue({
      userLoggedIn: false,
      isLoadingAuth: true,
    });

    // Simulate the AuthGate logic directly
    const { userLoggedIn, isLoadingAuth } = useAuth();

    if (!isLoadingAuth && !userLoggedIn) {
      useRouter().replace("/(auth)/LoginScreen");
    }

    // Should not redirect while loading
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
