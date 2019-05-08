import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";

export const allOrganisationsQuery = gql`
  query allOrganisations($first: Int!) {
    allOrganisations(first: $first, orderBy: NAME_ASC) {
      nodes {
        id
        name
      }
    }
  }
`;

export const allOrganisationsQueryVars = {
  first: 10
};

export default function Organisations() {
  return (
    <Query query={allOrganisationsQuery} variables={allOrganisationsQueryVars}>
      {({ loading, error, data: { allOrganisations } }) => {
        if (error)
          return <ErrorMessage message="Error loading Organisations." />;
        if (loading) return <div>Loading</div>;

        return (
          <section>
            <ul>
              {allOrganisations.nodes.map((course, index) => (
                <li key={course.id}>
                  {course.id} {course.name}
                </li>
              ))}
            </ul>
          </section>
        );
      }}
    </Query>
  );
}
