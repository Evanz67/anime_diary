'use client';

import { useState, useEffect, createContext, useContext } from 'react';

const dataContext = createContext();

export function DataProvider({ children }) {
  const [unprocessedData, setUnprocessedData] = useState({});
  const [addSeriesId, setAddSeriesId] = useState('');
  const [getSeriesId, setGetSeriesId] = useState('');
  const [addEntriesId, setAddEntriesId] = useState('');
  const [totalEntries, setTotalEntries] = useState(0);
  const [animeName, setAnimeName] = useState('');
  const [entryDetails, setEntryDetails] = useState({});
  const [deleteSeriesState, setDeleteSeriesState] = useState(false);
  const [deleteEntriesState, setDeleteEntriesState] = useState(false);

  const passData = (newData) => {
    setUnprocessedData((prev) => ({ ...prev, ...newData }));
  };

  useEffect(() => {
    const processData = () => {
      const { action, ...dataBeingProcessed } = unprocessedData;
      switch (action) {
        case 'addSeries':
          setAddSeriesId(dataBeingProcessed.addSeriesId);
          setAnimeName(dataBeingProcessed.animeName);
          break;
        case 'getSeries':
          setGetSeriesId(dataBeingProcessed.getSeriesId);
          setAnimeName(dataBeingProcessed.animeName);
          break;
        case 'addEntries':
          setAddEntriesId(dataBeingProcessed.addEntriesId);
          setTotalEntries(dataBeingProcessed.totalEntries);
          setEntryDetails({
            entryName: dataBeingProcessed.entryName,
            totalEpisode: dataBeingProcessed.totalEpisode,
            type: dataBeingProcessed.type,
          });
          break;
        case 'deleteSeries':
          if (deleteSeriesState === false) {
            setDeleteSeriesState(true);
            break;
          }
          setDeleteSeriesState(false);
          break;
      }
    };
    processData();
  }, [unprocessedData]);

  const value = {
    passData,
    addSeriesId,
    getSeriesId,
    addEntriesId,
    totalEntries,
    animeName,
    entryDetails,
    deleteSeriesState,
    deleteEntriesState,
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export const useData = () => useContext(dataContext);
