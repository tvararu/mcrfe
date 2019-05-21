import renderer from "react-test-renderer";
import SkipLink from "./SkipLink";

describe("SkipLink", () => {
  it("renders correctly", () => {
    const component = renderer.create(<SkipLink />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
