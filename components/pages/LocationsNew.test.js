import renderer from "react-test-renderer";
import LocationsNew from "./LocationsNew";

jest.mock("../elements/Query", () => ({ children }) =>
  children({
    data: {
      allProviders: {
        nodes: [
          {
            providerName: "Acme"
          }
        ]
      }
    }
  })
);

describe("LocationsNew", () => {
  it("renders correctly", () => {
    const component = renderer.create(<LocationsNew providerCode="A01" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
