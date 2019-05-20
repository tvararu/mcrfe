import renderer from "react-test-renderer";
import OrganisationsShow from "./OrganisationsShow";

jest.mock("react-apollo", () => ({
  Query: ({ children }) =>
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
}));

describe("OrganisationsShow", () => {
  it("renders correctly", () => {
    const component = renderer.create(<OrganisationsShow providerCode="A01" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
