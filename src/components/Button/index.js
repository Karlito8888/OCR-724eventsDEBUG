import PropTypes from "prop-types";

import "./style.scss";

export const BUTTON_TYPES = {
  // DEFAULT: 1,
  // SUBMIT: 2,
  DEFAULT: "default",
  SUBMIT: "submit",
};

const Button = ({ title, onClick, type, disabled, children }) => {
   const handleKeyDown = (event) => {
     if (event.key === "Enter" || event.key === " ") {
       onClick();
     }
   };
  switch (type) {
    case BUTTON_TYPES.DEFAULT:
      return (
        <button
          type="button"
          disabled={disabled}
          className="Button"
          data-testid="button-test-id"
          onClick={onClick}
          onKeyDown={handleKeyDown}
          title={title}
        >
          {children}
        </button>
      );
    case BUTTON_TYPES.SUBMIT:
      return (
        // <input
        //   disabled={disabled}
        //   className="Button"
        //   type="submit"
        //   data-testid="button-test-id"
        //   value={children}
        //   onClick={onClick}
        //   title={title}
        // />
        <button
          type="submit"
          disabled={disabled}
          className="Button"
          data-testid="button-test-id"
          onClick={onClick}
          onKeyDown={handleKeyDown}
          title={title}
        >
          {children}
        </button>
      );
    default:
      return (
        <button
          type="button"
          disabled={disabled}
          className="Button"
          data-testid="button-test-id"
          onClick={onClick}
          onKeyDown={handleKeyDown}
          title={title}
        >
          {children}
        </button>
      );
  }
};

// eslint-disable-next-line react/no-typos
Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
  disabled: PropTypes.bool,
  children: PropTypes.node,
};
Button.defaultProps = {
  disabled: false,
  onClick: () => null,
  type: BUTTON_TYPES.DEFAULT,
  title: "",
  children: null
}

export default Button;
