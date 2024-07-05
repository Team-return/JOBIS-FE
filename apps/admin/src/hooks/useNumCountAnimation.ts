import { useEffect, useState } from "react";

export const useNumCountAnimation = (
  end: number,
  start = 0,
  duration = 2000
) => {
  const [count, setCount] = useState(start);

  const easeOutExpo = (t: number): number => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  };

  useEffect(() => {
    let startTime: number | undefined;

    const updateCount = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const progress = easeOutExpo((timestamp - startTime) / duration);
      const newCount = Math.round(end * progress);

      if (newCount !== count) {
        setCount(newCount);
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);

    return () => {
      startTime = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, start, duration]);

  return count;
};
