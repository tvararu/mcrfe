import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import GovukMain from "../components/GovukMain";

const allProvidersQuery = gql`
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
  providerCode: code,
  providerName: name,
  coursesByProviderId: { totalCount: courseCount }
}) => (
  <li>
    <h2 className="govuk-heading-m">
      <Link
        as={`/organisations/${code}`}
        href={`/organisations?providerCode=${code}`}
        prefetch
      >
        <a className="govuk-link">{name}</a>
      </Link>
      <span className="govuk-body govuk-!-font-weight-regular govuk-!-display-block">
        {courseCount} course{courseCount !== 1 && "s"}
      </span>
    </h2>
  </li>
);

const OrganisationsList = () => (
  <Query query={allProvidersQuery}>
    {({ loading, error, data: { allProviders } }) => {
      if (error) return <p className="govuk-body">Error: {error}</p>;
      if (loading) return <p className="govuk-body">Loading...</p>;

      const providers = allProviders.nodes;
      return (
        <ul className="govuk-list">
          {providers.map(provider => (
            <OrganisationListItem key={provider.id} {...provider} />
          ))}
        </ul>
      );
    }}
  </Query>
);

export default () => (
  <GovukMain>
    <h1 className="govuk-heading-xl">Organisations</h1>
    <OrganisationsList />
  </GovukMain>
);
