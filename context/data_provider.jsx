'use client';

import { useState, useEffect, createContext, useContext } from 'react';

const dataContext = createContext();

export function DataProvider({ children }) {
  const [unprocessedData, setUnprocessedData] = useState({});
  const [currentSeriesId, setCurrentSeriesId] = useState('');
  const [currentEntriesId, setCurrentEntriesId] = useState('');
  const [selectedAnimeName, setSelectedAnimeName] = useState('');
  const [entryName, setEntryName] = useState('');
  const [deleteSeriesState, setDeleteSeriesState] = useState(false);
  const [deleteEntriesState, setDeleteEntriesState] = useState(false);

  const passData = (newData) => {
    setUnprocessedData((prev) => ({ ...prev, ...newData }));
  };

  useEffect(() => {
    const processData = () => {
      const { action, ...dataBeingProcessed } = unprocessedData;
      switch (action) {
        case 'currentSeries':
          setCurrentSeriesId(dataBeingProcessed.currentSeriesId);
          setSelectedAnimeName(dataBeingProcessed.selectedAnimeName);
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
          console.log('The action is: ' + action);
          break;
      }
    };
    processData();
  }, [unprocessedData]);

  const value = {
    passData,
    currentSeriesId,
    currentEntriesId,
    selectedAnimeName,
    entryName,
    deleteSeriesState,
    deleteEntriesState,
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export const useData = () => useContext(dataContext);
