import Head from "next/head";
import gql from "graphql-tag";
import Link from "next/link";
import Query from "../elements/Query";
import GovukMain from "../govuk/Main";
import GovukBreadcrumbs from "../govuk/Breadcrumbs";

const allProvidersQuery = gql`
  query allProviders($providerCode: String!) {
    allProviders(condition: { providerCode: $providerCode }) {
      nodes {
        providerName
        sitesByProviderId(orderBy: LOCATION_NAME_ASC) {
          nodes {
            locationName
            code
            id
          }
        }
      }
    }
  }
`;

const LocationsTableRow = ({ name, code }) => (
  <tr className="govuk-table__row">
    <td className="govuk-table__cell" data-qa="provider__location-name">
      <a className="govuk-link govuk-!-font-weight-bold" href="#">
        {name}
      </a>
    </td>
    <td className="govuk-table__cell">{code}</td>
  </tr>
);

const LocationsTable = ({ sites }) => (
  <table className="govuk-table">
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        <th className="govuk-table__header" scope="col">
          Name
        </th>
        <th className="govuk-table__header" scope="col">
          UCAS code
        </th>
      </tr>
    </thead>
    <tbody className="govuk-table__body">
      {sites.map(({ id, locationName, code }) => (
        <LocationsTableRow key={id} name={locationName} code={code} />
      ))}
    </tbody>
  </table>
);

const Content = ({ providerCode, sites }) => (
  <div className="govuk-grid-row">
    <div className="govuk-grid-column-two-thirds">
      <p className="govuk-body">Use this section to:</p>
      <ul className="govuk-list govuk-list--bullet govuk-!-margin-bottom-7">
        <li>edit location names and addresses</li>
        <li>add locations</li>
      </ul>

      <div className="govuk-inset-text">
        <p>
          By ‘location’ we mean the places that a candidate selects when making
          an application. They do this by choosing from a list on both the
          course page in Find and the UCAS application form.
        </p>
      </div>

      <div className="govuk-warning-text">
        <span className="govuk-warning-text__icon" aria-hidden="true">
          !
        </span>
        <strong className="govuk-warning-text__text">
          <span className="govuk-warning-text__assistive">Warning</span>
          You are limited to 37 locations by UCAS Apply.
          <br />
          <span className="govuk-!-font-weight-regular">
            Each location has a single character code.
          </span>
        </strong>
      </div>

      <LocationsTable sites={sites} />
      <Link
        prefetch
        as={`/organisations/${providerCode}/locations/new`}
        href={`/organisations/locations/new?providerCode=${providerCode}`}
      >
        <a className="govuk-button govuk-!-margin-bottom-2">Add a location</a>
      </Link>
    </div>
  </div>
);

export default ({ providerCode }) => (
  <Query query={allProvidersQuery} variables={{ providerCode }}>
    {({ data }) => {
      const provider = data.allProviders.nodes[0];
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
            <Head>
              <title>
                Locations - Publish teacher training courses - GOV.UK
              </title>
            </Head>
            <h1 className="govuk-heading-xl">Locations</h1>
            <Content
              providerCode={providerCode}
              sites={provider.sitesByProviderId.nodes}
            />
          </GovukMain>
        </>
      );
    }}
  </Query>
);
