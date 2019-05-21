import renderer from "react-test-renderer";
import Query from "./Query";

let mockedPayload = {};

jest.mock("react-apollo", () => ({
  Query: ({ children }) => children(mockedPayload)
}));

describe("Query", () => {
  [
    { error: "Something went wrong" },
    { loading: true },
    { data: "Lorem" }
  ].forEach(payload => {
    it(`renders correctly with ${Object.keys(payload).pop()}`, () => {
      mockedPayload = payload;
      const component = renderer.create(
        <Query>{({ data }) => <p>{data}</p>}</Query>
      );
      const tree = component.toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
