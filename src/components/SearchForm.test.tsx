import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "./SearchForm";

describe('SearchForm', () => {
  it('renders a form and an input', () => {
    const addPlayer = jest.fn();
    render(<SearchForm addPlayer={addPlayer} />);

    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('unfolds a dropdown with search results', async () => {
    const addPlayer = jest.fn();
    render(<SearchForm addPlayer={addPlayer} />);

    userEvent.type(screen.getByRole('searchbox'), 'Mic');

    expect(await screen.findByRole('list')).toBeInTheDocument();
    expect(await screen.findAllByText(/Mic/i)).toHaveLength(3);
  });
});