import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Select from "../../components/Select";
import Field, { FIELD_TYPES } from "../../components/Field";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();

      const form = evt.target;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        onSuccess(); // Appel de onSuccess après la soumission réussie
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field id="nom" placeholder="" label="Nom" required />
          <Field id="prenom" placeholder="" label="Prénom" required />
          <Select
            id="type"
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            id="email"
            placeholder=""
            label="Email"
            type={FIELD_TYPES.INPUT_EMAIL}
            required
          />
          <Button
            type={BUTTON_TYPES.SUBMIT}
            disabled={sending}
            data-testid="button-test-id"
          >
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            id="message"
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            required
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
