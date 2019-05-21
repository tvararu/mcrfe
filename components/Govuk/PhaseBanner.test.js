import renderer from "react-test-renderer";
import PhaseBanner from "./PhaseBanner";

describe("PhaseBanner", () => {
  it("renders correctly", () => {
    const component = renderer.create(<PhaseBanner />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
