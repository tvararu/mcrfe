import renderer from "react-test-renderer";
import GovukBreadcrumbs from "./GovukBreadcrumbs";
jest.mock("next/link");

describe("GovukBreadcrumbs", () => {
  it("renders correctly", () => {
    const crumbs = [
      { href: "/", text: "Organisations" },
      { text: "An organisation name" }
    ];
    const component = renderer.create(<GovukBreadcrumbs crumbs={crumbs} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
