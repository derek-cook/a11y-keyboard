import { useEffect, useMemo, useState } from "react";

export const useDebouncedValue = <TValue>(value: TValue, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<TValue>(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return useMemo(() => debouncedValue, [debouncedValue]);
};
