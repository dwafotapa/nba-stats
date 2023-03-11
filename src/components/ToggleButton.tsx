import { useEffect, useState } from "react";
import Emoji from "./Emoji";

enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

// interface ToggleButtonProps {
//   buttonProps: []
// }

export default function ToggleButton({ ...buttonProps }) {
  const [theme, setTheme] = useState(Theme.LIGHT);
  
  useEffect(() => {
    document.body.classList.remove(Theme.LIGHT, Theme.DARK);
    document.body.classList.add(theme);
  }, [theme]);

  const handleButtonClick = () => {
    setTheme(state => state === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }

  return (
    <button
      {...buttonProps}
      onClick={handleButtonClick}
    >
      <Emoji
        label={theme === Theme.LIGHT ? 'sun' : 'crescent moon'}
        symbol={theme === Theme.LIGHT ? '☀️' : '🌙'}
      />
      {' '}
      {theme.charAt(0).toUpperCase()}{theme.slice(1)} mode
    </button>
  );
}