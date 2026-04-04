import { getSeries, getAllEntries } from './firestore_database';

export const animeFinished = async (user) => {
  let numberofAnimeFinished = 0;
  const series = await getSeries(user);
  const seriesWithEntries = series.filter((s) => s.totalEntries > 0);
  seriesWithEntries.forEach((series) => {
    numberofAnimeFinished += series.totalEntries;
  });
  return numberofAnimeFinished;
};

export const episodesWatched = async (user) => {
  let numberofEpisodesWatched = 0;
  const entries = await getAllEntries(user);
  entries.forEach((entry) => {
    numberofEpisodesWatched += entry.totalEpisode;
  });
  return numberofEpisodesWatched;
};

export const typesWatched = async (user, type) => {
  let numberofTypeWatched = 0;
  const entries = await getAllEntries(user);
  entries.forEach((entry) => {
    if (entry.type === type) {
      numberofTypeWatched += entry.totalEpisode;
    }
  });
  return numberofTypeWatched;
};
