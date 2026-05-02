'use client';

import { useState, useEffect, createContext, useContext } from 'react';

const dataContext = createContext();
const dataKeyContext = createContext();

const STATIC_DATA_KEY = {
  seriesColumn: [
    { accessorKey: 'animeName', header: 'Anime Series' },
    { accessorKey: 'totalEntries', header: '# of Entries' },
    {
      accessorKey: 'created',
      header: 'Created',
      enableSorting: true,
      enableHiding: true,
    },
  ],
  entriesColumn: [
    { accessorKey: 'entryName', header: 'Entry Name' },
    { accessorKey: 'totalEpisode', header: '# of Episodes' },
    { accessorKey: 'rating', header: 'Rating' },
    { accessorKey: 'type', header: 'Type' },
  ],
  seriesKey: { animeName: 'animeName', totalEntries: 'totalEntries' },
  entriesKey: {
    entryName: 'entryName',
    totalEpisode: 'totalEpisode',
    rating: 'rating',
    type: 'type',
  },
};

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

  /* Will keep it like this for now, but if there are more data to be passed 
  around or if the app runs slow, I might need to create a seperate context 
  and split up the data. Right now it runs fine. */
  const value = {
    passData,
    currentSeriesId,
    currentEntriesId,
    selectedAnimeName,
    entryName,
    deleteSeriesState,
    deleteEntriesState,
  };

  const dataKeyValue = STATIC_DATA_KEY;

  return (
    <dataContext.Provider value={value}>
      <dataKeyContext.Provider value={dataKeyValue}>
        {children}
      </dataKeyContext.Provider>
    </dataContext.Provider>
  );
}

// Might add some error handling here later if needed
export const useData = () => useContext(dataContext);
export const useDataKey = () => useContext(dataKeyContext);
