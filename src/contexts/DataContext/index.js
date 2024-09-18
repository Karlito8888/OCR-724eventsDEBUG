import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// Fonction pour obtenir le dernier événement
const getLatestEvent = (events) =>
  events.reduce(
    (latest, event) =>
      new Date(event.date) > new Date(latest.date) ? event : latest,
    events[0]
  );

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
  const [latestEvent, setLatestEvent] = useState(null);

  const getData = useCallback(async () => {
    try {
      const response = await api.loadData();
      setData(response);

      if (response && response.events) {
        const latest = getLatestEvent(response.events);
        setLatestEvent(latest);
      }
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (!data) {
      getData();
    }
  }, [data, getData]);

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        latestEvent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;

