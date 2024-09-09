import {render, screen } from "@testing-library/react";
import Page from "./index";
import { useData } from "../../contexts/DataContext";

// describe("When Form is created", () => {
//   it("a list of fields card is displayed", async () => {
//     render(<Home />);
//     await screen.findByText("Email");
//     await screen.findByText("Nom");
//     await screen.findByText("Prénom");
//     await screen.findByText("Personel / Entreprise");
//   });

//   describe("and a click is triggered on the submit button", () => {
//     it("the success message is displayed", async () => {
//       render(<Home />);
//       fireEvent(
//         await screen.findByText("Envoyer"),
//         new MouseEvent("click", {
//           cancelable: true,
//           bubbles: true,
//         })
//       );
//       await screen.findByText("En cours");
//       await screen.findByText("Message envoyé !");
//     });
//   });

// });


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
    render(<Page />);
    const elements = screen.getAllByText("Nos réalisations");
    expect(elements).toHaveLength(2);
    // <a href="#nos-realisations">Nos réalisations</a>
    // <h2 className="Title">Nos réalisations</h2>
  });

  it("a list of people is displayed", () => {
    render(<Page />);
    // On vérifie que les cartes des personnes sont présentes
    expect(screen.getByText("Samira")).toBeInTheDocument();
    expect(screen.getByText("Jean-baptiste")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Luís")).toBeInTheDocument();
    expect(screen.getByText("Christine")).toBeInTheDocument();
    expect(screen.getByText("Isabelle")).toBeInTheDocument();
  });

  it("a footer is displayed", () => {
    render(<Page />);
    // On vérifie que le footer est affiché
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByText("Notre derniére prestation")).toBeInTheDocument();
    expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
    expect(
      screen.getByText("45 avenue de la République, 75000 Paris")
    ).toBeInTheDocument();
    expect(screen.getByText("01 23 45 67 89")).toBeInTheDocument();
    expect(screen.getByText("contact@724events.com")).toBeInTheDocument();
  });

  describe("When no events are available", () => {
    beforeEach(() => {
      useData.mockReturnValue({
        last: null,
      });
    });

    it("displays the message 'Aucune prestation disponible'", () => {
      render(<Page />);
      expect(
        screen.getByText("Aucune prestation disponible.")
      ).toBeInTheDocument();
    });
  });
});
