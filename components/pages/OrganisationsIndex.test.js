import renderer from "react-test-renderer";
import OrganisationsIndex from "./OrganisationsIndex";

jest.mock("../elements/Query", () => ({ children }) =>
  children({
    data: {
      allProviders: {
        nodes: [
          {
            id: 1,
            providerCode: "A01",
            providerName: "Acme",
            coursesByProviderId: { totalCount: 0 }
          },
          {
            id: 2,
            providerCode: "A02",
            providerName: "Bat",
            coursesByProviderId: { totalCount: 1 }
          }
        ]
      }
    }
  })
);

describe("OrganisationsIndex", () => {
  it("renders correctly", () => {
    const component = renderer.create(<OrganisationsIndex />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
