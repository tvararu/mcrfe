import renderer from "react-test-renderer";
import Main from "./Main";

describe("Main", () => {
  it("renders correctly", () => {
    const component = renderer.create(<Main>Lorem</Main>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
