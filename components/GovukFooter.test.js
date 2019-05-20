import renderer from "react-test-renderer";
import GovukFooter from "./GovukFooter";

describe("GovukFooter", () => {
  it("renders correctly", () => {
    const component = renderer.create(<GovukFooter />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
