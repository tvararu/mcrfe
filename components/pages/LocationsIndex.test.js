import renderer from "react-test-renderer";
import LocationsIndex from "./LocationsIndex";

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

describe("LocationsIndex", () => {
  it("renders correctly", () => {
    const component = renderer.create(<LocationsIndex providerCode="A01" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
