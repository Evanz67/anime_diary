'use client';

import { useState, useEffect, createContext, useContext } from 'react';

const dataContext = createContext();

export function DataProvider({ children }) {
  const [unprocessedData, setUnprocessedData] = useState({});
  const [data, setData] = useState({});
  const [addSeriesId, setAddSeriesId] = useState('');
  const [getSeriesId, setGetSeriesId] = useState('');

  const passData = (state, action) => {
    setUnprocessedData((prev) => ({ ...prev, ...newData }));
  };

  useEffect(() => {
    const processData = () => {
      const {
        addSeriesId: addSID,
        getSeriesId: getSID,
        ...processedData
      } = unprocessedData;
      if (addSID && addSID !== addSeriesId) {
        setAddSeriesId(addSID);
      }
      if (getSID) {
        setGetSeriesId(getSID);
      }
      setData((prev) => ({ ...prev, ...processedData }));
    };
    processData();
  }, [unprocessedData]);

  const value = {
    passData,
    data,
    addSeriesId,
    getSeriesId,
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export const useData = () => useContext(dataContext);
