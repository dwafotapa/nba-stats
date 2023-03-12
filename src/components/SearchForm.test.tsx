import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "./SearchForm";

describe('SearchForm', () => {
  it('renders a form and an input', () => {
    render(<SearchForm />);

    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox');

    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
});