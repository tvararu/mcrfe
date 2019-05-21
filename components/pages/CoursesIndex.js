import gql from "graphql-tag";
import Link from "next/link";
import Query from "../elements/Query";
import GovukMain from "../govuk/Main";
import GovukBreadcrumbs from "../govuk/Breadcrumbs";
import CourseStatusTag from '../elements/CourseStatusTag'

const allProvidersQuery = gql`
  query allProviders($providerCode: String!) {
    allProviders(condition: { providerCode: $providerCode }) {
      nodes {
        providerName
        coursesByProviderId(orderBy: COURSE_CODE_ASC) {
          nodes {
            courseCode
            providerByAccreditingProviderId {
              providerName
            }
            name
            courseSitesByCourseId {
              nodes {
                publish
                status
                applicationsAcceptedFrom
                vacStatus
              }
            }
          }
        }
      }
    }
    allCourseEnrichments(
      condition: { providerCode: $providerCode }
      orderBy: CREATED_AT_DESC
    ) {
      nodes {
        lastPublishedTimestampUtc
        status

        ucasCourseCode
      }
    }
  }
`;

const TableHeader = () => (
  <thead className="govuk-table__head">
    <style jsx>{`
      abbr {
        text-decoration: underline dotted;
      }

      .w-33 {
        width: 33%;
      }
    `}</style>
    <tr className="govuk-table__row">
      <th className="govuk-table__header w-33">Course</th>
      <th className="govuk-table__header">UCAS Status</th>
      <th className="govuk-table__header">Content</th>
      <th className="govuk-table__header">
        Is it on <abbr title="Find postgraduate teacher training">Find</abbr>?
      </th>
      <th className="govuk-table__header">Applications</th>
      <th className="govuk-table__header">Vacancies</th>
    </tr>
  </thead>
);

const siteIsFindable = ({ publish, status }) =>
  publish === "Y" && status === "R";

const courseIsFindable = course =>
  course.courseSitesByCourseId.nodes.some(siteIsFindable);

const courseIsNew = course =>
  course.courseSitesByCourseId.nodes.some(({ status }) => status === "N");

const courseUcasStatus = course => {
  if (courseIsFindable(course)) return "Running";
  if (courseIsNew(course)) return "New – not yet running";

  return "Not running";
};

const courseIsRunning = course => courseUcasStatus(course) === "Running";

const siteOpenForApplications = site =>
  site.applicationsAcceptedFrom &&
  new Date(site.applicationsAcceptedFrom) < new Date();

const siteHasVacancies = site => site.vacStatus !== "";

const courseOpenForApplications = course =>
  course.courseSitesByCourseId.nodes
    .filter(siteIsFindable)
    .filter(siteOpenForApplications)
    .some(siteHasVacancies);

const courseHasVacancies = course =>
  course.courseSitesByCourseId.nodes
    .filter(siteIsFindable)
    .some(siteHasVacancies);

const TableRow = ({ providerCode, course, latestEnrichment }) => (
  <tr className="govuk-table__row">
    <td className="govuk-table__cell">
      <Link
        as={`/organisations/${providerCode}/courses/${course.courseCode}`}
        href={`/organisations/courses/show?providerCode=${providerCode}&courseCode=${
          course.courseCode
        }`}
        prefetch
      >
        <a className="govuk-link govuk-heading-s govuk-!-margin-bottom-0">
          {course.name} ({course.courseCode})
        </a>
      </Link>
      <span className="govuk-body-s">QTS full time</span>
    </td>
    <td className="govuk-table__cell">{courseUcasStatus(course)}</td>
    <td className="govuk-table__cell">
      {courseIsRunning(course) && (
        <CourseStatusTag enrichment={latestEnrichment} />
      )}
    </td>
    <td className="govuk-table__cell">
      {courseIsFindable(course) ? (
        <a
          className="govuk-link"
          href={`https://bat-dev-search-and-compare-ui-app.azurewebsites.net/course/${providerCode}/${
            course.courseCode
          }`}
        >
          Yes - view online
        </a>
      ) : (
        "No"
      )}
    </td>
    <td className="govuk-table__cell">
      {courseIsRunning(course)
        ? courseOpenForApplications(course)
          ? "Open"
          : "Closed"
        : ""}
    </td>
    <td className="govuk-table__cell">
      {courseIsRunning(course) ? (
        <>
          {courseHasVacancies(course) ? "Yes" : "No"} (
          <a
            className="govuk-link"
            href={`/organisations/${providerCode}/courses/${
              course.courseCode
            }/vacancies`}
          >
            Edit
          </a>
          )
        </>
      ) : (
        ""
      )}
    </td>
  </tr>
);

