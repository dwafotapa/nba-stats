import { useState } from 'react';
import CardList from './components/CardList';
import Layout from './components/Layout';
import SearchForm from './components/SearchForm';
import Spacer from './components/Spacer';

export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number;
  height_inches: number;
  weight_pounds: number;
  team: {
    full_name: string
  }
}

export type Players = Map<number, Player>;

function App() {
  const [players, setPlayers] = useState<Players>(new Map<number, Player>());

  const addPlayer = (player: Player) => setPlayers(state => new Map<number, Player>(state.set(player?.id, player)));

  return (
    <Layout>
      <main>
        <Spacer size="2rem" />
        <SearchForm addPlayer={addPlayer} />
        <Spacer size="2rem" />
        <CardList items={players} />
      </main>
    </Layout>
  );
}

export default App;
