import { render, screen, fireEvent } from "@testing-library/react";
import { useData } from "../../contexts/DataContext";
import Home from "./index";

jest.mock("../../contexts/DataContext", () => ({
  useData: jest.fn(),
}));

describe("When a page is created", () => {
  beforeEach(() => {
    useData.mockReturnValue({
      last: {
        cover: "/images/event-cover.png",
        title: "Dernière prestation",
        date: "2024-09-09",
      },
    });
  });

  it("a list of events is displayed", () => {
    // to implement
    render(<Home />);
    const elements = screen.getAllByText("Nos réalisations");
    expect(elements).toHaveLength(2);
  });

  it("a list of people is displayed", () => {
    // to implement
    render(<Home />);
    expect(screen.getByText("Samira")).toBeInTheDocument();
    expect(screen.getByText("Jean-baptiste")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Luís")).toBeInTheDocument();
    expect(screen.getByText("Christine")).toBeInTheDocument();
    expect(screen.getByText("Isabelle")).toBeInTheDocument();
  });

  it("a footer is displayed", () => {
    // to implement
    render(<Home />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByText("Notre derniére prestation")).toBeInTheDocument();
    expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
    expect(
      screen.getByText("45 avenue de la République, 75000 Paris")
    ).toBeInTheDocument();
    expect(screen.getByText("01 23 45 67 89")).toBeInTheDocument();
    expect(screen.getByText("contact@724events.com")).toBeInTheDocument();
  });

  describe("When Form is created", () => {
    it("a list of fields card is displayed", async () => {
      render(<Home />);
      await screen.findByText("Email");
      await screen.findByText("Nom");
      await screen.findByText("Prénom");
      await screen.findByText("Personel / Entreprise");
    });

    describe("and a click is triggered on the submit button", () => {
      it("the success message is displayed", async () => {
        render(<Home />);
        fireEvent.click(await screen.findByText("Envoyer"));
        await screen.findByText("En cours");
        await screen.findByText("Message envoyé !");
      });
    });
  });

  describe("When no events are available", () => {
    // to implement
    beforeEach(() => {
      useData.mockReturnValue({
        last: null,
      });
    });

    it("displays the message 'Aucun événement disponible'", () => {
      render(<Home />);
      expect(
        screen.getByText(/Aucun événement disponible/i)
      ).toBeInTheDocument();
    });
  });
});
