import { useEffect, useState } from "react";
import { BALL_DONT_LIE_API__PLAYERS_ENDPOINT } from "../constants";
import useFetch from "../hooks/useFetch";

interface Player {
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

interface ApiResponse<T> {
  data: T[],
  meta: {}
}

function createURL({
  page,
  per_page,
  query,
}: {
  page: string,
  per_page: string,
  query: string,
}) {
  const url = new URL(BALL_DONT_LIE_API__PLAYERS_ENDPOINT);
  url.searchParams.append('page', page);
  url.searchParams.append('per_page', per_page);
  url.searchParams.append('search', query);
  return url;
}

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const [{ data, loading, error }, fetch, reset] = useFetch<ApiResponse<Player>>(
    createURL({
      page: '0',
      per_page: '5',
      query
    })
  );
  const players = data?.data;
  
  useEffect(() => {
    if (!query) {
      reset();
      return;
    }

    const timeoutId = setTimeout(() => {
      fetch();
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query])

  return (
    <form name="searchForm">
      <input
        type="search"
        placeholder="Search players..."
        value={query}
        style={{
          fontSize: '1rem',
          padding: '0.75rem',
          width: '100%'
        }}
        onChange={e => setQuery(e.target.value)}
      />
      <ul
        hidden={!loading && !players}
        style={{
          border: '1px solid black',
          borderTop: 0,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          cursor: 'pointer',
          listStyleType: 'none',
          margin: 0,
          padding: '0.75rem 0'
        }}
      >
        {loading || error || players?.length === 0
          ? <li
              style={{
                lineHeight: '1.5rem',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem',
              }}
            >
              {loading ? 'Loading...' : (error ? 'An error occured.' : 'No players found.')}
            </li>
          : null
        }
        {players?.map(({ id, first_name, last_name }) =>
          <li
            key={id}
            dangerouslySetInnerHTML={{
              __html: `${first_name} ${last_name}`.replace(new RegExp(query, 'i'), match => `<strong>${match}</strong>`)
            }}
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