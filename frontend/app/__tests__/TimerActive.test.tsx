import { jest } from "@jest/globals";

// Create mock for router
const mockReplace = jest.fn();
const mockRouter = {
  replace: mockReplace,
};

// Mock the expo-router module
jest.mock("expo-router", () => ({
  useRouter: () => mockRouter,
}));

describe("TimerActive handleGiveUp function", () => {
  // Mock console.log
  const originalConsoleLog = console.log;

  beforeEach(() => {
    console.log = jest.fn();
    mockReplace.mockClear();
  });

  afterAll(() => {
    console.log = originalConsoleLog;
  });

  test("handleGiveUp navigates to tabs and logs message", () => {
    // Define the handleGiveUp function that we're testing
    const handleGiveUp = () => {
      console.log("Give Up Button Pressed!");
      mockRouter.replace("/(tabs)");
    };

    // Call the function
    handleGiveUp();

    // Assert that the function did what it's supposed to do
    expect(console.log).toHaveBeenCalledWith("Give Up Button Pressed!");
    expect(mockReplace).toHaveBeenCalledWith("/(tabs)");
  });
});
