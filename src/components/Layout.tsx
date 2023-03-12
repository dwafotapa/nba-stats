import { ReactNode } from "react";
import Emoji from "./Emoji";
import ToggleButton from "./ToggleButton";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '3rem 1rem',
        maxWidth: 600
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: '3rem'
          }}
        >
          <Emoji
            label="person bouncing ball"
            symbol={'⛹'}
          />
          {' '}
          NBA cards
        </h1>
        <ToggleButton
          style={{
            backgroundColor: 'var(--text-color)',
            borderRadius: 4,
            color: 'var(--bg-color)',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            padding: '0.5rem 1rem'
          }}
        />
      </header>
      {children}
    </div>
  )
}