import renderer from "react-test-renderer";
import CourseTableRow from "./CourseTableRow";
jest.mock("next/link");

const courses = [
  {
    _label: "running and open",
    courseCode: "X100",
    providerByAccreditingProviderId: null,
    name: "Primary",
    courseSitesByCourseId: {
      nodes: [
        {
          publish: "Y",
          status: "R",
          applicationsAcceptedFrom: "2018-10-09",
          vacStatus: "F"
        }
      ]
    }
  },
  {
    _label: "running and closed",
    courseCode: "X100",
    providerByAccreditingProviderId: null,
    name: "Primary",
    courseSitesByCourseId: {
      nodes: [
        {
          publish: "Y",
          status: "R",
          applicationsAcceptedFrom: "2018-10-09",
          vacStatus: ""
        }
      ]
    }
  },
  {
    _label: "new",
    courseCode: "X100",
    providerByAccreditingProviderId: null,
    name: "Primary",
    courseSitesByCourseId: {
      nodes: [
        {
          publish: "Y",
          status: "N",
          applicationsAcceptedFrom: "2018-10-09",
          vacStatus: "F"
        }
      ]
    }
  },
  {
    _label: "not running",
    courseCode: "X100",
    providerByAccreditingProviderId: null,
    name: "Primary",
    courseSitesByCourseId: {
      nodes: [
        {
          publish: "N",
          status: "S",
          applicationsAcceptedFrom: "2018-10-09",
          vacStatus: "F"
        }
      ]
    }
  }
];

describe("CourseTableRow", () => {
  courses.forEach(course => {
    it(`renders correctly with ${course._label} course`, () => {
      const component = renderer.create(
        <CourseTableRow providerCode="A01" course={course} />
      );
      const tree = component.toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
