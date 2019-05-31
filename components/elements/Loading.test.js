import renderer from "react-test-renderer";
import { render, fireEvent, cleanup, act } from "@testing-library/react";
import Loading from "./Loading";

jest.useFakeTimers();

describe("Loading", () => {
  it("renders correctly", () => {
    const component = renderer.create(<Loading />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe("when mounted", () => {
    afterEach(cleanup);

    it("renders with 1 dot", () => {
      const { getByText, container } = render(<Loading />);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
