'use client';

import { CardDashboard } from '@/components/custom/card_dashboard';
import {
  animeFinished,
  episodesWatched,
  typesWatched,
} from '@/backend/dashboard_data';
import { useAuth } from '@/backend/auth_provider';
import { useState, useEffect } from 'react';

export default function Home() {
  const { user } = useAuth();
  const [animeFinishedCount, setAnimeFinishedCount] = useState(0);
  const [episodesWatchedCount, setEpisodesWatchedCount] = useState(0);
  const [TVWatchedCount, setTVWatchedCount] = useState(0);
  const [moviesWatchedCount, setMoviesWatchedCount] = useState(0);
  const [ovaWatchedCount, setOVAWatchedCount] = useState(0);
  const [onaWatchedCount, setONAWatchedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setAnimeFinishedCount(await animeFinished(user));
        setEpisodesWatchedCount(await episodesWatched(user));
        setTVWatchedCount(await typesWatched(user, 'TV'));
        setMoviesWatchedCount(await typesWatched(user, 'Movie'));
        setOVAWatchedCount(await typesWatched(user, 'OVA'));
        setONAWatchedCount(await typesWatched(user, 'ONA'));
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="flex-1 flex flex-col justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center mx-auto gap-3">
        <CardDashboard title="Anime Finished">
          <p>{animeFinishedCount}</p>
        </CardDashboard>
        <CardDashboard title="All Types Watched">
          <p>{episodesWatchedCount}</p>
        </CardDashboard>
        <CardDashboard title="TV Watched">
          <p>{TVWatchedCount}</p>
        </CardDashboard>
        <CardDashboard title="Movies Watched">
          <p>{moviesWatchedCount}</p>
        </CardDashboard>
        <CardDashboard title="OVA Watched">
          <p>{ovaWatchedCount}</p>
        </CardDashboard>
        <CardDashboard title="ONA Watched">
          <p>{onaWatchedCount}</p>
        </CardDashboard>
      </div>
    </div>
  );
}
