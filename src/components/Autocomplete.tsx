import { ChangeEvent, FormEvent, ReactNode } from "react";

interface AutocompleteProps {
  hidden: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  renderResults: () => ReactNode;
}

export default function Autocomplete({ hidden, value, onChange, renderResults }: AutocompleteProps) {
  return (
    <div>
      <input
        type="search"
        placeholder="Search players..."
        value={value}
        style={{
          backgroundColor: 'var(--search-bg-color)',
          border: '1px solid black',
          borderRadius: `4px 4px ${value ? 0 : ''} ${value ? 0 : ''}`,
          color: 'var(--text-color)',
          fontSize: '1rem',
          padding: '0.75rem',
          width: '100%',
          outline: 'none'
        }}
        onChange={onChange}
      />
      <ul
        hidden={hidden}
        style={{
          backgroundColor: 'var(--search-bg-color)',
          color: 'var(--text-color)',
          border: '1px solid black',
          borderTop: 0,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          cursor: 'pointer',
          listStyleType: 'none',
          margin: 0,
          padding: '0.75rem 0',
          position: 'absolute',
          left: 0,
          right: 0,
          zIndex: 10
        }}
      >
        {renderResults()}
      </ul>
    </div>
  );
}