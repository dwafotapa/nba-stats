import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Emoji from "./Emoji";
import ToggleButton from "./ToggleButton";

enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export default function DarkModeButton({ ...buttonProps }) {
  const [theme, setTheme] = useLocalStorage<string>('theme', Theme.LIGHT);
  const nextTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;

  useEffect(() => {
    document.body.classList.remove(Theme.LIGHT, Theme.DARK);
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ToggleButton
      {...buttonProps}
      checked={theme === Theme.DARK}
      renderIcon={checked =>
        <Emoji
          label={checked ? 'sun' : 'crescent moon'}
          symbol={checked ? '☀️' : '🌙'}
        />
      }
      renderText={checked => checked ? 'Light mode' : 'Dark mode'}
      onClick={() => setTheme(nextTheme)}
    />
  );
}