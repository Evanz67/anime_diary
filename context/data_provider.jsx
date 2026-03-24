'use client';

import { useState, useEffect, createContext, useContext } from 'react';

const dataContext = createContext();

export function DataProvider({ children }) {
  const [unprocessedData, setUnprocessedData] = useState({});
  const [data, setData] = useState({});
  const [seriesId, setSeriesId] = useState('');

  const passData = (newData) => {
    setUnprocessedData((prev) => ({ ...prev, ...newData }));
  };

  useEffect(() => {
    const processData = () => {
      const { seriesId: sid, ...processedData} = unprocessedData;
      if (sid && sid !== seriesId) {
        setSeriesId(sid);
      }
      setData((prev) => ({ ...prev, ...processedData }));
    };
    processData();
  }, [unprocessedData]);

  const value = {
    passData,
    data,
    seriesId,
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export const useData = () => useContext(dataContext);
