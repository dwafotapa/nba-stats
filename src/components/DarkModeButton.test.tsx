import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DarkModeButton from "./DarkModeButton";

describe('ToggleButton', () => {
  it('renders a button', () => {
    render(<DarkModeButton />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('toggles a light/dark class to the body element when I click on the button', async () => {
    render(<DarkModeButton />);
    expect(document.body).toHaveClass('light');

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(document.body).toHaveClass('dark');
  });
});