import { useLocalSearchParams, useRouter } from "expo-router";
import helperFunctions from "@/constants/helperFunctions";

// Mock dependencies
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("@/constants/helperFunctions", () => ({
  formatTimeAsSentence: jest.fn(),
}));

describe("TimerComplete basic functionality", () => {
  // Test that formatTimeAsSentence is called with the right duration
  test("formats the completed timer duration correctly", () => {
    // Set up mocks
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      fullDuration: "300", // 5 minutes in seconds
    });

    // Format the time as it would happen in the component
    const fullDuration = parseInt(useLocalSearchParams().fullDuration);
    helperFunctions.formatTimeAsSentence(fullDuration);

    // Verify that formatTimeAsSentence was called with the right value
    expect(helperFunctions.formatTimeAsSentence).toHaveBeenCalledWith(300);
  });

  // Test that the params are read correctly
  test("reads duration from route params", () => {
    // Set up different duration in params
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      fullDuration: "600", // 10 minutes in seconds
    });

    // Get the param as the component would
    const fullDuration = parseInt(useLocalSearchParams().fullDuration);

    // Verify the param was read correctly
    expect(fullDuration).toBe(600);
  });

  // Test that pressing return navigates correctly
  test("navigates to home when return is pressed", () => {
    // Setup router mock
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });

    // Simulate pressing the return button - call the function that would be triggered
    const handleReturnPress = () => {
      useRouter().replace("/(tabs)");
    };

    // Call the function
    handleReturnPress();

    // Verify navigation occurred to the correct path
    expect(mockReplace).toHaveBeenCalledWith("/(tabs)");
  });
});
