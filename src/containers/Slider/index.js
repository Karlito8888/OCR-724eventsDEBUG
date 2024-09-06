import { useEffect, useState, useCallback, useMemo } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Utiliser useMemo pour mémoriser la valeur de byDateAsc
  const byDateAsc = useMemo(() => {
    if (!data?.focus) return [];
    return (data.focus || []).sort((evtA, evtB) => {
      const dateA = new Date(evtA.date);
      const dateB = new Date(evtB.date);
      return dateA - dateB;
    });
  }, [data]);

  const nextCard = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % byDateAsc.length);
  }, [byDateAsc.length]);

  useEffect(() => {
    if (byDateAsc.length > 0) {
      const interval = setInterval(nextCard, 5000);
      return () => clearInterval(interval);
    }
    // Ajout d'un return explicite pour les cas où byDateAsc.length est 0
    return undefined;
  }, [byDateAsc, nextCard]);

  //
  const handleRadioChange = (newIndex) => {
    setIndex(newIndex);
  };

  return (
    <div className="SlideCardList">
      {byDateAsc.map((ev, idx) => (
        <div key={ev.id} className="SlideCardContainer">
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={ev.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{ev.title}</h3>
                <p>{ev.description}</p>
                <div>{getMonth(new Date(ev.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateAsc.map((evPagination, paginationIndex) => (
                <input
                  key={evPagination.id}
                  type="radio"
                  name="radio-button"
                  // checked={index === byDateAsc.indexOf(evPagination)}
                  checked={index === paginationIndex}
                  onChange={() => handleRadioChange(paginationIndex)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
