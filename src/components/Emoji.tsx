interface EmojiProps {
  label: string,
  symbol: string
}

export default function Emoji({ label, symbol }: EmojiProps) {
  return (
    <span
      role="img"
      aria-label={label}
    >
      {symbol}
    </span>
  );
}