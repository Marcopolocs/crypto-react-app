import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay?: number): T {
  const defaultTimeout = 500;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || defaultTimeout);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
