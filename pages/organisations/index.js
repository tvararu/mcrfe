import { Query } from "react-apollo";
import gql from "graphql-tag";
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
