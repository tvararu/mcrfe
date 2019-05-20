import renderer from "react-test-renderer";
import GovukHeader from "./GovukHeader";
jest.mock("next/link");

describe("GovukHeader", () => {
  it("renders correctly", () => {
    const component = renderer.create(<GovukHeader />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
