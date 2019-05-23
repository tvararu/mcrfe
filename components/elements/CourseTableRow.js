import Link from "next/link";
import CourseStatusTag from "../elements/CourseStatusTag";

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

export default ({ providerCode, course, latestEnrichment }) => (
  <tr className="govuk-table__row">
    <td className="govuk-table__cell">
      <a
        href="#"
        className="govuk-link govuk-heading-s govuk-!-margin-bottom-0"
      >
        {course.name} ({course.courseCode})
      </a>
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
