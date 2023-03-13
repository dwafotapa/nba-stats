import { ComponentPropsWithoutRef } from "react";

interface EmojiProps extends ComponentPropsWithoutRef<"span"> {
  label: string,
  symbol: string
}

export default function Emoji({ label, symbol, ...spanProps }: EmojiProps) {
  return (
    <span
      {...spanProps}
      role="img"
      aria-label={label}
    >
      {symbol}
    </span>
  );
}