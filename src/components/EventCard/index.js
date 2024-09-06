import PropTypes from "prop-types";
// import { getMonth } from "../../helpers/Date";
import "./style.scss";

// Fonction pour extraire le mois de la "periode"
const extractMonthFromPeriode = (periode) => {
  if (!periode || typeof periode !== "string") {
    return "";
  }
  const parts = periode.split(" "); // ["24-25-26", "Février"]
  return parts[parts.length - 1]; // accède au dernier élément du tableau
};

const EventCard = ({
  imageSrc,
  imageAlt,
  // date,
  periode,
  title,
  label,
  small = false,
  ...props
}) => {
  const month = extractMonthFromPeriode(periode); // stocke le mois extrait de "periode"

  return (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        {/* <div className="EventCard__month">{getMonth(date)}</div> */}
        <div className="EventCard__month">{month}</div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  // date: PropTypes.instanceOf(Date).isRequired,
  periode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
};

export default EventCard;
