import renderer from "react-test-renderer";
import CoursesIndex from "./CoursesIndex";

jest.mock("../elements/Query", () => ({ children }) =>
  children({
    data: {
      allProviders: {
        nodes: [
          {
            providerName: "Acme",
            coursesByProviderId: {
              nodes: [
                {
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
                  courseCode: "X101",
                  providerByAccreditingProviderId: {
                    providerName: "Acme Accrediting"
                  },
                  name: "Mathematics",
                  courseSitesByCourseId: {
                    nodes: [
                      {
                        publish: "N",
                        status: "R",
                        applicationsAcceptedFrom: "2018-10-09",
                        vacStatus: "F"
                      }
                    ]
                  }
                },
                {
                  courseCode: "X102",
                  providerByAccreditingProviderId: {
                    providerName: "Acme Other"
                  },
                  name: "Physics",
                  courseSitesByCourseId: {
                    nodes: [
                      {
                        publish: "N",
                        status: "N",
                        applicationsAcceptedFrom: "2018-10-09",
                        vacStatus: "F"
                      }
                    ]
                  }
                },
                ...Array(10)
                  .fill(null)
                  .map((_, index) => ({
                    courseCode: `Y${index + 1}`,
                    providerByAccreditingProviderId: {
                      providerName: "Acme Lots"
                    },
                    name: "English",
                    courseSitesByCourseId: {
                      nodes: []
                    }
                  })),
                {
                  courseCode: `Y0`,
                  providerByAccreditingProviderId: {
                    providerName: "Acme Lots"
                  },
                  name: "English",
                  courseSitesByCourseId: {
                    nodes: []
                  }
                }
              ]
            }
          }
        ]
      },
      allCourseEnrichments: {
        nodes: [
          {
            lastPublishedTimestampUtc: "2018-09-10T13:52:19.665409",
            status: 1,
            ucasCourseCode: "X100"
          },
          {
            lastPublishedTimestampUtc: "2018-09-10T12:41:13.796804",
            status: 1,
            ucasCourseCode: "X100"
          }
        ]
      }
    }
  })
);

describe("CoursesIndex", () => {
  it("renders correctly", () => {
    const component = renderer.create(<CoursesIndex providerCode="A01" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
