import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";

describe("When Menu is created", () => {
  it("a list of mandatory links and the logo are displayed", async () => {
    render(<Menu />);

    expect(await screen.findByText("Nos services")).toBeInTheDocument();
    expect(await screen.findByText("Nos réalisations")).toBeInTheDocument();
    expect(await screen.findByText("Notre équipe")).toBeInTheDocument();
    expect(await screen.findByText("Contact")).toBeInTheDocument();
  });

  describe("and a click is triggered on the contact button", () => {
    it("document location hash changes", () => {
      // Mock window.location.hash to avoid changing the real location
      delete window.location;
      window.location = { hash: "" };

      render(<Menu />);

      fireEvent.click(screen.getByText("Contact"));

      expect(window.location.hash).toEqual("#contact");
    });
  });
});
