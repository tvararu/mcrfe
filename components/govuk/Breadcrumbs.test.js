import renderer from "react-test-renderer";
import Breadcrumbs from "./Breadcrumbs";
jest.mock("next/link");

describe("Breadcrumbs", () => {
  it("renders correctly", () => {
    const crumbs = [
      { href: "/", text: "Organisations" },
      { text: "An organisation name" }
    ];
    const component = renderer.create(<Breadcrumbs crumbs={crumbs} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
