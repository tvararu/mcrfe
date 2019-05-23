import renderer from "react-test-renderer";
import LocationsIndex from "./LocationsIndex";

jest.mock("../elements/Query", () => ({ children }) =>
  children({
    data: {
      allProviders: {
        nodes: [
          {
            providerName: "Acme",
            sitesByProviderId: {
              nodes: [
                {
                  locationName: "First Primary School",
                  code: "W",
                  id: 1
                },
                {
                  locationName: "Main Site",
                  code: "M",
                  id: 2
                },
                {
                  locationName: "Second Primary School",
                  code: "O",
                  id: 3
                }
              ]
            }
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
