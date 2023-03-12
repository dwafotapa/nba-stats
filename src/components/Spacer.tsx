interface SpacerProps {
  size: number | string,
  horizontal?: boolean,
  style?: {}
}

export default function Spacer({
  size,
  horizontal,
  style
}: SpacerProps) {
  const width = horizontal ? size : 'auto';
  const height = horizontal ? 'auto' : size;
  return (
    <span
      style={{
        display: 'flex',
        width,
        height,
        ...style
      }}
    />
  )
}