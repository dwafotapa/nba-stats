import { ReactNode } from "react";

interface ToggleButtonProps {
  checked: boolean;
  renderIcon: (checked: boolean) => ReactNode;
  renderText: (checked: boolean) => string;
  onClick: () => void;
}

export default function ToggleButton({ checked, renderIcon, renderText, onClick, ...buttonProps }: ToggleButtonProps) {
  return (
    <button onClick={onClick} {...buttonProps}>
      {renderIcon(checked)}
      {' '}
      {renderText(checked)}
    </button>
  );
}