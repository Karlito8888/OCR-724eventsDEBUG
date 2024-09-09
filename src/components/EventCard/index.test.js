import { render, screen } from "@testing-library/react";
import EventCard from "./index";

describe("When a event card is created", () => {
  it("an image is display with alt value", () => {
    render(
      <EventCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        date={new Date("2022-04-01")}
        title="test event"
        label="test label"
      />
    );
    const imageElement = screen.getByTestId("card-image-testid");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.alt).toEqual("image-alt-text");
  });
  it("a title and a label are displayed", () => {
    render(
      <EventCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        title="test event"
        label="test label"
        date={new Date("2022-04-01")}
      />
    );
    const titleElement = screen.getByText(/test event/);
    // const monthElement = screen.getByText(/avril/);
    const labelElement = screen.getByText(/test label/);
    expect(titleElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    // expect(monthElement).toBeInTheDocument();
  });
  describe("with small props", () => {
    it("a modifier small is added", () => {
      render(
        <EventCard
          imageSrc="http://src-image"
          imageAlt="image-alt-text"
          title="test event"
          label="test label"
          date={new Date("2022-04-01")}
          small
        />
      );
      const cardElement = screen.getByTestId("card-testid");
      expect(cardElement.className.includes("EventCard--small")).toEqual(true);
    });
  });

  // -----------------------------------
  // AJOUT DE DEUX TESTS UNITAIRES

  // On vérifie que le mois correct est affiché en fonction de la date passée dans les props.
  describe("when showGetMonth is true", () => {
    it("should display the month from date", () => {
      render(
        <EventCard
          imageSrc="http://src-image"
          imageAlt="image-alt-text"
          title="test event"
          label="test label"
          date={new Date("2022-04-01")}
        />
      );
      // On s'assure que 'avril' est le mois attendu pour la date fournie
      const monthElement = screen.getByText(/avril/);
      expect(monthElement).toBeInTheDocument();
    });
  });

  // On vérifie que si showGetMonth est à false, le composant affiche le mois de la prop periode.
  describe("when showGetMonth is false", () => {
    it("should display the month from periode", () => {
      render(
        <EventCard
          imageSrc="http://src-image"
          imageAlt="image-alt-text"
          title="test event"
          label="test label"
          date={new Date("2022-04-01")}
          periode="24-25-26 Février"
          showGetMonth={false}
        />
      );
      // On affiche le mois spécifié dans la prop periode
      const monthElement = screen.getByText(/Février/);
      expect(monthElement).toBeInTheDocument();
    });
  });
});
