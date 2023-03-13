import { Players } from "../App";
import Emoji from "./Emoji";

interface CardListProps {
  items: Players
}

export default function CardList({ items }: CardListProps) {
  if (items?.size === 0) {
    return (
      <h1
        style={{
          paddingTop: 200,
          paddingBottom: 200,
          textAlign: 'center'
        }}
      >
        <Emoji
          label="basketball"
          symbol="🏀"
        />
        <br />
        You have no cards to show
      </h1>
    );
  }

  return (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1rem',
        listStyleType: 'none',
        marginTop: 0,
        marginBottom: 0,
        paddingLeft: 0
      }}
    >
      {Array.from(items.values()).map(({ id, first_name, last_name, height_feet, weight_pounds, position, team: { full_name } }) =>
        <li
          style={{
            backgroundColor: 'var(--card-bg-color)',
            border: '1px solid #000',
            borderRadius: 4,
            padding: '2rem',
            position: 'relative'
          }}
          key={id}
        >
          <Emoji
            label="pushpin"
            symbol="📌"
            style={{
              cursor: 'pointer',
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '1rem'
            }}
          />
          <h2 style={{ marginTop: 0 }}>{first_name} {last_name}</h2>
          <p>{height_feet} {weight_pounds}</p>
          <p
            style={{
              lineHeight: '1.5rem'
            }}
          >
            Position: {position}<br />
            Team: {full_name}
          </p>
        </li>
      )}
    </ul>
  );
}