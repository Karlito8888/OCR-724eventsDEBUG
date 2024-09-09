import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
  INPUT_EMAIL: 3, // Ajout du type email
};

const Field = ({
  type = FIELD_TYPES.INPUT_TEXT,
  label,
  name,
  id,
  placeholder,
  onChange,
}) => {
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          name={name}
          id={id} // Ajout de l'attribut id
          placeholder={placeholder}
          data-testid="field-testid"
          onChange={onChange}
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = (
        <textarea
          name={name}
          id={id} // Ajout de l'attribut id
          data-testid="field-testid"
          onChange={onChange}
        />
      );
      break;
    case FIELD_TYPES.INPUT_EMAIL:
      component = (
        <input
          type="email"
          name={name}
          id={id} // Ajout de l'attribut id
          placeholder={placeholder}
          data-testid="field-testid"
          onChange={onChange}
        />
      );
      break;
    default:
      component = (
        <input
          type="text"
          name={name}
          id={id} // Ajout de l'attribut id
          placeholder={placeholder}
          data-testid="field-testid"
          onChange={onChange}
        />
      );
  }
  return (
    <div className="inputField">
      {label && <label htmlFor={id}>{label}</label>}{" "}
      {/* Utilisation de label avec htmlFor */}
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string.isRequired, // Ajout de la validation pour id
};

Field.defaultProps = {
  label: "",
  placeholder: "",
  type: FIELD_TYPES.INPUT_TEXT,
  name: "field-name",
  onChange: () => {},
};

export default Field;