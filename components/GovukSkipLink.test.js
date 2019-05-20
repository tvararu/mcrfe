import renderer from "react-test-renderer";
import GovukSkipLink from "./GovukSkipLink";

describe("GovukSkipLink", () => {
  it("renders correctly", () => {
    const component = renderer.create(<GovukSkipLink />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
