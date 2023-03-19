import { useEffect, useState } from "react";
import { Player } from "../App";
import { BALLDONTLIE_API__PLAYERS_ENDPOINT, BALLDONTLIE_API__PLAYERS__PAGE_QUERY_PARAM, BALLDONTLIE_API__PLAYERS__PER_PAGE_QUERY_PARAM } from "../constants";
import { createURL } from "../helpers/utils";
import useFetch from "../hooks/useFetch";
import Autocomplete from "./Autocomplete";

interface ApiResponse<T> {
  data: T[],
  meta: {}
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
      fetch(
        createURL({
          url: BALLDONTLIE_API__PLAYERS_ENDPOINT,
          searchParams: {
            page: BALLDONTLIE_API__PLAYERS__PAGE_QUERY_PARAM,
            per_page: BALLDONTLIE_API__PLAYERS__PER_PAGE_QUERY_PARAM,
            search: query
          }
        })
      );
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query])

  const handlePlayerClick = (player: Player) => {
    addPlayer(player);
    setQuery('');
  }

  return (
    <form name="searchForm" style={{ position: 'relative' }}>
      <Autocomplete
        hidden={!loading && !players}
        value={query}
        onChange={e => setQuery(e.target.value)}
        renderResults={() =>
          <>
            {query &&
              <li
                style={{
                  lineHeight: '1.5rem',
                  paddingLeft: '0.75rem',
                  paddingRight: '0.75rem',
                }}
              >
                {loading && 'Loading...'}
                {error && 'An error occured.'}
                {players?.length === 0 ? 'No players found.' : null}
              </li>
            }
            {players?.map(player =>
              <li
                key={player?.id}
                dangerouslySetInnerHTML={{
                  __html: `${player?.first_name} ${player?.last_name}`.replace(new RegExp(query, 'i'), match => `<strong>${match}</strong>`)
                }}
                onClick={() => handlePlayerClick(player)}
                style={{
                  lineHeight: '1.5rem',
                  paddingLeft: '0.75rem',
                  paddingRight: '0.75rem',
                }}
              />
            )}
          </>
        }
      />
    </form>
  )
}