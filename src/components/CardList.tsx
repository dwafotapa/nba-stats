import { Player } from "../App";
import Emoji from "./Emoji";

interface CardListProps {
  items: Player[],
  pinPlayer: (player: Player) => void
}

export default function CardList({
  items,
  pinPlayer
}: CardListProps) {
  if (items?.length === 0) {
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
      {items.map(player =>
        <li
          style={{
            backgroundColor: 'var(--card-bg-color)',
            border: '1px solid #000',
            borderRadius: 4,
            borderColor: player?.pinned ? 'blue' : '',
            padding: '2rem',
            position: 'relative'
          }}
          key={player?.id}
        >
          <Emoji
            label="pushpin"
            symbol="📌"
            style={{
              cursor: 'pointer',
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '1rem',
              opacity: player?.pinned ? 1 : 0.5
            }}
            onClick={() => pinPlayer(player)}
          />
          <h2 style={{ marginTop: 0 }}>{player?.first_name} {player?.last_name}</h2>
          <p>{player?.height_feet} {player?.weight_pounds}</p>
          <p
            style={{
              lineHeight: '1.5rem'
            }}
          >
            Position: {player?.position}<br />
            Team: {player?.team?.full_name}
          </p>
        </li>
      )}
    </ul>
  );
}