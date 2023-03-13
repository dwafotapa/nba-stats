import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function replacer(key: string, value: any) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()),
    };
  } else {
    return value;
  }
}

function reviver(key: string, value: any) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}

export default function useLocalStorage<T>(key: string, initialState: any): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(
    JSON.parse(localStorage.getItem(key) as string, reviver) ?? initialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value, replacer));
  }, [value, key]);

  return [value, setValue];
}