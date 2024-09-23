import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Trier les événements par date croissante (ordre ascendant)
  const byDateAsc = data?.focus?.length
    ? data.focus.sort((evtA, evtB) => new Date(evtA.date) - new Date(evtB.date))
    : [];

  // Fonction pour passer à la carte suivante
  const nextCard = () => {
    setIndex((prevIndex) =>
      prevIndex < byDateAsc.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Utilisation de useEffect pour gérer la temporisation
  useEffect(() => {
    if (byDateAsc.length > 0) {
      const timer = setTimeout(nextCard, 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [index, byDateAsc.length]);

  if (byDateAsc.length === 0) return null;

  return (
    <div className="SlideCardList">
      {byDateAsc.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateAsc.map((event, radioIdx) => (
            <input
              key={event.title} // Utilisation du titre comme clé pour les boutons radio
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

