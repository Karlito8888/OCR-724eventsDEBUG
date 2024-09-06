import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  // Ajout de l'état `last`
  const [last, setLast] = useState(null); 

  // const getData = useCallback(async () => {
  //   try {
  //     setData(await api.loadData());
  //   } catch (err) {
  //     setError(err);
  //   }
  // }, []);
  // useEffect(() => {
  //   if (data) return;
  //   getData();
  // });
  const getData = useCallback(async () => {
    try {
      const loadedData = await api.loadData();
      setData(loadedData);
      if (loadedData && loadedData.focus && loadedData.focus.length > 0) {
        setLast(loadedData.focus[loadedData.focus.length - 1]); // Définir `last` comme le dernier élément
      }
    } catch (err) {
      setError(err);
    }
  }, []);

   useEffect(() => {
     if (data) return;
     getData();
   }, [data, getData]);


  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last, // Ajout de `last` au contexte
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
