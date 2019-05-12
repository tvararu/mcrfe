import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import GovukMain from "../../components/GovukMain";
import GovukBreadcrumbs from "../../components/GovukBreadcrumbs";

const allProvidersQuery = gql`
  query allProviders($providerCode: String!) {
    allProviders(condition: { providerCode: $providerCode }) {
      nodes {
        providerName
      }
    }
  }
`;

const Content = ({ providerCode }) => (
  <div className="govuk-grid-row">
    <div className="govuk-grid-column-two-thirds">
      <h2 className="govuk-heading-m">
        <a
          className="govuk-link"
          href={`/organisations/details?providerCode=${providerCode}`}
        >
          About your organisation
        </a>
      </h2>
      <p className="govuk-body">Use this section to:</p>
      <ul className="govuk-list govuk-list--bullet govuk-!-margin-bottom-8">
        <li>write about your organisation</li>
        <li>set your contact details</li>
        <li>publish this information on all course pages</li>
      </ul>

      <h2 className="govuk-heading-m">
        <a
          className="govuk-link"
          href={`/organisations/locations?providerCode=${providerCode}`}
        >
          Locations
        </a>
      </h2>
      <p className="govuk-body">Use this section to:</p>
      <ul className="govuk-list govuk-list--bullet govuk-!-margin-bottom-8">
        <li>edit location names and addresses</li>
        <li>add locations</li>
      </ul>

      <h2 className="govuk-heading-m">
        <Link
          prefetch
          as={`/organisations/${providerCode}/courses`}
          href={`/organisations/courses?providerCode=${providerCode}`}
        >
          <a className="govuk-link">Courses</a>
        </Link>
      </h2>
      <p className="govuk-body">Use this section to:</p>
      <ul className="govuk-list govuk-list--bullet govuk-!-margin-bottom-8">
        <li>write about each course</li>
        <li>preview and publish courses</li>
        <li>copy content between courses</li>
      </ul>

      <h2 className="govuk-heading-m">
        <a
          className="govuk-link"
          href={`/organisations/request-access?providerCode=${providerCode}`}
        >
          Request access for someone else
        </a>
      </h2>
      <p className="govuk-body govuk-!-margin-bottom-8">
        You can request a DfE Sign-in account for others who manage your
        courses.
      </p>
    </div>
    <div className="govuk-grid-column-one-third">
      <style jsx>{`
        .related {
          border-top: 5px solid #005ea5;
          background-color: #f8f8f8;
          padding: 20px;
        }
      `}</style>
      <div className="related">
        <h2 className="govuk-heading-m">Support and guidance</h2>
        <p className="govuk-body govuk-!-margin-bottom-0">
          If you have a question, or you’ve had a problem using Publish, you can{" "}
          <a
            className="govuk-link"
            href="mailto:becomingateacher@digital.education.gov.uk?subject=Support%20and%20guidance"
          >
            email the Becoming a Teacher team
          </a>
          .
        </p>
      </div>
    </div>
  </div>
);

const OrganisationsPage = ({ providerCode }) => (
  <Query query={allProvidersQuery} variables={{ providerCode }}>
    {({ loading, error, data: { allProviders } }) => {
      if (error) return <p className="govuk-body">Error: {error}</p>;
      if (loading) return <p className="govuk-body">Loading...</p>;

      const { providerName } = allProviders.nodes[0];
      return (
        <>
          <GovukBreadcrumbs
            crumbs={[
              { href: "/", text: "Organisations" },
              { href: null, text: providerName }
            ]}
          />
          <GovukMain>
            <h1 className="govuk-heading-xl">{providerName}</h1>
            <Content providerCode={providerCode} />
          </GovukMain>
        </>
      );
    }}
  </Query>
);

OrganisationsPage.getInitialProps = ({ query: { providerCode } }) => ({
  providerCode
});

export default OrganisationsPage;
