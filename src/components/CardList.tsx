import { Player } from "../App";
import { formatPlayerHeight, formatPlayerWeight } from "../helpers/utils";
import Emoji from "./Emoji";

interface CardListProps {
  items: Player[],
  pinItem: (player: Player) => void
}

export default function CardList({
  items,
  pinItem
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
            border: player?.pinned ? '1px solid blue' : '1px solid #000',
            borderRadius: 4,
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
              opacity: player?.pinned ? 1 : 0.4
            }}
            onClick={() => pinItem(player)}
          />
          <h2 style={{ marginTop: 0 }}>{player?.first_name} {player?.last_name}</h2>
          <p>
            <strong>{formatPlayerHeight(player?.height_feet, player?.height_inches)}, {formatPlayerWeight(player?.weight_pounds)}</strong>
          </p>
          <p
            style={{
              lineHeight: '1.5rem'
            }}
          >
            Position: <strong>{player?.position}</strong><br />
            Team: <strong>{player?.team?.full_name}</strong>
          </p>
        </li>
      )}
    </ul>
  );
}