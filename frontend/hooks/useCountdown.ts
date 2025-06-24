import { useState, useEffect } from "react";

const useCountdown = () => {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timeout = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [secondsLeft]);

  function startCountdown(seconds: number) {
    setSecondsLeft(seconds);
  }

  return { secondsLeft, startCountdown };
};

export default useCountdown;
