import helperFunctions from "@/constants/helperFunctions";

describe("helperFunctions", () => {
  // Tests for padWithZero function
  describe("padWithZero", () => {
    test("adds leading zero to single-digit numbers", () => {
      expect(helperFunctions.padWithZero(0)).toBe("00");
      expect(helperFunctions.padWithZero(1)).toBe("01");
      expect(helperFunctions.padWithZero(9)).toBe("09");
    });

    test("does not add leading zero to double-digit numbers", () => {
      expect(helperFunctions.padWithZero(10)).toBe("10");
      expect(helperFunctions.padWithZero(42)).toBe("42");
      expect(helperFunctions.padWithZero(99)).toBe("99");
    });

    test("works with numbers greater than 99", () => {
      expect(helperFunctions.padWithZero(100)).toBe("100");
      expect(helperFunctions.padWithZero(999)).toBe("999");
    });
  });

  // Tests for formatTime function
  describe("formatTime", () => {
    test("converts seconds to [hours, minutes, seconds] format", () => {
      expect(helperFunctions.formatTime(0)).toEqual([0, 0, 0]);
      expect(helperFunctions.formatTime(30)).toEqual([0, 0, 30]);
      expect(helperFunctions.formatTime(60)).toEqual([0, 1, 0]);
      expect(helperFunctions.formatTime(90)).toEqual([0, 1, 30]);
      expect(helperFunctions.formatTime(3600)).toEqual([1, 0, 0]);
      expect(helperFunctions.formatTime(3661)).toEqual([1, 1, 1]);
    });

    test("handles large values correctly", () => {
      expect(helperFunctions.formatTime(7322)).toEqual([2, 2, 2]); // 2 hours, 2 minutes, 2 seconds
      expect(helperFunctions.formatTime(86399)).toEqual([23, 59, 59]); // 23 hours, 59 minutes, 59 seconds
    });
  });

  // Tests for formatTimeAsSentence function
  describe("formatTimeAsSentence", () => {
    test("formats time with hours, minutes, and seconds", () => {
      expect(helperFunctions.formatTimeAsSentence(3661)).toBe(
        "1 hour, 1 minute, and 1 second",
      );
      expect(helperFunctions.formatTimeAsSentence(7322)).toBe(
        "2 hours, 2 minutes, and 2 seconds",
      );
    });

    test("formats time with seconds only", () => {
      expect(helperFunctions.formatTimeAsSentence(1)).toBe("1 second");
      expect(helperFunctions.formatTimeAsSentence(30)).toBe("30 seconds");
    });
  });

  // Tests for formatTimeAsShort function
  describe("formatTimeAsShort", () => {
    test("formats time with hours, minutes, and seconds", () => {
      expect(helperFunctions.formatTimeAsShort(3661)).toBe("1h 1min 1s");
      expect(helperFunctions.formatTimeAsShort(7322)).toBe("2h 2min 2s");
    });

    test("formats time with seconds only", () => {
      expect(helperFunctions.formatTimeAsShort(1)).toBe("1s");
      expect(helperFunctions.formatTimeAsShort(30)).toBe("30s");
    });

    test("handles zero correctly", () => {
      expect(helperFunctions.formatTimeAsShort(0)).toBe("0s");
    });
  });
});
