export default function handleResponse(response: Response) {
  if (response.ok) {
    return response.json();
  }
  
  throw Error(`Error ${response.status} ${response.statusText}`);
}