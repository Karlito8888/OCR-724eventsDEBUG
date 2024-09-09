import { render, screen } from "@testing-library/react";
import md5 from "md5";
import Icon from ".";

describe("Icon component", () => {
  describe("When an icon is created with name twitch", () => {
    it("the icon contains this path hash value 327fbc38c8e878259c3ec35ef231517a", () => {
      render(<Icon name="twitch" />);
      expect(md5(screen.getByTestId("icon-twitch").getAttribute("d"))).toEqual(
        "327fbc38c8e878259c3ec35ef231517a"
      );
    });
  });

  describe("When an icon is created with name facebook", () => {
    it("the icon contains this path hash value bbea4c9e40773b969fdb6e406059f853", () => {
      render(<Icon name="facebook" />);
      expect(
        md5(screen.getByTestId("icon-facebook").getAttribute("d"))
      ).toEqual("bbea4c9e40773b969fdb6e406059f853");
    });
  });

  describe("When an icon is created with name twitter", () => {
    it("the icon contains this path hash value 82f5be4a5c07199cb75dacec50b90b2a", () => {
      render(<Icon name="twitter" />);
      expect(md5(screen.getByTestId("icon-twitter").getAttribute("d"))).toEqual(
        "82f5be4a5c07199cb75dacec50b90b2a"
      );
    });
  });

  describe("When an icon is created with name youtube", () => {
    it("the icon contains this path hash value 43342876c2fc40e5b2afe621443ff95b", () => {
      render(<Icon name="youtube" />);
      expect(md5(screen.getByTestId("icon-youtube").getAttribute("d"))).toEqual(
        "43342876c2fc40e5b2afe621443ff95b"
      );
    });
  });

//   describe("When an icon is created with name close", () => {
//     it("the icon contains this path hash value 35f4b2fc53d19cc8d04c8dfb0c0b3c4e", () => {
//       render(<Icon name="close" />);
//       expect(md5(screen.getByTestId("icon-close").getAttribute("d"))).toEqual(
//         "35f4b2fc53d19cc8d04c8dfb0c0b3c4e"
//       );
//     });
//   });
});
