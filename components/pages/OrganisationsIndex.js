import Head from "next/head";
import gql from "graphql-tag";
import Query from "../elements/Query";
import Link from "next/link";
import GovukMain from "../govuk/Main";

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
        {courseCount} {courseCount !== 1 ? "courses" : "course"}
      </span>
    </h2>
  </li>
);

const OrganisationsList = () => (
  <Query query={allProvidersQuery}>
    {({ data }) => (
      <ul className="govuk-list">
        {data.allProviders.nodes.map(provider => (
          <OrganisationListItem key={provider.id} {...provider} />
        ))}
      </ul>
    )}
  </Query>
);

export default () => (
  <GovukMain>
    <Head>
      <title>Organisations - Publish teacher training courses - GOV.UK</title>
    </Head>
    <h1 className="govuk-heading-xl">Organisations</h1>
    <OrganisationsList />
  </GovukMain>
);
