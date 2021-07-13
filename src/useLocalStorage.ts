import { useState } from "react";

export function useLocalStorage(identifier: string, defaultValue?: any) {
  const valueOnLocalStorage = localStorage.getItem(identifier);
  const initialValue = valueOnLocalStorage
    ? JSON.parse(valueOnLocalStorage)
    : defaultValue;

  const [value, setValue] = useState(initialValue);

  const setOnLocalStorage = (value: any) => {
    localStorage.setItem(identifier, JSON.stringify(value));
    setValue(value);
  };

  return [value, setOnLocalStorage];
}
