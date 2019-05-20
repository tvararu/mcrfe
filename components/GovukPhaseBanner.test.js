import renderer from "react-test-renderer";
import GovukPhaseBanner from "./GovukPhaseBanner";

describe("GovukPhaseBanner", () => {
  it("renders correctly", () => {
    const component = renderer.create(<GovukPhaseBanner />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
