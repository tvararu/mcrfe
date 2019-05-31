import renderer from "react-test-renderer";
import { render, fireEvent, cleanup } from "@testing-library/react";
import PhaseBanner from "./PhaseBanner";

describe("PhaseBanner", () => {
  it("renders correctly", () => {
    const component = renderer.create(<PhaseBanner />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe("behaviour", () => {
    afterEach(cleanup);

    it("renders correctly", () => {
      const { container } = render(<PhaseBanner />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
