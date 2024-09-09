import { render, screen } from "@testing-library/react";
import ModalEvent from "./index";

const data = {
  type: "soirée entreprise",
  date: "2022-04-29T20:28:45.744Z",
  title: "Conférence #productCON",
  cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
  description:
    "Présentation des outils analytics aux professionnels du secteur",
  nb_guesses: 1300,
  periode: "24-25-26 Février",
  prestations: [
    "1 espace d’exposition",
    "1 scéne principale",
    "2 espaces de restaurations",
    "1 site web dédié",
  ],
};

describe("When ModalEvent is rendered", () => {
  it("should display mandatory data correctly", async () => {
    render(<ModalEvent event={data} />);

    expect(screen.getByText("Conférence #productCON")).toBeInTheDocument();
    expect(screen.getByText("24-25-26 Février")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Présentation des outils analytics aux professionnels du secteur"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("1300 participants")).toBeInTheDocument();

    data.prestations.forEach((prestation) => {
      expect(screen.getByText(prestation)).toBeInTheDocument();
    });
  });
});
