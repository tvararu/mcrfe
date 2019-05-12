import { Query } from "react-apollo";
import gql from "graphql-tag";

export const allProvidersQuery = gql`
  {
    allProviders(orderBy: PROVIDER_NAME_ASC) {
      nodes {
        id
        providerCode
        providerName
        coursesByProviderId {
          totalCount
        }
      }
    }
  }
`;

const OrganisationListItem = ({
  id,
  providerCode: code,
  providerName: name,
  coursesByProviderId: { totalCount: courseCount }
}) => (
  <li key={id}>
    <h2 className="govuk-heading-m">
      <a className="govuk-link" href={`/organisations/${code}`}>
        {name}
      </a>
      <span className="govuk-body govuk-!-font-weight-regular govuk-!-display-block">
        {courseCount} course{courseCount !== 1 && "s"}
      </span>
    </h2>
  </li>
);

const OrganisationsList = () => (
  <Query query={allProvidersQuery}>
    {({ loading, error, data: { allProviders } }) => {
      if (error) return <aside>Error loading Organisations.</aside>;
      if (loading) return <div>Loading</div>;

      return (
        <section>
          <ul className="govuk-list">
            {allProviders.nodes.map(provider => (
              <OrganisationListItem {...provider} />
            ))}
          </ul>
        </section>
      );
    }}
  </Query>
);

export default () => (
  <>
    <h1 className="govuk-heading-xl">Organisations</h1>
    <OrganisationsList />
  </>
);
