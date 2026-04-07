'use client';

import { useState, useEffect, createContext, useContext } from 'react';

const dataContext = createContext();

export function DataProvider({ children }) {
  const [unprocessedData, setUnprocessedData] = useState({});
  const [addSeriesId, setAddSeriesId] = useState('');
  const [currentSeriesId, setCurrentSeriesId] = useState('');
  const [addEntriesId, setAddEntriesId] = useState('');
  const [currentEntriesId, setCurrentEntriesId] = useState('');
  const [totalEntries, setTotalEntries] = useState(0);
  const [animeName, setAnimeName] = useState('');
  const [entryName, setEntryName] = useState('');
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
        case 'currentSeries':
          setCurrentSeriesId(dataBeingProcessed.currentSeriesId);
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
        case 'currentEntries':
          setCurrentEntriesId(dataBeingProcessed.currentEntriesId);
          setEntryName(dataBeingProcessed.entryName);
          break;
        case 'deleteSeries':
          if (deleteSeriesState === false) {
            setDeleteSeriesState(true);
            break;
          }
          setDeleteSeriesState(false);
          break;
        case 'deleteEntries':
          if (deleteEntriesState === false) {
            setDeleteEntriesState(true);
            break;
          }
          setDeleteEntriesState(false);
          break;
        default:
          console.log(action);
          break;
      }
    };
    processData();
  }, [unprocessedData]);

  const value = {
    passData,
    addSeriesId,
    currentSeriesId,
    addEntriesId,
    currentEntriesId,
    totalEntries,
    animeName,
    entryName,
    entryDetails,
    deleteSeriesState,
    deleteEntriesState,
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export const useData = () => useContext(dataContext);
