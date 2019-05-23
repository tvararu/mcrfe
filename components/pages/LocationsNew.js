import gql from "graphql-tag";
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

const Content = ({ sites }) => null;

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
            <Content />
          </GovukMain>
        </>
      );
    }}
  </Query>
);
