import renderer from "react-test-renderer";
import CourseStatusTag from "./CourseStatusTag";

const enrichments = [
  null,
  {
    _label: "draft",
    status: 0,
    lastPublishedTimestampUtc: null
  },
  {
    _label: "published*",
    status: 0,
    lastPublishedTimestampUtc: 1
  },
  {
    _label: "published",
    status: 1,
    lastPublishedTimestampUtc: null
  }
];

describe("CourseStatusTag", () => {
  enrichments.forEach(enrichment => {
    it(`renders correctly with ${(enrichment && enrichment._label) ||
      "empty"} enrichment`, () => {
      const component = renderer.create(
        <CourseStatusTag enrichment={enrichment} />
      );
      const tree = component.toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
