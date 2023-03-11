import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToggleButton from "./ToggleButton";

describe('ToggleButton', () => {
  it('renders a button', () => {
    render(<ToggleButton />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('toggles a light/dark class to the body element when I click on the button', () => {
    render(<ToggleButton />);

    const { body } = document;
    const button = screen.getByRole('button');
    
    expect(body).toHaveClass('light');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(button);
    });

    expect(body).toHaveClass('dark');
  });
});