const sortByNameAndCourseCode = (c1, c2) => {
  const c1str = c1.name + c1.courseCode;
  const c2str = c2.name + c2.courseCode;
  return c1str < c2str ? -1 : c1str > c2str ? 1 : 0;
};

const Table = ({ providerCode, courses, enrichments }) => (
  <table className="govuk-table">
    <TableHeader />
    <tbody className="govuk-table__body">
      {courses.sort(sortByNameAndCourseCode).map(course => (
        <TableRow
          key={course.courseCode}
          providerCode={providerCode}
          course={course}
          latestEnrichment={enrichments.find(
            ({ ucasCourseCode }) => ucasCourseCode === course.courseCode
          )}
        />
      ))}
    </tbody>
  </table>
);

const AddNewCourse = ({ top = false }) => (
  <>
    <a
      className="govuk-button govuk-!-margin-bottom-2"
      rel="noopener noreferrer"
      target="_blank"
      href="https://docs.google.com/forms/d/e/1FAIpQLSeatJO2ZuqM-fnRJxEo6IIF0hZIU63JGnx0sDXO6Ulax7U_bA/viewform?usp=pp_url&amp;entry.1033530353=tim.abell%2B4%40digital.education.gov.uk&amp;entry.158771972=2C4"
    >
      Add a new course
    </a>
    <p className={`govuk-body-s${top ? " govuk-!-margin-bottom-6" : ""} `}>
      You’ll be taken to a Google Form to fill in your course details.
    </p>
  </>
);

const Content = ({ providerCode, providerName, courses, enrichments }) => {
  const coursesByAccreditingProvider = courses.reduce((cs, course) => {
    const accreditingProvider = course.providerByAccreditingProviderId;
    const key = accreditingProvider
      ? accreditingProvider.providerName
      : providerName;
    cs[key] = (cs[key] || []).concat(course);
    return cs;
  }, {});

  const selfAccreditedCourses = coursesByAccreditingProvider[providerName];
  delete coursesByAccreditingProvider[providerName];

  return (
    <>
      <p className="govuk-body">Use this section to:</p>

      <ul className="govuk-list govuk-list--bullet govuk-!-margin-bottom-7">
        <li>write about each course</li>
        <li>preview and publish courses</li>
        <li>copy content between courses</li>
      </ul>

      {courses.length > 10 && <AddNewCourse top />}

      <section>
        {selfAccreditedCourses && (
          <Table
            providerCode={providerCode}
            courses={selfAccreditedCourses}
            enrichments={enrichments}
          />
        )}

        {Object.keys(coursesByAccreditingProvider)
          .sort()
          .map(providerName => (
            <React.Fragment key={providerName}>
              <h2 className="govuk-heading-m">
                <span className="govuk-caption-m">Accredited body</span>
                {providerName}
              </h2>

              <Table
                providerCode={providerCode}
                courses={coursesByAccreditingProvider[providerName]}
                enrichments={enrichments}
              />
            </React.Fragment>
          ))}
      </section>

      <AddNewCourse />
    </>
  );
};

export default ({ providerCode }) => (
  <Query query={allProvidersQuery} variables={{ providerCode }}>
    {({ data }) => {
      const provider = data.allProviders.nodes[0];
      const courses = provider.coursesByProviderId.nodes;
      const enrichments = data.allCourseEnrichments.nodes;
      return (
        <>
          <GovukBreadcrumbs
            crumbs={[
              { href: "/", text: "Organisations" },
              {
                as: `/organisations/${providerCode}`,
                href: `/organisations?providerCode=${providerCode}`,
                text: provider.providerName
              }
            ]}
          />
          <GovukMain>
            <h1 className="govuk-heading-xl">Courses</h1>
            <Content
              providerName={provider.providerName}
              providerCode={providerCode}
              courses={courses}
              enrichments={enrichments}
            />
          </GovukMain>
        </>
      );
    }}
  </Query>
);
