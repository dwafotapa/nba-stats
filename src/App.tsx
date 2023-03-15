import { useState } from 'react';
import CardList from './components/CardList';
import Layout from './components/Layout';
import SearchForm from './components/SearchForm';
import Spacer from './components/Spacer';
import useLocalStorage from './hooks/useLocalStorage';

export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number | null;
  height_inches: number | null;
  weight_pounds: number | null;
  team: {
    full_name: string
  },
  pinned: boolean
}

export type Players = Map<number, Player>;

function App() {
  // players state (ALL selected players including pinned players) keeps track of insertion order
  const [pinnedPlayers, setPinnedPlayers] = useLocalStorage<Players>('players', new Map<number, Player>());
  const [players, setPlayers] = useState<Players>(new Map<number, Player>(pinnedPlayers));

  const addPlayer = (player: Player) => setPlayers(state => new Map<number, Player>(state.set(player?.id, player)));

  const pinPlayer = (player: Player) => {
    if (pinnedPlayers.has(player?.id)) {
      setPinnedPlayers(state => {
        const newState = new Map<number, Player>(state);
        newState.delete(player?.id);
        return newState;
      });
    } else {
      setPinnedPlayers(state => {
        const newState = new Map<number, Player>([
          [player?.id, player],
          ...Array.from(state.entries())
        ]);
        return newState;
      });
    }
  };

  // build an ordered array of player ids
  // then remove duplicates with Set
  // finally map ids to players and add a pinned property for pinned players
  const orderedPlayers = Array.from(
    new Set([
      ...Array.from(pinnedPlayers.keys()),
      ...Array.from(players.keys())
    ])
  ).map(id => pinnedPlayers.has(id)
    ? ({ ...pinnedPlayers.get(id), pinned: true }) as Player
    : players.get(id) as Player
  );

  return (
    <Layout>
      <main>
        <Spacer size="2rem" />
        <SearchForm addPlayer={addPlayer} />
        <Spacer size="2rem" />
        <CardList
          items={orderedPlayers}
          pinItem={pinPlayer}
        />
      </main>
    </Layout>
  );
}

export default App;
