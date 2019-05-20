import renderer from "react-test-renderer";
import GovukMain from "./GovukMain";

describe("GovukMain", () => {
  it("renders correctly", () => {
    const component = renderer.create(<GovukMain>Lorem</GovukMain>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
