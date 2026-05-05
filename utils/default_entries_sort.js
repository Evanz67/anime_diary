// This function sorts the entries by their created date in ascending order (oldest to newest) as a default.
export function defaultEntriesSort(unsortedEntries) {
  const sortedData = [...unsortedEntries].sort((a, b) => {
    const dateA = new Date(a.created);
    const dateB = new Date(b.created);
    return dateA - dateB;
  });

  return sortedData;
}
