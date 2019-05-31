import renderer from "react-test-renderer";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Header from "./Header";
jest.mock("next/link");

describe("Header", () => {
  it("renders correctly", () => {
    const component = renderer.create(<Header />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe("when mounted", () => {
    afterEach(cleanup);

    it("renders as closed after being mounted", () => {
      const { getByText, container } = render(<Header />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("opens on click", () => {
      const { getByText, container } = render(<Header />);
      fireEvent.click(getByText("Menu"));
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
