import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  // Effect to update localStorage when the state changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        if (storedValue === null || storedValue === undefined) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(storedValue));
        }
      }
    } catch (error) {
      console.error(`Error setting localStorage key “${key}”:`, error);
    }
  }, [key, storedValue]);


  // Effect to listen for changes in other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === key) {
            try {
                 if (e.newValue === null) { // Item was removed from storage
                    setStoredValue(initialValue);
                 } else {
                    setStoredValue(JSON.parse(e.newValue));
                 }
            } catch (error) {
                console.error(`Error handling storage change for key “${key}”:`, error);
                setStoredValue(initialValue);
            }
        }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;