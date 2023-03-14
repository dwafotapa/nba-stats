import { useEffect, useState } from "react";
import { Player } from "../App";
import { BALL_DONT_LIE_API__PLAYERS_ENDPOINT } from "../constants";
import useFetch from "../hooks/useFetch";

interface ApiResponse<T> {
  data: T[],
  meta: {}
}

function createURL(searchParams: {
  page: string,
  per_page: string,
  search: string,
}) {
  const url = new URL(BALL_DONT_LIE_API__PLAYERS_ENDPOINT);
  url.searchParams.append('page', searchParams.page);
  url.searchParams.append('per_page', searchParams.per_page);
  url.searchParams.append('search', searchParams.search);
  return url;
}

export default function SearchForm({ addPlayer }: { addPlayer: (player: Player) => void }) {
  const [query, setQuery] = useState('');
  const [{ data, loading, error }, fetch, reset] = useFetch<ApiResponse<Player>>();
  const players = data?.data;

  useEffect(() => {
    if (!query) {
      reset();
      return;
    }

    const timeoutId = setTimeout(() => {
      const url = createURL({
        page: '0',
        per_page: '5',
        search: query
      });
      fetch(url);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query])

  const handlePlayerClick = (player: Player) => {
    addPlayer(player);
    setQuery('');
  }

  return (
    <form name="searchForm" style={{ position: 'relative' }}>
      <input
        type="search"
        placeholder="Search players..."
        value={query}
        style={{
          backgroundColor: 'var(--search-bg-color)',
          border: '1px solid black',
          borderRadius: `4px 4px ${query ? 0 : ''} ${query ? 0 : ''}`,
          color: 'var(--text-color)',
          fontSize: '1rem',
          padding: '0.75rem',
          width: '100%',
          outline: 'none'
        }}
        onChange={e => setQuery(e.target.value)}
      />
      <ul
        hidden={!loading && !players}
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
        {query
          ? <li
            style={{
              lineHeight: '1.5rem',
              paddingLeft: '0.75rem',
              paddingRight: '0.75rem',
            }}
          >
            {loading ? 'Loading...' : null}
            {error ? 'An error occured.' : null}
            {players?.length === 0 ? 'No players found.' : null}
          </li>
          : null
        }
        {players?.map(player =>
          <li
            key={player.id}
            dangerouslySetInnerHTML={{
              __html: `${player.first_name} ${player.last_name}`.replace(new RegExp(query, 'i'), match => `<strong>${match}</strong>`)
            }}
            onClick={() => handlePlayerClick(player)}
            style={{
              lineHeight: '1.5rem',
              paddingLeft: '0.75rem',
              paddingRight: '0.75rem',
            }}
          />
        )}
      </ul>
    </form>
  )
}