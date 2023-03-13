import { render, screen } from "@testing-library/react";
import SearchForm from "./SearchForm";

describe('SearchForm', () => {
  it('renders a form and an input', () => {
    const addPlayer = jest.fn();
    render(<SearchForm addPlayer={addPlayer} />);

    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox');

    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
});