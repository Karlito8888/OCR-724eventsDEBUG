import { render, screen, fireEvent } from "@testing-library/react";
import Menu from "./index";

describe("When Menu is created", () => {
  it("a list of mandatory links and the logo are displayed", async () => {
    render(<Menu />);

    // Vérifie la présence des éléments
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });

  describe("and a click is triggered on the contact button", () => {
    it("document location hash changes to #contact", () => {
      // Sauvegarder l'état actuel du hash pour le réinitialiser plus tard
      const originalHash = window.location.hash;
      render(<Menu />);

      // Simule le clic sur le bouton Contact
      fireEvent.click(screen.getByText("Contact"));

      // Vérifie que le hash a été mis à jour
      expect(window.location.hash).toEqual("#contact");

      // Réinitialise le hash pour éviter les effets secondaires sur les autres tests
      window.location.hash = originalHash;
    });
  });
});
