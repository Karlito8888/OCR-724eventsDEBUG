import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("When Form is created", () => {
  it("displays form fields", async () => {
    render(<Form />);
    await screen.findByLabelText("Nom");
    await screen.findByLabelText("Prénom");
    await screen.findByLabelText("Email");

    // Si le label "Personel / Entreprise" est dans un autre élément
    // Essayez de le trouver différemment ou vérifiez son existence avec un sélecteur
    const selectLabel = screen.queryByText("Personel / Entreprise");
    expect(selectLabel).toBeInTheDocument();
  });

  describe("and the form is submitted", () => {
    it("calls the success action", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      // Remplir le formulaire
      fireEvent.change(screen.getByLabelText("Nom"), {
        target: { value: "John" },
      });
      fireEvent.change(screen.getByLabelText("Prénom"), {
        target: { value: "Doe" },
      });
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "john.doe@example.com" },
      });
      fireEvent.change(screen.getByLabelText("Message"), {
        target: { value: "Hello, world!" },
      });

      fireEvent.submit(screen.getByTestId("button-test-id"));

      await screen.findByText("En cours");
      await screen.findByText("Envoyer");
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
