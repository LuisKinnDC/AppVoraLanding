import { useEffect, useRef, useState } from 'react';

export function useCountUp(end: number, duration = 2000, start = 0) {
  const [value, setValue] = useState(start);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (end <= start) {
      setValue(end);
      return;
    }

    startTimeRef.current = performance.now();

    function animate(now: number) {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      setValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration, start]);

  return value;
}
