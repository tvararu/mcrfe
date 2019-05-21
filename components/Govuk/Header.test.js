import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Header from "./Header";
jest.mock("next/link");

describe("Header", () => {
  it("renders correctly", () => {
    const component = renderer.create(<Header />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe("behaviour", () => {
    let container;

    beforeEach(() => {
      container = document.createElement("div");
      document.body.appendChild(container);
      act(() => {
        ReactDOM.render(<Header />, container);
      });
    });

    it("renders as closed after being mounted", () => {
      expect(container.firstChild).toMatchSnapshot();
    });

    it("opens on click", () => {
      act(() => {
        container
          .querySelector("button")
          .dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
