import { useState, useEffect } from "react";

const PREFIX_Key = "-music-app-";

export default function useLocalStorage(key, initialValue) {
  const prefixKey = PREFIX_Key + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixKey);
    if (jsonValue != null) return JSON.parse(prefixKey);
    // if (typeof initialValue === "function") {
    //   return initialValue();
    // } else {
    //   return initialValue;
    // }
  });

  //   useEffect(() => {
  //     localStorage.setItem(prefixKey, JSON.stringify(value));
  //   }, [prefixKey, value]);

  return [value, setValue];
}
