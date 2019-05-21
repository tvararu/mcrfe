import { Query } from "react-apollo";

export default ({ query, variables, children }) => (
  <Query query={query} variables={variables}>
    {({ loading, error, data }) => {
      if (error) return <pre>Error: {JSON.stringify(error, null, 2)}</pre>;
      if (loading) return <p className="govuk-body">Loading...</p>;

      return children({ data });
    }}
  </Query>
);
