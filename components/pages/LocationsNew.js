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
      }
    }
  }
`;

const REGIONS = [
  ["london", "London"],
  ["south_east", "South East"],
  ["south_west", "South West"],
  ["wales", "Wales"],
  ["west_midlands", "West Midlands"],
  ["east_midlands", "East Midlands"],
  ["eastern", "Eastern"],
  ["north_west", "North West"],
  ["yorkshire_and_the_humber", "Yorkshire and the Humber"],
  ["north_east", "North East"],
  ["scotland", "Scotland"],
  ["no_region", "No Region"]
];

const FormGroupInput = ({ children, field, small, select }) => (
  <div className="govuk-form-group">
    <label className="govuk-label" htmlFor={`site_${field}`}>
      {children}
    </label>
    {select ? (
      <select className="govuk-select" name={field} id={`site_${field}`}>
        {select.map(([code, label]) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    ) : (
      <input
        className={
          small
            ? "govuk-input form-control-small"
            : "govuk-input govuk-!-width-full"
        }
        type="text"
        name={field}
        id={`site_${field}`}
      />
    )}
  </div>
);

const Content = ({ providerCode }) => (
  <div className="govuk-grid-row">
    <div className="govuk-grid-column-two-thirds">
      <form action={`/organisations/${providerCode}/locations`} method="post">
        <FormGroupInput field="location_name">
          <h2 className="govuk-heading-m">Name</h2>
        </FormGroupInput>

        <h2 className="govuk-heading-m govuk-!-margin-top-8">Address</h2>

        <FormGroupInput field="address1">
          Building and street
          <span className="govuk-visually-hidden">line 1 of 2</span>
        </FormGroupInput>

        <FormGroupInput field="address2">
          <span className="govuk-visually-hidden">line 2 of 2</span>
        </FormGroupInput>

        <FormGroupInput field="address3">Town or city</FormGroupInput>

        <FormGroupInput field="address4">County</FormGroupInput>

        <FormGroupInput field="postcode" small>
          Postcode
        </FormGroupInput>

        <FormGroupInput field="region_code" select={REGIONS}>
          Region of UK
        </FormGroupInput>

        <input
          type="submit"
          name="commit"
          value="Save"
          className="govuk-button"
        />
      </form>
      <p className="govuk-body">
        <Link
          as={`/organisations/${providerCode}/locations`}
          href={`/organisations/locations?providerCode=${providerCode}`}
          prefetch
        >
          <a className="govuk-link">Cancel changes</a>
        </Link>
      </p>
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
              },
              {
                as: `/organisations/${providerCode}/locations`,
                href: `/organisations/locations?providerCode=${providerCode}`,
                text: "Locations"
              }
            ]}
          />
          <GovukMain>
            <h1 className="govuk-heading-xl">Add a location</h1>
            <Content providerCode={providerCode} />
          </GovukMain>
        </>
      );
    }}
  </Query>
);
