import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 6;

const EventList = () => {
  const { data, error } = useData();
  // const [type, setType] = useState();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // On filtre les événements en fonction du type sélectionné (avant la pagination)
  const events = data?.events || [];
  const filteredEvents = !type
    ? events
    : events.filter((event) => event.type === type);

  // Calculer le nombre de pages (basé sur tous les événements filtrés)
  // const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE);

  // Filtrer les événements pour la page courante
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  const typeList = new Set(events.map((event) => event.type));

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "Chargement..."
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            // onChange={(value) => (value ? changeType(value) : changeType(null))}
            onChange={changeType}
          />
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    // date={new Date(event.date)}
                    periode={event.periode}
                    label={event.type}
                    showGetMonth={false}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;

