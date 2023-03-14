import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Emoji from "./Emoji";

enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export default function ToggleButton({ ...buttonProps }) {
  const [theme, setTheme] = useLocalStorage<string>('theme', Theme.LIGHT);
  const nextTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;

  useEffect(() => {
    document.body.classList.remove(Theme.LIGHT, Theme.DARK);
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <button
      {...buttonProps}
      onClick={() => setTheme(state => state === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)}
    >
      <Emoji
        label={theme === Theme.LIGHT ? 'crescent moon' : 'sun'}
        symbol={theme === Theme.LIGHT ? '🌙' : '☀️'}
      />
      {' '}
      {nextTheme.charAt(0).toUpperCase()}{nextTheme.slice(1)} mode
    </button>
  );
}