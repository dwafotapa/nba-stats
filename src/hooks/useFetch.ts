import { useState } from "react";
import handleResponse from "../utils/fetch";

interface State<T> {
  data: T | null,
  loading: boolean,
  error: Error | null
}

const initialState = {
  data: null,
  loading: false,
  error: null
}

export default function useFetch<T>(): [
  state : State<T>,
  get: (resource: RequestInfo | URL) => void,
  reset: () => void
] {
  const [state, setState] = useState<State<T>>(initialState);

  async function get(resource: RequestInfo | URL) {
    setState({
      data: null,
      loading: true,
      error: null
    });
    try {
      const response = await fetch(resource);
      const data = await handleResponse(response);
      setState({
        data,
        loading: false,
        error: null
      });
    } catch(e: unknown) {
      setState({
        data: null,
        loading: false,
        error: e as Error
      });
    }
  }

  function reset() {
    setState(initialState);
  }

  return [state, get, reset];
}