import { fireEvent, render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPES } from "./index";

describe("When a button is created", () => {
  it("the button must include a title", () => {
    render(<Button title="my-button" type={BUTTON_TYPES.DEFAULT} />);
    const buttonElement = screen.getByTitle("my-button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("the button must display a label", () => {
    render(<Button>label</Button>);
    const buttonElement = screen.getByText(/label/);
    expect(buttonElement).toBeInTheDocument();
  });

  describe("and it's clicked", () => {
    it("an event onClick it executed", () => {
      const onClick = jest.fn();
      render(<Button onClick={onClick} />);
      const buttonElement = screen.getByTestId("button-test-id");
      fireEvent(
        buttonElement,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
      expect(onClick.mock.calls.length).toBeGreaterThan(0);
    });
  });

  describe("and selected type is submit", () => {
    it("an input submit is created", () => {
      render(<Button type={BUTTON_TYPES.SUBMIT}>label</Button>);
      const buttonElement = screen.getByTestId("button-test-id");
      expect(buttonElement.type).toEqual("submit");
    });
  });

  // -----------------------------------
  // AJOUT DE DEUX TESTS UNITAIRES
  
  // Nouveau test pour vérifier si le bouton est désactivé
  it("the button should be disabled when the disabled prop is true", () => {
    render(<Button disabled>label</Button>);
    const buttonElement = screen.getByTestId("button-test-id");
    expect(buttonElement).toBeDisabled();
  });

  // Nouveau test pour vérifier l'interaction au clavier (accessibilité)
  it("should trigger onClick when space or enter is pressed", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>label</Button>);
    const buttonElement = screen.getByTestId("button-test-id");

    fireEvent.keyDown(buttonElement, { key: "Enter", code: "Enter" });
    fireEvent.keyDown(buttonElement, { key: " ", code: "Space" });

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
