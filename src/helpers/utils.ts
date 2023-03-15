export function createURL({
  url,
  searchParams
}: {
  url: string,
  searchParams: {
    page: string,
    per_page: string,
    search: string,
  }
}) {
  const newUrl = new URL(url);
  newUrl.searchParams.append('page', searchParams.page || '0');
  newUrl.searchParams.append('per_page', searchParams.per_page || '5');
  newUrl.searchParams.append('search', searchParams.search);
  return newUrl;
}

export function formatPlayerHeight(feet: number | null, inches: number | null) {
  let height = (feet !== null && inches !== null) ? `${feet}'${inches}"` : '??';
  return height.replace('0"', '');
}

export function formatPlayerWeight(weight: number | null) {
  return weight !== null ? `${weight}lbs` : '??';
}